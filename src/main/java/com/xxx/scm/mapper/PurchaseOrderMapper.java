package com.xxx.scm.mapper;

import com.xxx.scm.entity.PurchaseOrder;
import com.xxx.scm.entity.PurchaseOrderItem;
import org.apache.ibatis.annotations.Param;
import java.math.BigDecimal;
import java.util.List;

/**
 * 采购订单Mapper接口
 */
public interface PurchaseOrderMapper {

    /**
     * 根据ID查询采购订单
     */
    PurchaseOrder findById(@Param("orderId") Integer orderId);

    /**
     * 分页查询采购订单
     */
    List<PurchaseOrder> findByPage(@Param("orderNo") String orderNo,
                                    @Param("supplierId") Integer supplierId,
                                    @Param("status") Integer status,
                                    @Param("createUser") Integer createUser,
                                    @Param("offset") int offset,
                                    @Param("pageSize") int pageSize);

    /**
     * 查询采购订单总数
     */
    int findCount(@Param("orderNo") String orderNo,
                  @Param("supplierId") Integer supplierId,
                  @Param("status") Integer status,
                  @Param("createUser") Integer createUser);

    /**
     * 插入采购订单
     */
    int insert(PurchaseOrder order);

    /**
     * 更新采购订单状态
     */
    int updateStatus(@Param("orderId") Integer orderId, @Param("status") Integer status);

    /**
     * 删除采购订单
     */
    int deleteById(@Param("orderId") Integer orderId);

    /**
     * 查询订单明细
     */
    List<PurchaseOrderItem> findOrderItems(@Param("orderId") Integer orderId);

    /**
     * 插入订单明细
     */
    int insertOrderItem(PurchaseOrderItem item);

    /**
     * 删除订单明细
     */
    int deleteOrderItems(@Param("orderId") Integer orderId);

    /**
     * 查询本月采购总额
     */
    BigDecimal findMonthlyPurchaseAmount();

    /**
     * 查询供应商供货TOP5
     */
    List<java.util.Map<String, Object>> findSupplierTop5();
}
