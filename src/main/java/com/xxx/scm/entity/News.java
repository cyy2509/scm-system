package com.xxx.scm.entity;

import java.io.Serializable;
import java.util.Date;

/**
 * 新闻实体类
 */
public class News implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer newsId;
    private String title;
    private String content;
    private String author;
    private Date createTime;

    public News() {}

    public Integer getNewsId() { return newsId; }
    public void setNewsId(Integer newsId) { this.newsId = newsId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public Date getCreateTime() { return createTime; }
    public void setCreateTime(Date createTime) { this.createTime = createTime; }
}
