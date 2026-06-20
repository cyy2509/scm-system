package com.xxx.scm.util;

import java.io.Serializable;
import java.util.List;

/**
 * 通用分页结果类
 */
public class PageResult<T> implements Serializable {
    private static final long serialVersionUID = 1L;

    private int pageNo = 1;        // 当前页码
    private int pageSize = 10;     // 每页条数
    private int totalCount;        // 总记录数
    private int totalPage;         // 总页数
    private List<T> list;          // 当前页数据
    private String keyword;        // 搜索关键词

    public PageResult() {}

    public PageResult(int pageNo, int pageSize) {
        this.pageNo = pageNo;
        this.pageSize = pageSize;
    }

    public int getPageNo() { return pageNo; }
    public void setPageNo(int pageNo) { this.pageNo = pageNo; }

    public int getPageSize() { return pageSize; }
    public void setPageSize(int pageSize) { this.pageSize = pageSize; }

    public int getTotalCount() { return totalCount; }
    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
        // 自动计算总页数
        this.totalPage = (totalCount + pageSize - 1) / pageSize;
    }

    public int getTotalPage() { return totalPage; }
    public void setTotalPage(int totalPage) { this.totalPage = totalPage; }

    public List<T> getList() { return list; }
    public void setList(List<T> list) { this.list = list; }

    public String getKeyword() { return keyword; }
    public void setKeyword(String keyword) { this.keyword = keyword; }

    /**
     * 获取起始行号（用于SQL分页查询）
     */
    public int getOffset() {
        return (pageNo - 1) * pageSize;
    }

    /**
     * 是否有上一页
     */
    public boolean hasPrevious() {
        return pageNo > 1;
    }

    /**
     * 是否有下一页
     */
    public boolean hasNext() {
        return pageNo < totalPage;
    }
}
