package com.xxx.scm.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * 采购订单实体类
 */
public class PurchaseOrder implements Serializable {
    private static final long serialVersionUID = 1L;

    public static final int STATUS_PENDING = 0;   // 待审核
    public static final int STATUS_APPROVED = 1;  // 已通过
    public static final int STATUS_REJECTED = 2;  // 已驳回

    private Integer orderId;
    private String orderNo;
    private Integer supplierId;
    private BigDecimal totalAmount;
    private Integer orderStatus;  // 0-待审核 1-已通过 2-已驳回
    private Integer createUser;
    private Date createTime;

    // 关联字段
    private String supplierName;
    private String createUserName;
    private List<PurchaseOrderItem> orderItems;

    public PurchaseOrder() {}

    public Integer getOrderId() { return orderId; }
    public void setOrderId(Integer orderId) { this.orderId = orderId; }

    public String getOrderNo() { return orderNo; }
    public void setOrderNo(String orderNo) { this.orderNo = orderNo; }

    public Integer getSupplierId() { return supplierId; }
    public void setSupplierId(Integer supplierId) { this.supplierId = supplierId; }

    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }

    public Integer getOrderStatus() { return orderStatus; }
    public void setOrderStatus(Integer orderStatus) { this.orderStatus = orderStatus; }

    public Integer getCreateUser() { return createUser; }
    public void setCreateUser(Integer createUser) { this.createUser = createUser; }

    public Date getCreateTime() { return createTime; }
    public void setCreateTime(Date createTime) { this.createTime = createTime; }

    public String getSupplierName() { return supplierName; }
    public void setSupplierName(String supplierName) { this.supplierName = supplierName; }

    public String getCreateUserName() { return createUserName; }
    public void setCreateUserName(String createUserName) { this.createUserName = createUserName; }

    public List<PurchaseOrderItem> getOrderItems() { return orderItems; }
    public void setOrderItems(List<PurchaseOrderItem> orderItems) { this.orderItems = orderItems; }

    public String getStatusText() {
        switch (orderStatus) {
            case STATUS_PENDING: return "待审核";
            case STATUS_APPROVED: return "已通过";
            case STATUS_REJECTED: return "已驳回";
            default: return "未知";
        }
    }
}
