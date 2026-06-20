package com.xxx.scm.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * 数据大屏VO
 */
public class DashboardVO implements Serializable {
    private static final long serialVersionUID = 1L;

    private BigDecimal todaySales;           // 今日销售额
    private BigDecimal monthlyPurchase;      // 本月采购额
    private Integer lowStockCount;           // 库存预警数
    private Integer newSupplierCount;        // 新增供应商数
    private List<Map<String, Object>> salesTrend;      // 销售趋势
    private List<Map<String, Object>> categorySales;   // 类别销售占比
    private List<Map<String, Object>> supplierTop5;    // 供应商TOP5
    private List<Product> lowStockProducts;             // 库存预警商品
    private List<SalesOrder> recentOrders;              // 最近订单

    public DashboardVO() {}

    public BigDecimal getTodaySales() { return todaySales; }
    public void setTodaySales(BigDecimal todaySales) { this.todaySales = todaySales; }

    public BigDecimal getMonthlyPurchase() { return monthlyPurchase; }
    public void setMonthlyPurchase(BigDecimal monthlyPurchase) { this.monthlyPurchase = monthlyPurchase; }

    public Integer getLowStockCount() { return lowStockCount; }
    public void setLowStockCount(Integer lowStockCount) { this.lowStockCount = lowStockCount; }

    public Integer getNewSupplierCount() { return newSupplierCount; }
    public void setNewSupplierCount(Integer newSupplierCount) { this.newSupplierCount = newSupplierCount; }

    public List<Map<String, Object>> getSalesTrend() { return salesTrend; }
    public void setSalesTrend(List<Map<String, Object>> salesTrend) { this.salesTrend = salesTrend; }

    public List<Map<String, Object>> getCategorySales() { return categorySales; }
    public void setCategorySales(List<Map<String, Object>> categorySales) { this.categorySales = categorySales; }

    public List<Map<String, Object>> getSupplierTop5() { return supplierTop5; }
    public void setSupplierTop5(List<Map<String, Object>> supplierTop5) { this.supplierTop5 = supplierTop5; }

    public List<Product> getLowStockProducts() { return lowStockProducts; }
    public void setLowStockProducts(List<Product> lowStockProducts) { this.lowStockProducts = lowStockProducts; }

    public List<SalesOrder> getRecentOrders() { return recentOrders; }
    public void setRecentOrders(List<SalesOrder> recentOrders) { this.recentOrders = recentOrders; }
}
