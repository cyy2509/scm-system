package com.xxx.scm.entity;

import java.io.Serializable;
import java.util.Date;

/**
 * 供应商实体类
 */
public class Supplier implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer supplierId;
    private String supplierName;
    private String contact;
    private String phone;
    private String address;
    private String remark;
    private Date createTime;

    public Supplier() {}

    public Integer getSupplierId() { return supplierId; }
    public void setSupplierId(Integer supplierId) { this.supplierId = supplierId; }

    public String getSupplierName() { return supplierName; }
    public void setSupplierName(String supplierName) { this.supplierName = supplierName; }

    public String getContact() { return contact; }
    public void setContact(String contact) { this.contact = contact; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getRemark() { return remark; }
    public void setRemark(String remark) { this.remark = remark; }

    public Date getCreateTime() { return createTime; }
    public void setCreateTime(Date createTime) { this.createTime = createTime; }
}
