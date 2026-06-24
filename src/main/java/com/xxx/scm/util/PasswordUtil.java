package com.xxx.scm.util;

import org.mindrot.jbcrypt.BCrypt;

/**
 * 密码加密工具类（BCrypt）
 */
public class PasswordUtil {

    // BCrypt盐轮次，10是推荐的安全值
    private static final int BCRYPT_ROUNDS = 10;

    /**
     * 对密码进行BCrypt加密
     */
    public static String encode(String password) {
        if (password == null || password.isEmpty()) {
            return "";
        }
        return BCrypt.hashpw(password, BCrypt.gensalt(BCRYPT_ROUNDS));
    }

    /**
     * 验证密码是否正确
     */
    public static boolean verify(String password, String hashed) {
        if (password == null || password.isEmpty() || hashed == null || hashed.isEmpty()) {
            return false;
        }
        return BCrypt.checkpw(password, hashed);
    }
}
