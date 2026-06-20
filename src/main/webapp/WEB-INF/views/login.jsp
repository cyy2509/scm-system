<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>登录 - 百货中心供应链管理系统</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="${ctx}/static/css/style.css">
</head>
<body>
<div class="login-page">
    <!-- 动态背景粒子 -->
    <div class="login-bg-particles">
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
    </div>

    <div class="login-box">
        <div class="login-header">
            <div class="login-logo">
                <i class="fas fa-cubes"></i>
            </div>
            <h2>百货中心供应链管理系统</h2>
            <p>请登录您的账号</p>
        </div>

        <c:if test="${not empty errorMsg}">
            <div class="login-error">
                <i class="fas fa-exclamation-circle"></i>
                <span>${errorMsg}</span>
            </div>
        </c:if>

        <form method="post" action="${ctx}/login" id="loginForm">
            <div class="login-input-group">
                <label for="username"><i class="fas fa-user"></i> 用户名</label>
                <input type="text" id="username" name="username" value="${username}"
                       placeholder="请输入用户名" required autocomplete="username">
            </div>
            <div class="login-input-group">
                <label for="password"><i class="fas fa-lock"></i> 密码</label>
                <div class="password-wrapper">
                    <input type="password" id="password" name="password"
                           placeholder="请输入密码" required autocomplete="current-password">
                    <button type="button" class="toggle-password" onclick="togglePassword()">
                        <i class="fas fa-eye" id="eyeIcon"></i>
                    </button>
                </div>
            </div>
            <button type="submit" class="login-btn">
                <i class="fas fa-sign-in-alt"></i> 登 录
            </button>
        </form>

        <div class="login-tips">
            <p><i class="fas fa-info-circle"></i> 测试账号</p>
            <div class="tip-accounts">
                <span>admin / 123456（经理）</span>
                <span>caigou / 123456（采购）</span>
                <span>xiaoshou / 123456（销售）</span>
                <span>wuzi / 123456（物资）</span>
                <span>renshi / 123456（人事）</span>
            </div>
        </div>
    </div>
</div>

<script>
function togglePassword() {
    var pwd = document.getElementById('password');
    var icon = document.getElementById('eyeIcon');
    if (pwd.type === 'password') {
        pwd.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        pwd.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

// 输入框聚焦动画
document.querySelectorAll('.login-input-group input').forEach(function(input) {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});
</script>
</body>
</html>
