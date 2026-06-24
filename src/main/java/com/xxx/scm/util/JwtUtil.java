package com.xxx.scm.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.io.InputStream;
import java.util.Date;
import java.util.Properties;

/**
 * JWT 工具类
 */
public class JwtUtil {

    // 从配置文件加载密钥，避免硬编码
    private static final SecretKey KEY;
    // 过期时间：24 小时
    private static final long EXPIRE = 24 * 60 * 60 * 1000;

    static {
        String secret = "scm-system-default-secret-change-me";
        try (InputStream in = JwtUtil.class.getClassLoader().getResourceAsStream("db.properties")) {
            if (in != null) {
                Properties props = new Properties();
                props.load(in);
                String configured = props.getProperty("jwt.secret");
                if (configured != null && !configured.isEmpty()) {
                    secret = configured;
                }
            }
        } catch (Exception ignored) {
            // 使用默认值
        }
        KEY = Keys.hmacShaKeyFor(secret.getBytes());
    }

    /**
     * 生成 JWT token
     */
    public static String generateToken(Integer userId, String username, String roleName) {
        return Jwts.builder()
                .claim("userId", userId)
                .claim("username", username)
                .claim("roleName", roleName)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRE))
                .signWith(KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * 解析 JWT token
     */
    public static Claims parseToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * 从 token 中获取用户 ID
     */
    public static Integer getUserId(String token) {
        Claims claims = parseToken(token);
        return claims.get("userId", Integer.class);
    }

    /**
     * 从 token 中获取用户名
     */
    public static String getUsername(String token) {
        Claims claims = parseToken(token);
        return claims.get("username", String.class);
    }

    /**
     * 从 token 中获取角色名
     */
    public static String getRoleName(String token) {
        Claims claims = parseToken(token);
        return claims.get("roleName", String.class);
    }

    /**
     * 验证 token 是否过期
     */
    public static boolean isExpired(String token) {
        try {
            Claims claims = parseToken(token);
            return claims.getExpiration().before(new Date());
        } catch (Exception e) {
            return true;
        }
    }
}
