package com.xxx.scm.mapper;

import com.xxx.scm.entity.SalesOrder;
import com.xxx.scm.entity.SalesOrderItem;
import org.apache.ibatis.annotations.Param;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * 销售订单Mapper接口
 */
public interface SalesOrderMapper {

    /**
     * 根据ID查询销售订单
     */
    SalesOrder findById(@Param("orderId") Integer orderId);

    /**
     * 分页查询销售订单
     */
    List<SalesOrder> findByPage(@Param("orderNo") String orderNo,
                                 @Param("startDate") String startDate,
                                 @Param("endDate") String endDate,
                                 @Param("createUser") Integer createUser,
                                 @Param("offset") int offset,
                                 @Param("pageSize") int pageSize);

    /**
     * 查询销售订单总数
     */
    int findCount(@Param("orderNo") String orderNo,
                  @Param("startDate") String startDate,
                  @Param("endDate") String endDate,
                  @Param("createUser") Integer createUser);

    /**
     * 插入销售订单
     */
    int insert(SalesOrder order);

    /**
     * 删除销售订单
     */
    int deleteById(@Param("orderId") Integer orderId);

    /**
     * 查询订单明细
     */
    List<SalesOrderItem> findOrderItems(@Param("orderId") Integer orderId);

    /**
     * 插入订单明细
     */
    int insertOrderItem(SalesOrderItem item);

    /**
     * 删除订单明细
     */
    int deleteOrderItems(@Param("orderId") Integer orderId);

    /**
     * 查询今日销售额
     */
    BigDecimal findTodaySales();

    /**
     * 查询近7天销售趋势
     */
    List<Map<String, Object>> findSalesTrend7Days();

    /**
     * 查询近30天销售趋势
     */
    List<Map<String, Object>> findSalesTrend30Days();

    /**
     * 查询最近订单
     */
    List<SalesOrder> findRecentOrders(@Param("limit") int limit);
}
