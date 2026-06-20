<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - 页面不存在</title>
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
    </style>
</head>
<body>
<div class="error-page">
    <div class="error-content">
        <div class="error-code warning">404</div>
        <h2>抱歉，您访问的页面不存在</h2>
        <p>请检查您输入的网址是否正确，或点击下方按钮返回</p>
        <div class="error-actions">
            <a href="${ctx}/dashboard" class="btn-home btn-primary"><i class="fas fa-home"></i> 返回首页</a>
            <button onclick="history.back()" class="btn-home btn-outline"><i class="fas fa-arrow-left"></i> 返回上页</button>
        </div>
    </div>
</div>
</body>
</html>
