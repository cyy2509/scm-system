package com.xxx.scm.mapper;

import com.xxx.scm.entity.News;
import org.apache.ibatis.annotations.Param;
import java.util.List;

/**
 * 新闻Mapper接口
 */
public interface NewsMapper {

    /**
     * 根据ID查询新闻
     */
    News findById(@Param("newsId") Integer newsId);

    /**
     * 分页查询新闻
     */
    List<News> findByPage(@Param("keyword") String keyword,
                           @Param("offset") int offset,
                           @Param("pageSize") int pageSize);

    /**
     * 查询新闻总数
     */
    int findCount(@Param("keyword") String keyword);

    /**
     * 插入新闻
     */
    int insert(News news);

    /**
     * 更新新闻
     */
    int update(News news);

    /**
     * 删除新闻
     */
    int deleteById(@Param("newsId") Integer newsId);
}
