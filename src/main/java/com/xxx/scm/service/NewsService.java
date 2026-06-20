package com.xxx.scm.service;

import com.xxx.scm.entity.News;
import com.xxx.scm.util.PageResult;

/**
 * 新闻Service接口
 */
public interface NewsService {

    /**
     * 根据ID查询新闻
     */
    News findById(Integer newsId);

    /**
     * 分页查询新闻
     */
    PageResult<News> findByPage(String keyword, int pageNo, int pageSize);

    /**
     * 添加新闻
     */
    void add(News news);

    /**
     * 修改新闻
     */
    void update(News news);

    /**
     * 删除新闻
     */
    void delete(Integer newsId);
}
