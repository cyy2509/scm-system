package com.xxx.scm.controller;

import com.xxx.scm.entity.DashboardVO;
import com.xxx.scm.entity.R;
import com.xxx.scm.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * 数据大屏 Controller — REST API
 */
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    /**
     * 获取大屏数据
     */
    @GetMapping("")
    public R<DashboardVO> dashboard() {
        return R.ok(dashboardService.getDashboardData());
    }

    /**
     * 销售趋势数据
     */
    @GetMapping("/trend")
    public R<?> getSalesTrend(@RequestParam(defaultValue = "7") int days) {
        return R.ok(dashboardService.getDashboardData().getSalesTrend());
    }
}
