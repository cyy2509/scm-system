<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>500 - 系统错误</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="${ctx}/static/css/style.css">
    <style>
        .error-page { background: linear-gradient(135deg, #f0f2f5 0%, #e8ecf1 100%); }
        .error-actions { display: flex; gap: 12px; justify-content: center; margin-top: 28px; }
        .btn-home {
            display: inline-flex; align-items: center; gap: 8px;
            padding: 12px 28px; border-radius: 8px; font-size: 14px; font-weight: 500;
            text-decoration: none; transition: all 0.25s; cursor: pointer; border: none;
        }
        .btn-primary { background: linear-gradient(135deg, #409EFF, #66b1ff); color: #fff; box-shadow: 0 4px 12px rgba(64,158,255,0.3); }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(64,158,255,0.4); }
        .btn-outline { background: #fff; color: #606266; border: 1px solid #DCDFE6; }
        .btn-outline:hover { border-color: #409EFF; color: #409EFF; }
        .error-detail { margin-top: 16px; padding: 16px 20px; background: #fef0f0; border-radius: 8px; border: 1px solid #fde2e2; max-width: 500px; margin-left: auto; margin-right: auto; }
        .error-detail p { color: #F56C6C; font-size: 13px; margin: 0; word-break: break-all; }
    </style>
</head>
<body>
<div class="error-page">
    <div class="error-content">
        <div class="error-code danger">500</div>
        <h2>系统错误</h2>
        <p>服务器开小差了，请稍后再试</p>
        <c:if test="${not empty errorMsg}">
            <div class="error-detail">
                <p><i class="fas fa-bug" style="margin-right:6px"></i>${errorMsg}</p>
            </div>
        </c:if>
        <div class="error-actions">
            <a href="${ctx}/dashboard" class="btn-home btn-primary"><i class="fas fa-home"></i> 返回首页</a>
            <button onclick="location.reload()" class="btn-home btn-outline"><i class="fas fa-redo"></i> 刷新重试</button>
        </div>
    </div>
</div>
</body>
</html>
