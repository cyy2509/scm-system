package com.xxx.scm.controller;

import com.xxx.scm.entity.R;
import com.xxx.scm.entity.SysRole;
import com.xxx.scm.service.SysRoleService;
import com.xxx.scm.util.PageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * 角色 Controller — REST API
 */
@RestController
@RequestMapping("/api/role")
public class RoleController {

    @Autowired
    private SysRoleService roleService;

    @GetMapping("/list")
    public R<?> list(@RequestParam(defaultValue = "1") int pageNo,
                     @RequestParam(defaultValue = "10") int pageSize,
                     @RequestParam(required = false) String keyword) {
        PageResult<SysRole> page = roleService.findByPage(keyword, pageNo, pageSize);
        return R.ok(page);
    }

    @GetMapping("/{roleId}")
    public R<?> getById(@PathVariable Integer roleId) {
        return R.ok(roleService.findById(roleId));
    }

    @PostMapping("/add")
    public R<?> add(@RequestBody SysRole role) {
        try {
            roleService.add(role);
            return R.ok("添加成功");
        } catch (Exception e) {
            return R.error(e.getMessage());
        }
    }

    @PostMapping("/update")
    public R<?> update(@RequestBody SysRole role) {
        try {
            roleService.update(role);
            return R.ok("修改成功");
        } catch (Exception e) {
            return R.error(e.getMessage());
        }
    }

    @PostMapping("/delete")
    public R<?> delete(@RequestParam Integer roleId) {
        try {
            roleService.delete(roleId);
            return R.ok("删除成功");
        } catch (Exception e) {
            return R.error(e.getMessage());
        }
    }

    /**
     * 获取所有角色（下拉选择用）
     */
    @GetMapping("/all")
    public R<?> findAll() {
        return R.ok(roleService.findAll());
    }
}
