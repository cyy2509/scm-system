package com.xxx.scm.entity;

import java.io.Serializable;

/**
 * 商品分类实体类
 */
public class ProductCategory implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer categoryId;
    private String categoryName;
    private String categoryDesc;

    public ProductCategory() {}

    public Integer getCategoryId() { return categoryId; }
    public void setCategoryId(Integer categoryId) { this.categoryId = categoryId; }

    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }

    public String getCategoryDesc() { return categoryDesc; }
    public void setCategoryDesc(String categoryDesc) { this.categoryDesc = categoryDesc; }
}
