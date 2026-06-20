package com.xxx.scm.service;

import com.xxx.scm.entity.PurchaseOrder;
import com.xxx.scm.util.PageResult;
import java.math.BigDecimal;

/**
 * 采购订单Service接口
 */
public interface PurchaseOrderService {

    /**
     * 根据ID查询采购订单
     */
    PurchaseOrder findById(Integer orderId);

    /**
     * 分页查询采购订单
     */
    PageResult<PurchaseOrder> findByPage(String orderNo, Integer supplierId,
                                          Integer status, Integer createUser,
                                          int pageNo, int pageSize);

    /**
     * 创建采购订单
     */
    void add(PurchaseOrder order);

    /**
     * 审核采购订单（通过/驳回）
     */
    void audit(Integer orderId, Integer status);

    /**
     * 删除采购订单
     */
    void delete(Integer orderId);

    /**
     * 查询本月采购总额
     */
    BigDecimal findMonthlyPurchaseAmount();

    /**
     * 查询供应商供货TOP5
     */
    java.util.List<java.util.Map<String, Object>> findSupplierTop5();
}
