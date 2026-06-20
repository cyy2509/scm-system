package com.xxx.scm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * 页面路由 Controller
 * 处理前端 SPA 路由，所有非 API 请求都返回 index.html
 */
@Controller
public class PageController {

    /**
     * 根路径 → 转发到 index.html
     */
    @GetMapping("/")
    public String index() {
        return "forward:/index.html";
    }
}
