package com.xxx.scm.controller;

import com.xxx.scm.entity.R;
import com.xxx.scm.entity.SysUser;
import com.xxx.scm.service.SysUserService;
import com.xxx.scm.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * 登录 Controller — REST API
 */
@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private SysUserService userService;

    /**
     * 登录
     */
    @PostMapping("/login")
    public R<?> login(@RequestParam String username, @RequestParam String password) {
        SysUser user = userService.login(username, password);
        if (user == null) {
            return R.error("用户名或密码错误，或账号已被禁用");
        }
        // 生成 JWT token
        String token = JwtUtil.generateToken(user.getUserId(), user.getUsername(), user.getRoleName());
        // 返回用户信息 + token
        Map<String, Object> data = new HashMap<>();
        data.put("token", token);
        data.put("userId", user.getUserId());
        data.put("username", user.getUsername());
        data.put("realName", user.getRealName());
        data.put("roleName", user.getRoleName());
        return R.ok(data);
    }

    /**
     * 获取当前登录用户信息
     */
    @GetMapping("/userinfo")
    public R<?> userinfo(HttpServletRequest request) {
        Integer userId = (Integer) request.getAttribute("userId");
        SysUser user = userService.findById(userId);
        if (user == null) {
            return R.error("用户不存在");
        }
        user.setPassword(null); // 不返回密码
        return R.ok(user);
    }

    /**
     * 退出登录（前端清除 token 即可，后端无需操作）
     */
    @PostMapping("/logout")
    public R<?> logout() {
        return R.ok("退出成功");
    }
}
