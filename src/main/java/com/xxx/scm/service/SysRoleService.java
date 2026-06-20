package com.xxx.scm.service;

import com.xxx.scm.entity.SysRole;
import com.xxx.scm.util.PageResult;
import java.util.List;

/**
 * 角色Service接口
 */
public interface SysRoleService {

    /**
     * 查询所有角色
     */
    List<SysRole> findAll();

    /**
     * 根据ID查询角色
     */
    SysRole findById(Integer roleId);

    /**
     * 分页查询角色
     */
    PageResult<SysRole> findByPage(String keyword, int pageNo, int pageSize);

    /**
     * 添加角色
     */
    void add(SysRole role);

    /**
     * 修改角色
     */
    void update(SysRole role);

    /**
     * 删除角色
     */
    void delete(Integer roleId);
}
