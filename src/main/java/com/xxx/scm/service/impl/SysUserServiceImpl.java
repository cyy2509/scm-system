package com.xxx.scm.service.impl;

import com.xxx.scm.entity.SysUser;
import com.xxx.scm.exception.BusinessException;
import com.xxx.scm.mapper.SysUserMapper;
import com.xxx.scm.service.SysUserService;
import com.xxx.scm.util.PasswordUtil;
import com.xxx.scm.util.PageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SysUserServiceImpl implements SysUserService {

    @Autowired
    private SysUserMapper userMapper;

    @Override
    public SysUser login(String username, String password) {
        // 先按用户名查出用户，再用BCrypt验证密码
        SysUser user = userMapper.findByUsername(username);
        if (user == null) {
            throw new BusinessException("用户名或密码错误");
        }
        if (!PasswordUtil.verify(password, user.getPassword())) {
            throw new BusinessException("用户名或密码错误");
        }
        return user;
    }

    @Override
    public SysUser findById(Integer userId) {
        return userMapper.findById(userId);
    }

    @Override
    public PageResult<SysUser> findByPage(String keyword, Integer roleId, int pageNo, int pageSize) {
        PageResult<SysUser> page = new PageResult<>(pageNo, pageSize);
        int totalCount = userMapper.findCount(keyword, roleId);
        page.setTotalCount(totalCount);

        if (totalCount > 0) {
            List<SysUser> list = userMapper.findByPage(keyword, roleId, page.getOffset(), pageSize);
            page.setList(list);
        }
        return page;
    }

    @Override
    public void add(SysUser user) {
        // 检查用户名是否重复
        if (checkUsername(user.getUsername(), null)) {
            throw new BusinessException("用户名已存在");
        }
        // 密码BCrypt加密
        user.setPassword(PasswordUtil.encode(user.getPassword()));
        // 默认启用状态
        if (user.getStatus() == null) {
            user.setStatus(1);
        }
        userMapper.insert(user);
    }

    @Override
    public void update(SysUser user) {
        // 如果修改了密码，进行BCrypt加密
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            user.setPassword(PasswordUtil.encode(user.getPassword()));
        }
        userMapper.update(user);
    }

    @Override
    public void delete(Integer userId) {
        userMapper.deleteById(userId);
    }

    @Override
    public boolean checkUsername(String username, Integer userId) {
        return userMapper.checkUsername(username, userId) > 0;
    }

    @Override
    public void updatePassword(Integer userId, String oldPassword, String newPassword) {
        // 先查一下用户
        SysUser user = userMapper.findById(userId);
        if (user == null) {
            throw new BusinessException("用户不存在");
        }

        // 验证旧密码对不对（BCrypt）
        if (!PasswordUtil.verify(oldPassword, user.getPassword())) {
            throw new BusinessException("原密码错误");
        }

        // 新密码不能和旧的一样
        if (PasswordUtil.verify(newPassword, user.getPassword())) {
            throw new BusinessException("新密码不能和原密码相同");
        }

        userMapper.updatePassword(userId, PasswordUtil.encode(newPassword));
    }
}
