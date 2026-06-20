package com.xxx.scm.service;

import com.xxx.scm.entity.SysUser;
import com.xxx.scm.util.PageResult;
import java.util.List;

/**
 * 用户Service接口
 */
public interface SysUserService {

    /**
     * 用户登录
     */
    SysUser login(String username, String password);

    /**
     * 根据ID查询用户
     */
    SysUser findById(Integer userId);

    /**
     * 分页查询用户
     */
    PageResult<SysUser> findByPage(String keyword, Integer roleId, int pageNo, int pageSize);

    /**
     * 添加用户
     */
    void add(SysUser user);

    /**
     * 修改用户
     */
    void update(SysUser user);

    /**
     * 删除用户
     */
    void delete(Integer userId);

    /**
     * 检查用户名是否存在
     */
    boolean checkUsername(String username, Integer userId);

    /**
     * 修改密码
     */
    void updatePassword(Integer userId, String oldPassword, String newPassword);
}
