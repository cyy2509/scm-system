package com.xxx.scm.exception;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

/**
 * 全局异常处理器
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    /**
     * 处理业务异常
     */
    @ExceptionHandler(BusinessException.class)
    public ModelAndView handleBusinessException(BusinessException e, HttpServletRequest request) {
        ModelAndView mv = new ModelAndView();
        mv.addObject("errorMsg", e.getMessage());
        mv.addObject("url", request.getRequestURI());
        mv.setViewName("common/error");
        return mv;
    }

    /**
     * 处理其他异常
     */
    @ExceptionHandler(Exception.class)
    public ModelAndView handleException(Exception e, HttpServletRequest request) {
        ModelAndView mv = new ModelAndView();
        mv.addObject("errorMsg", "系统错误：" + e.getMessage());
        mv.addObject("url", request.getRequestURI());
        mv.setViewName("common/500");
        return mv;
    }
}
