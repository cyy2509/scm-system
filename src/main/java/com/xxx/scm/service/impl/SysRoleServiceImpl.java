package com.xxx.scm.service.impl;

import com.xxx.scm.entity.SysRole;
import com.xxx.scm.exception.BusinessException;
import com.xxx.scm.mapper.SysRoleMapper;
import com.xxx.scm.mapper.SysUserMapper;
import com.xxx.scm.service.SysRoleService;
import com.xxx.scm.util.PageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SysRoleServiceImpl implements SysRoleService {

    @Autowired
    private SysRoleMapper roleMapper;

    @Autowired
    private SysUserMapper userMapper;

    @Override
    public List<SysRole> findAll() {
        return roleMapper.findAll();
    }

    @Override
    public SysRole findById(Integer roleId) {
        return roleMapper.findById(roleId);
    }

    @Override
    public PageResult<SysRole> findByPage(String keyword, int pageNo, int pageSize) {
        PageResult<SysRole> page = new PageResult<>(pageNo, pageSize);
        int totalCount = roleMapper.findCount(keyword);
        page.setTotalCount(totalCount);

        if (totalCount > 0) {
            List<SysRole> list = roleMapper.findByPage(keyword, page.getOffset(), pageSize);
            page.setList(list);
        }
        return page;
    }

    @Override
    public void add(SysRole role) {
        roleMapper.insert(role);
    }

    @Override
    public void update(SysRole role) {
        roleMapper.update(role);
    }

    @Override
    public void delete(Integer roleId) {
        // 经理角色(roleId=1)不能删除
        if (roleId == 1) {
            throw new BusinessException("经理角色不能删除");
        }
        // 检查是否有用户关联了这个角色
        int userCount = userMapper.countByRoleId(roleId);
        if (userCount > 0) {
            throw new BusinessException("该角色下还有 " + userCount + " 个用户，请先移除用户后再删除角色");
        }
        roleMapper.deleteById(roleId);
    }
}
