package com.xxx.scm.mapper;

import com.xxx.scm.entity.SysRole;
import org.apache.ibatis.annotations.Param;
import java.util.List;

/**
 * 角色Mapper接口
 */
public interface SysRoleMapper {

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
    List<SysRole> findByPage(@Param("keyword") String keyword,
                              @Param("offset") int offset,
                              @Param("pageSize") int pageSize);

    /**
     * 查询角色总数
     */
    int findCount(@Param("keyword") String keyword);

    /**
     * 插入角色
     */
    int insert(SysRole role);

    /**
     * 更新角色
     */
    int update(SysRole role);

    /**
     * 删除角色
     */
    int deleteById(@Param("roleId") Integer roleId);
}
