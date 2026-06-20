package com.xxx.scm.entity;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 销售订单明细实体类
 */
public class SalesOrderItem implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer itemId;
    private Integer orderId;
    private Integer productId;
    private Integer quantity;
    private BigDecimal price;
    private BigDecimal amount;

    // 关联字段
    private String productName;

    public SalesOrderItem() {}

    public Integer getItemId() { return itemId; }
    public void setItemId(Integer itemId) { this.itemId = itemId; }

    public Integer getOrderId() { return orderId; }
    public void setOrderId(Integer orderId) { this.orderId = orderId; }

    public Integer getProductId() { return productId; }
    public void setProductId(Integer productId) { this.productId = productId; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }
}
