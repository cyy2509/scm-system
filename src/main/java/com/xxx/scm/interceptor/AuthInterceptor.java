package com.xxx.scm.interceptor;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.xxx.scm.entity.R;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

/**
 * 权限拦截器 — 基于 JWT 中的角色做权限控制
 */
public class AuthInterceptor implements HandlerInterceptor {

    private final ObjectMapper objectMapper = new ObjectMapper();

    // 角色 -> 允许访问的模块前缀
    private static final Map<String, Set<String>> ROLE_PERMISSIONS = new HashMap<>();

    static {
        ROLE_PERMISSIONS.put("经理", new HashSet<>(Arrays.asList(
                "user", "role", "supplier", "product", "purchase", "sales", "news", "log", "dashboard"
        )));
        ROLE_PERMISSIONS.put("采购部员工", new HashSet<>(Arrays.asList(
                "supplier", "purchase", "dashboard"
        )));
        ROLE_PERMISSIONS.put("销售部员工", new HashSet<>(Arrays.asList(
                "sales", "dashboard"
        )));
        ROLE_PERMISSIONS.put("物资部员工", new HashSet<>(Arrays.asList(
                "product", "dashboard"
        )));
        ROLE_PERMISSIONS.put("人事部员工", new HashSet<>(Arrays.asList(
                "user", "news", "dashboard"
        )));
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            return true;
        }

        String roleName = (String) request.getAttribute("roleName");
        if (roleName == null) {
            writeError(response, 403, "无法获取用户角色信息");
            return false;
        }

        if ("经理".equals(roleName)) {
            return true;
        }

        String uri = request.getRequestURI();
        String module = extractModule(uri);

        Set<String> allowed = ROLE_PERMISSIONS.get(roleName);
        if (allowed != null && allowed.contains(module)) {
            return true;
        }

        writeError(response, 403, "权限不足，无法访问该功能");
        return false;
    }

    private String extractModule(String uri) {
        int apiIdx = uri.indexOf("/api/");
        if (apiIdx < 0) return "";
        String remaining = uri.substring(apiIdx + 5);
        int slashIdx = remaining.indexOf('/');
        if (slashIdx < 0) return remaining;
        return remaining.substring(0, slashIdx);
    }

    private void writeError(HttpServletResponse response, int code, String msg) throws Exception {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(200);
        R<?> r = R.error(code, msg);
        response.getWriter().write(objectMapper.writeValueAsString(r));
    }
}
