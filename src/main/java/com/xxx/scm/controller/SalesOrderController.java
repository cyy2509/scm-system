package com.xxx.scm.controller;

import com.xxx.scm.entity.R;
import com.xxx.scm.entity.SalesOrder;
import com.xxx.scm.service.SalesOrderService;
import com.xxx.scm.util.PageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * 销售订单 Controller — REST API
 */
@RestController
@RequestMapping("/api/sales")
public class SalesOrderController {

    @Autowired
    private SalesOrderService orderService;

    /**
     * 销售订单列表
     */
    @GetMapping("/list")
    public R<?> list(@RequestParam(defaultValue = "1") int pageNo,
                     @RequestParam(defaultValue = "10") int pageSize,
                     @RequestParam(required = false) String orderNo,
                     @RequestParam(required = false) String startDate,
                     @RequestParam(required = false) String endDate,
                     HttpServletRequest request) {
        String roleName = (String) request.getAttribute("roleName");
        Integer userId = (Integer) request.getAttribute("userId");
        Integer createUser = "经理".equals(roleName) ? null : userId;

        PageResult<SalesOrder> page = orderService.findByPage(orderNo, startDate, endDate, createUser, pageNo, pageSize);
        return R.ok(page);
    }

    /**
     * 获取订单详情
     */
    @GetMapping("/{orderId}")
    public R<?> detail(@PathVariable Integer orderId) {
        return R.ok(orderService.findById(orderId));
    }

    /**
     * 创建销售订单
     */
    @PostMapping("/add")
    public R<?> add(@RequestBody SalesOrder order, HttpServletRequest request) {
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
     * 删除销售订单
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
