package com.xxx.scm.aspect;

import com.xxx.scm.entity.SysOperationLog;
import com.xxx.scm.entity.SysUser;
import com.xxx.scm.mapper.SysOperationLogMapper;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * 操作日志AOP切面
 * 记录增删改操作
 */
@Aspect
@Component
public class OperationLogAspect {

    @Autowired
    private SysOperationLogMapper logMapper;

    @Autowired
    private HttpServletRequest request;

    // 切入点：Controller层中add/save/delete/update方法
    @Pointcut("execution(* com.xxx.scm.controller.*.*(..)) && " +
              "(execution(* com.xxx.scm.controller.*.add*(..)) || " +
              "execution(* com.xxx.scm.controller.*.save*(..)) || " +
              "execution(* com.xxx.scm.controller.*.delete*(..)) || " +
              "execution(* com.xxx.scm.controller.*.update*(..)) || " +
              "execution(* com.xxx.scm.controller.*.edit*(..)))")
    public void operationPointcut() {}

    @AfterReturning(pointcut = "operationPointcut()", returning = "result")
    public void afterReturning(JoinPoint joinPoint, Object result) {
        try {
            // 获取当前登录用户
            HttpSession session = request.getSession();
            SysUser user = (SysUser) session.getAttribute("loginUser");

            // 获取方法名和模块名
            String methodName = joinPoint.getSignature().getName();
            String className = joinPoint.getTarget().getClass().getSimpleName();
            String module = className.replace("Controller", "");

            // 判断操作类型
            String operation = "其他";
            if (methodName.startsWith("add") || methodName.startsWith("save")) {
                operation = "新增";
            } else if (methodName.startsWith("delete")) {
                operation = "删除";
            } else if (methodName.startsWith("update") || methodName.startsWith("edit")) {
                operation = "修改";
            }

            // 获取IP地址
            String ip = request.getRemoteAddr();

            // 保存日志
            SysOperationLog log = new SysOperationLog();
            if (user != null) {
                log.setUserId(user.getUserId());
                log.setUsername(user.getUsername());
            }
            log.setOperation(operation);
            log.setModule(module);
            log.setMethod(methodName);
            log.setIp(ip);

            logMapper.insert(log);
        } catch (Exception e) {
            // 日志记录失败不影响业务
            e.printStackTrace();
        }
    }
}
