package com.xxx.scm.controller;

import com.xxx.scm.entity.PurchaseOrder;
import com.xxx.scm.entity.R;
import com.xxx.scm.service.PurchaseOrderService;
import com.xxx.scm.service.SupplierService;
import com.xxx.scm.util.PageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * 采购订单 Controller — REST API
 */
@RestController
@RequestMapping("/api/purchase")
public class PurchaseOrderController {

    @Autowired
    private PurchaseOrderService orderService;

    @Autowired
    private SupplierService supplierService;

    /**
     * 采购订单列表
     */
    @GetMapping("/list")
    public R<?> list(@RequestParam(defaultValue = "1") int pageNo,
                     @RequestParam(defaultValue = "10") int pageSize,
                     @RequestParam(required = false) String orderNo,
                     @RequestParam(required = false) Integer supplierId,
                     @RequestParam(required = false) Integer status,
                     HttpServletRequest request) {
        String roleName = (String) request.getAttribute("roleName");
        Integer userId = (Integer) request.getAttribute("userId");
        // 非经理只能看自己的订单
        Integer createUser = "经理".equals(roleName) ? null : userId;

        PageResult<PurchaseOrder> page = orderService.findByPage(orderNo, supplierId, status, createUser, pageNo, pageSize);
        return R.ok(page);
    }

    /**
     * 获取供应商列表（创建订单用）
     */
    @GetMapping("/suppliers")
    public R<?> suppliers() {
        return R.ok(supplierService.findAll());
    }

    /**
     * 获取订单详情
     */
    @GetMapping("/{orderId}")
    public R<?> detail(@PathVariable Integer orderId) {
        return R.ok(orderService.findById(orderId));
    }

    /**
     * 创建采购订单
     */
    @PostMapping("/add")
    public R<?> add(@RequestBody PurchaseOrder order, HttpServletRequest request) {
        try {
            Integer userId = (Integer) request.getAttribute("userId");
            order.setCreateUser(userId);
            orderService.add(order);
            return R.ok("创建成功");
        } catch (Exception e) {
            return R.error(e.getMessage());
        }
    }

    /**
     * 审核采购订单
     */
    @PostMapping("/audit")
    public R<?> audit(@RequestParam Integer orderId, @RequestParam Integer status) {
        try {
            orderService.audit(orderId, status);
            return R.ok("审核成功");
        } catch (Exception e) {
            return R.error(e.getMessage());
        }
    }

    /**
     * 删除采购订单
     */
    @PostMapping("/delete")
    public R<?> delete(@RequestParam Integer orderId) {
        try {
            orderService.delete(orderId);
            return R.ok("删除成功");
        } catch (Exception e) {
            return R.error(e.getMessage());
        }
    }
}
