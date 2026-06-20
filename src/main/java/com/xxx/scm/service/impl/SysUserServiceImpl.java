package com.xxx.scm.service.impl;

import com.xxx.scm.entity.SysUser;
import com.xxx.scm.exception.BusinessException;
import com.xxx.scm.mapper.SysUserMapper;
import com.xxx.scm.service.SysUserService;
import com.xxx.scm.util.MD5Util;
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
        // 密码MD5加密后验证
        String md5Password = MD5Util.md5(password);
        SysUser user = userMapper.findByUsernameAndPassword(username, md5Password);
        if (user == null) {
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
        // 密码MD5加密
        user.setPassword(MD5Util.md5(user.getPassword()));
        // 默认启用状态
        if (user.getStatus() == null) {
            user.setStatus(1);
        }
        userMapper.insert(user);
    }

    @Override
    public void update(SysUser user) {
        // 如果修改了密码，进行MD5加密
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            user.setPassword(MD5Util.md5(user.getPassword()));
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

        // 验证旧密码对不对
        String oldMd5 = MD5Util.md5(oldPassword);
        if (!oldMd5.equals(user.getPassword())) {
            throw new BusinessException("原密码错误");
        }

        // 新密码不能和旧的一样
        String newMd5 = MD5Util.md5(newPassword);
        if (newMd5.equals(user.getPassword())) {
            throw new BusinessException("新密码不能和原密码相同");
        }

        userMapper.updatePassword(userId, newMd5);
    }
}
