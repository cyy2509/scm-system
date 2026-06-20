package com.xxx.scm.service.impl;

import com.xxx.scm.entity.PurchaseOrder;
import com.xxx.scm.entity.PurchaseOrderItem;
import com.xxx.scm.exception.BusinessException;
import com.xxx.scm.mapper.ProductMapper;
import com.xxx.scm.mapper.PurchaseOrderMapper;
import com.xxx.scm.service.PurchaseOrderService;
import com.xxx.scm.util.OrderNoUtil;
import com.xxx.scm.util.PageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Service
public class PurchaseOrderServiceImpl implements PurchaseOrderService {

    @Autowired
    private PurchaseOrderMapper orderMapper;

    @Autowired
    private ProductMapper productMapper;

    @Override
    public PurchaseOrder findById(Integer orderId) {
        PurchaseOrder order = orderMapper.findById(orderId);
        if (order != null) {
            order.setOrderItems(orderMapper.findOrderItems(orderId));
        }
        return order;
    }

    @Override
    public PageResult<PurchaseOrder> findByPage(String orderNo, Integer supplierId,
                                                  Integer status, Integer createUser,
                                                  int pageNo, int pageSize) {
        PageResult<PurchaseOrder> page = new PageResult<>(pageNo, pageSize);
        int totalCount = orderMapper.findCount(orderNo, supplierId, status, createUser);
        page.setTotalCount(totalCount);

        if (totalCount > 0) {
            List<PurchaseOrder> list = orderMapper.findByPage(orderNo, supplierId, status, createUser,
                    page.getOffset(), pageSize);
            page.setList(list);
        }
        return page;
    }

    @Override
    @Transactional
    public void add(PurchaseOrder order) {
        // 生成订单号
        order.setOrderNo(OrderNoUtil.generatePurchaseOrderNo());
        // 初始状态：待审核
        order.setOrderStatus(PurchaseOrder.STATUS_PENDING);

        // 计算总金额
        BigDecimal totalAmount = BigDecimal.ZERO;
        if (order.getOrderItems() != null) {
            for (PurchaseOrderItem item : order.getOrderItems()) {
                item.setAmount(item.getPrice().multiply(new BigDecimal(item.getQuantity())));
                totalAmount = totalAmount.add(item.getAmount());
            }
        }
        order.setTotalAmount(totalAmount);

        // 插入订单
        orderMapper.insert(order);

        // 插入订单明细
        if (order.getOrderItems() != null) {
            for (PurchaseOrderItem item : order.getOrderItems()) {
                item.setOrderId(order.getOrderId());
                orderMapper.insertOrderItem(item);
            }
        }
    }

    @Override
    @Transactional
    public void audit(Integer orderId, Integer status) {
        PurchaseOrder order = orderMapper.findById(orderId);
        if (order == null) {
            throw new BusinessException("采购订单不存在");
        }
        if (order.getOrderStatus() != PurchaseOrder.STATUS_PENDING) {
            throw new BusinessException("只能审核待审核状态的订单");
        }

        // 更新状态
        orderMapper.updateStatus(orderId, status);

        // 如果审核通过，增加库存
        if (status == PurchaseOrder.STATUS_APPROVED) {
            List<PurchaseOrderItem> items = orderMapper.findOrderItems(orderId);
            for (PurchaseOrderItem item : items) {
                productMapper.increaseStock(item.getProductId(), item.getQuantity());
            }
        }
    }

    @Override
    @Transactional
    public void delete(Integer orderId) {
        PurchaseOrder order = orderMapper.findById(orderId);
        if (order == null) {
            throw new BusinessException("采购订单不存在");
        }
        // 只有待审核和已驳回的订单可以删除
        if (order.getOrderStatus() == PurchaseOrder.STATUS_APPROVED) {
            throw new BusinessException("已通过的订单不能删除");
        }

        // 先删除明细
        orderMapper.deleteOrderItems(orderId);
        // 再删除订单
        orderMapper.deleteById(orderId);
    }

    @Override
    public BigDecimal findMonthlyPurchaseAmount() {
        return orderMapper.findMonthlyPurchaseAmount();
    }

    @Override
    public List<Map<String, Object>> findSupplierTop5() {
        return orderMapper.findSupplierTop5();
    }
}
