package com.xxx.scm.service.impl;

import com.xxx.scm.entity.SysRole;
import com.xxx.scm.exception.BusinessException;
import com.xxx.scm.mapper.SysRoleMapper;
import com.xxx.scm.service.SysRoleService;
import com.xxx.scm.util.PageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SysRoleServiceImpl implements SysRoleService {

    @Autowired
    private SysRoleMapper roleMapper;

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
        // 检查是否有用户关联了这个角色，防止删了正在用的角色
        // 这里简单处理，经理角色(roleId=1)不能删
        if (roleId == 1) {
            throw new BusinessException("经理角色不能删除");
        }
        roleMapper.deleteById(roleId);
    }
}
