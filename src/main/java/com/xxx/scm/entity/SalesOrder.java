package com.xxx.scm.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * 销售订单实体类
 */
public class SalesOrder implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer orderId;
    private String orderNo;
    private BigDecimal totalAmount;
    private Integer createUser;
    private Date createTime;

    // 关联字段
    private String createUserName;
    private List<SalesOrderItem> orderItems;

    public SalesOrder() {}

    public Integer getOrderId() { return orderId; }
    public void setOrderId(Integer orderId) { this.orderId = orderId; }

    public String getOrderNo() { return orderNo; }
    public void setOrderNo(String orderNo) { this.orderNo = orderNo; }

    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }

    public Integer getCreateUser() { return createUser; }
    public void setCreateUser(Integer createUser) { this.createUser = createUser; }

    public Date getCreateTime() { return createTime; }
    public void setCreateTime(Date createTime) { this.createTime = createTime; }

    public String getCreateUserName() { return createUserName; }
    public void setCreateUserName(String createUserName) { this.createUserName = createUserName; }

    public List<SalesOrderItem> getOrderItems() { return orderItems; }
    public void setOrderItems(List<SalesOrderItem> orderItems) { this.orderItems = orderItems; }
}
