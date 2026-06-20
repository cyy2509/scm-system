package com.xxx.scm.service;

import com.xxx.scm.entity.SalesOrder;
import com.xxx.scm.util.PageResult;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * 销售订单Service接口
 */
public interface SalesOrderService {

    /**
     * 根据ID查询销售订单
     */
    SalesOrder findById(Integer orderId);

    /**
     * 分页查询销售订单
     */
    PageResult<SalesOrder> findByPage(String orderNo, String startDate,
                                       String endDate, Integer createUser,
                                       int pageNo, int pageSize);

    /**
     * 创建销售订单（自动扣减库存）
     */
    void add(SalesOrder order);

    /**
     * 删除销售订单
     */
    void delete(Integer orderId);

    /**
     * 查询今日销售额
     */
    BigDecimal findTodaySales();

    /**
     * 查询销售趋势（近7天/近30天）
     */
    List<Map<String, Object>> findSalesTrend(int days);

    /**
     * 查询最近订单
     */
    List<SalesOrder> findRecentOrders(int limit);
}
