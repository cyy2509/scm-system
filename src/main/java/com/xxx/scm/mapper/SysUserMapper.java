package com.xxx.scm.mapper;

import com.xxx.scm.entity.SysUser;
import org.apache.ibatis.annotations.Param;
import java.util.List;

/**
 * 用户Mapper接口
 */
public interface SysUserMapper {

    /**
     * 根据用户名和密码查询用户（登录验证）
     */
    SysUser findByUsernameAndPassword(@Param("username") String username, @Param("password") String password);

    /**
     * 根据ID查询用户
     */
    SysUser findById(@Param("userId") Integer userId);

    /**
     * 分页查询用户列表
     */
    List<SysUser> findByPage(@Param("keyword") String keyword,
                              @Param("roleId") Integer roleId,
                              @Param("offset") int offset,
                              @Param("pageSize") int pageSize);

    /**
     * 查询用户总数
     */
    int findCount(@Param("keyword") String keyword, @Param("roleId") Integer roleId);

    /**
     * 插入用户
     */
    int insert(SysUser user);

    /**
     * 更新用户
     */
    int update(SysUser user);

    /**
     * 删除用户
     */
    int deleteById(@Param("userId") Integer userId);

    /**
     * 检查用户名是否存在
     */
    int checkUsername(@Param("username") String username, @Param("userId") Integer userId);

    /**
     * 修改密码
     */
    int updatePassword(@Param("userId") Integer userId, @Param("password") String password);
}
