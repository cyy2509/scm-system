package com.xxx.scm.service.impl;

import com.xxx.scm.entity.DashboardVO;
import com.xxx.scm.mapper.ProductMapper;
import com.xxx.scm.mapper.PurchaseOrderMapper;
import com.xxx.scm.mapper.SalesOrderMapper;
import com.xxx.scm.mapper.SupplierMapper;
import com.xxx.scm.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private SalesOrderMapper salesOrderMapper;

    @Autowired
    private PurchaseOrderMapper purchaseOrderMapper;

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private SupplierMapper supplierMapper;

    @Override
    public DashboardVO getDashboardData() {
        DashboardVO vo = new DashboardVO();

        // 今天卖了多少钱
        vo.setTodaySales(salesOrderMapper.findTodaySales());

        // 这个月采购花了多少钱
        vo.setMonthlyPurchase(purchaseOrderMapper.findMonthlyPurchaseAmount());

        // 有多少商品库存不够了
        vo.setLowStockCount(productMapper.countLowStock());

        // 库存预警的商品列表
        vo.setLowStockProducts(productMapper.findLowStockProducts());

        // 最近7天销售趋势
        vo.setSalesTrend(salesOrderMapper.findSalesTrend7Days());

        // 各类别商品的销售占比
        vo.setCategorySales(productMapper.findCategorySalesRatio());

        // 哪个供应商供货最多（TOP5）
        vo.setSupplierTop5(purchaseOrderMapper.findSupplierTop5());

        // 最近几笔订单
        vo.setRecentOrders(salesOrderMapper.findRecentOrders(5));

        // 本月新合作的供应商数量
        vo.setNewSupplierCount(supplierMapper.countNewSuppliersThisMonth());

        return vo;
    }
}
