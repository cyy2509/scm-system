package com.xxx.scm.controller;

import com.xxx.scm.entity.R;
import com.xxx.scm.entity.SysUser;
import com.xxx.scm.service.SysRoleService;
import com.xxx.scm.service.SysUserService;
import com.xxx.scm.util.PageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * 用户 Controller — REST API
 */
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private SysUserService userService;

    @Autowired
    private SysRoleService roleService;

    /**
     * 用户列表（分页 + 搜索）
     */
    @GetMapping("/list")
    public R<?> list(@RequestParam(defaultValue = "1") int pageNo,
                     @RequestParam(defaultValue = "10") int pageSize,
                     @RequestParam(required = false) String keyword,
                     @RequestParam(required = false) Integer roleId) {
        PageResult<SysUser> page = userService.findByPage(keyword, roleId, pageNo, pageSize);
        return R.ok(page);
    }

    /**
     * 获取所有角色（用于下拉选择）
     */
    @GetMapping("/roles")
    public R<?> roles() {
        return R.ok(roleService.findAll());
    }

    /**
     * 获取单个用户
     */
    @GetMapping("/{userId}")
    public R<?> getById(@PathVariable Integer userId) {
        SysUser user = userService.findById(userId);
        if (user == null) return R.error("用户不存在");
        user.setPassword(null);
        return R.ok(user);
    }

    /**
     * 添加用户
     */
    @PostMapping("/add")
    public R<?> add(@RequestBody SysUser user) {
        try {
            userService.add(user);
            return R.ok("添加成功");
        } catch (Exception e) {
            return R.error(e.getMessage());
        }
    }

    /**
     * 修改用户
     */
    @PostMapping("/update")
    public R<?> update(@RequestBody SysUser user) {
        try {
            userService.update(user);
            return R.ok("修改成功");
        } catch (Exception e) {
            return R.error(e.getMessage());
        }
    }

    /**
     * 删除用户
     */
    @PostMapping("/delete")
    public R<?> delete(@RequestParam Integer userId, HttpServletRequest request) {
        Integer currentUserId = (Integer) request.getAttribute("userId");
        if (currentUserId.equals(userId)) {
            return R.error("不能删除自己的账号");
        }
        try {
            userService.delete(userId);
            return R.ok("删除成功");
        } catch (Exception e) {
            return R.error(e.getMessage());
        }
    }

    /**
     * 修改密码
     */
    @PostMapping("/password")
    public R<?> updatePassword(@RequestParam String oldPassword,
                               @RequestParam String newPassword,
                               @RequestParam String confirmPassword,
                               HttpServletRequest request) {
        if (!newPassword.equals(confirmPassword)) {
            return R.error("两次输入的密码不一致");
        }
        if (newPassword.length() < 6) {
            return R.error("密码长度至少6位");
        }
        try {
            Integer userId = (Integer) request.getAttribute("userId");
            userService.updatePassword(userId, oldPassword, newPassword);
            return R.ok("密码修改成功");
        } catch (Exception e) {
            return R.error(e.getMessage());
        }
    }
}
