package com.xxx.scm.mapper;

import com.xxx.scm.entity.SysOperationLog;
import org.apache.ibatis.annotations.Param;
import java.util.List;

/**
 * 操作日志Mapper接口
 */
public interface SysOperationLogMapper {

    /**
     * 插入操作日志
     */
    int insert(SysOperationLog log);

    /**
     * 分页查询操作日志
     */
    List<SysOperationLog> findByPage(@Param("keyword") String keyword,
                                      @Param("module") String module,
                                      @Param("offset") int offset,
                                      @Param("pageSize") int pageSize);

    /**
     * 查询操作日志总数
     */
    int findCount(@Param("keyword") String keyword, @Param("module") String module);
}
