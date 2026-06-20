package com.xxx.scm.interceptor;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.xxx.scm.entity.R;
import com.xxx.scm.util.JwtUtil;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 登录拦截器 — JWT 验证
 */
public class LoginInterceptor implements HandlerInterceptor {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // OPTIONS 预检请求放行
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            return true;
        }

        // 从 Header 获取 token
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        if (token == null || token.isEmpty()) {
            writeError(response, 401, "未登录，请先登录");
            return false;
        }

        // 验证 token
        try {
            if (JwtUtil.isExpired(token)) {
                writeError(response, 401, "登录已过期，请重新登录");
                return false;
            }
            // 将用户信息存入 request，后续 Controller 可以使用
            request.setAttribute("userId", JwtUtil.getUserId(token));
            request.setAttribute("username", JwtUtil.getUsername(token));
            request.setAttribute("roleName", JwtUtil.getRoleName(token));
            return true;
        } catch (Exception e) {
            writeError(response, 401, "无效的登录凭证");
            return false;
        }
    }

    private void writeError(HttpServletResponse response, int code, String msg) throws Exception {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(200);
        R<?> r = R.error(code, msg);
        response.getWriter().write(objectMapper.writeValueAsString(r));
    }
}
