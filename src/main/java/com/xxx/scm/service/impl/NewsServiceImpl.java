package com.xxx.scm.service.impl;

import com.xxx.scm.entity.News;
import com.xxx.scm.mapper.NewsMapper;
import com.xxx.scm.service.NewsService;
import com.xxx.scm.util.PageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsServiceImpl implements NewsService {

    @Autowired
    private NewsMapper newsMapper;

    @Override
    public News findById(Integer newsId) {
        return newsMapper.findById(newsId);
    }

    @Override
    public PageResult<News> findByPage(String keyword, int pageNo, int pageSize) {
        PageResult<News> page = new PageResult<>(pageNo, pageSize);
        int totalCount = newsMapper.findCount(keyword);
        page.setTotalCount(totalCount);

        if (totalCount > 0) {
            List<News> list = newsMapper.findByPage(keyword, page.getOffset(), pageSize);
            page.setList(list);
        }
        return page;
    }

    @Override
    public void add(News news) {
        newsMapper.insert(news);
    }

    @Override
    public void update(News news) {
        newsMapper.update(news);
    }

    @Override
    public void delete(Integer newsId) {
        newsMapper.deleteById(newsId);
    }
}
