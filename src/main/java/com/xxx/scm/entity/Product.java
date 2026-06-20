package com.xxx.scm.entity;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 商品实体类
 */
public class Product implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer productId;
    private String productName;
    private Integer categoryId;
    private BigDecimal price;
    private Integer stock;
    private Integer safetyStock;
    private String imageUrl;
    private String productDesc;

    // 关联字段
    private String categoryName;

    public Product() {}

    public Integer getProductId() { return productId; }
    public void setProductId(Integer productId) { this.productId = productId; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public Integer getCategoryId() { return categoryId; }
    public void setCategoryId(Integer categoryId) { this.categoryId = categoryId; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }

    public Integer getSafetyStock() { return safetyStock; }
    public void setSafetyStock(Integer safetyStock) { this.safetyStock = safetyStock; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getProductDesc() { return productDesc; }
    public void setProductDesc(String productDesc) { this.productDesc = productDesc; }

    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }

    // 判断是否库存预警
    public boolean isLowStock() {
        return stock != null && safetyStock != null && stock < safetyStock;
    }
}
