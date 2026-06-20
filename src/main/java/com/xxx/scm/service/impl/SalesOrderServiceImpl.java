package com.xxx.scm.service.impl;

import com.xxx.scm.entity.Product;
import com.xxx.scm.entity.SalesOrder;
import com.xxx.scm.entity.SalesOrderItem;
import com.xxx.scm.exception.BusinessException;
import com.xxx.scm.mapper.ProductMapper;
import com.xxx.scm.mapper.SalesOrderMapper;
import com.xxx.scm.service.SalesOrderService;
import com.xxx.scm.util.OrderNoUtil;
import com.xxx.scm.util.PageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Service
public class SalesOrderServiceImpl implements SalesOrderService {

    @Autowired
    private SalesOrderMapper orderMapper;

    @Autowired
    private ProductMapper productMapper;

    @Override
    public SalesOrder findById(Integer orderId) {
        SalesOrder order = orderMapper.findById(orderId);
        if (order != null) {
            order.setOrderItems(orderMapper.findOrderItems(orderId));
        }
        return order;
    }

    @Override
    public PageResult<SalesOrder> findByPage(String orderNo, String startDate,
                                              String endDate, Integer createUser,
                                              int pageNo, int pageSize) {
        PageResult<SalesOrder> page = new PageResult<>(pageNo, pageSize);
        int totalCount = orderMapper.findCount(orderNo, startDate, endDate, createUser);
        page.setTotalCount(totalCount);

        if (totalCount > 0) {
            List<SalesOrder> list = orderMapper.findByPage(orderNo, startDate, endDate, createUser,
                    page.getOffset(), pageSize);
            page.setList(list);
        }
        return page;
    }

    @Override
    @Transactional
    public void add(SalesOrder order) {
        // 生成订单号
        order.setOrderNo(OrderNoUtil.generateSalesOrderNo());

        // 验证库存并计算总金额
        BigDecimal totalAmount = BigDecimal.ZERO;
        if (order.getOrderItems() != null) {
            for (SalesOrderItem item : order.getOrderItems()) {
                // 查询商品库存
                Product product = productMapper.findById(item.getProductId());
                if (product == null) {
                    throw new BusinessException("商品不存在");
                }
                if (product.getStock() < item.getQuantity()) {
                    throw new BusinessException("商品【" + product.getProductName() + "】库存不足，当前库存：" + product.getStock());
                }

                item.setAmount(item.getPrice().multiply(new BigDecimal(item.getQuantity())));
                totalAmount = totalAmount.add(item.getAmount());
            }
        }
        order.setTotalAmount(totalAmount);

        // 插入订单
        orderMapper.insert(order);

        // 插入订单明细并扣减库存
        if (order.getOrderItems() != null) {
            for (SalesOrderItem item : order.getOrderItems()) {
                item.setOrderId(order.getOrderId());
                orderMapper.insertOrderItem(item);

                // 扣减库存
                int rows = productMapper.decreaseStock(item.getProductId(), item.getQuantity());
                if (rows == 0) {
                    throw new BusinessException("库存扣减失败，库存不足");
                }
            }
        }
    }

    @Override
    @Transactional
    public void delete(Integer orderId) {
        SalesOrder order = orderMapper.findById(orderId);
        if (order == null) {
            throw new BusinessException("销售订单不存在");
        }

        // 先把卖出去的商品库存加回来
        List<SalesOrderItem> items = orderMapper.findOrderItems(orderId);
        if (items != null) {
            for (SalesOrderItem item : items) {
                productMapper.increaseStock(item.getProductId(), item.getQuantity());
            }
        }

        // 删明细，再删订单
        orderMapper.deleteOrderItems(orderId);
        orderMapper.deleteById(orderId);
    }

    @Override
    public BigDecimal findTodaySales() {
        return orderMapper.findTodaySales();
    }

    @Override
    public List<Map<String, Object>> findSalesTrend(int days) {
        if (days == 30) {
            return orderMapper.findSalesTrend30Days();
        }
        return orderMapper.findSalesTrend7Days();
    }

    @Override
    public List<SalesOrder> findRecentOrders(int limit) {
        return orderMapper.findRecentOrders(limit);
    }
}
