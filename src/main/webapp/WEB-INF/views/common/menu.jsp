<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<el-container>
    <!-- 侧边导航栏 -->
    <el-aside width="220px" class="sidebar-container">
        <div class="sidebar-logo">
            <div class="logo-icon">
                <i class="fas fa-cubes"></i>
            </div>
            <h1>供应链管理系统</h1>
        </div>
        <el-menu
            :default-active="activeMenu"
            background-color="transparent"
            text-color="rgba(255,255,255,0.65)"
            active-text-color="#ffffff">

            <el-menu-item index="/dashboard" onclick="location.href='${ctx}/dashboard'">
                <i class="fas fa-chart-line"></i>
                <span slot="title">数据大屏</span>
            </el-menu-item>

            <c:if test="${sessionScope.loginUser.roleName == '经理' || sessionScope.loginUser.roleName == '人事部员工'}">
                <el-menu-item index="/user" onclick="location.href='${ctx}/user/list'">
                    <i class="fas fa-users"></i>
                    <span slot="title">用户管理</span>
                </el-menu-item>
            </c:if>

            <c:if test="${sessionScope.loginUser.roleName == '经理'}">
                <el-menu-item index="/role" onclick="location.href='${ctx}/role/list'">
                    <i class="fas fa-user-shield"></i>
                    <span slot="title">角色管理</span>
                </el-menu-item>
            </c:if>

            <c:if test="${sessionScope.loginUser.roleName == '经理' || sessionScope.loginUser.roleName == '采购部员工'}">
                <el-menu-item index="/supplier" onclick="location.href='${ctx}/supplier/list'">
                    <i class="fas fa-truck-loading"></i>
                    <span slot="title">供应商管理</span>
                </el-menu-item>
            </c:if>

            <c:if test="${sessionScope.loginUser.roleName == '经理' || sessionScope.loginUser.roleName == '物资部员工'}">
                <el-menu-item index="/product" onclick="location.href='${ctx}/product/list'">
                    <i class="fas fa-box-open"></i>
                    <span slot="title">商品管理</span>
                </el-menu-item>
            </c:if>

            <c:if test="${sessionScope.loginUser.roleName == '经理' || sessionScope.loginUser.roleName == '采购部员工'}">
                <el-menu-item index="/purchase" onclick="location.href='${ctx}/purchase/list'">
                    <i class="fas fa-shopping-cart"></i>
                    <span slot="title">采购订单</span>
                </el-menu-item>
            </c:if>

            <c:if test="${sessionScope.loginUser.roleName == '经理' || sessionScope.loginUser.roleName == '销售部员工'}">
                <el-menu-item index="/sales" onclick="location.href='${ctx}/sales/list'">
                    <i class="fas fa-file-invoice-dollar"></i>
                    <span slot="title">销售订单</span>
                </el-menu-item>
            </c:if>

            <el-menu-item index="/news" onclick="location.href='${ctx}/news/list'">
                <i class="fas fa-newspaper"></i>
                <span slot="title">新闻公告</span>
            </el-menu-item>

            <c:if test="${sessionScope.loginUser.roleName == '经理'}">
                <el-menu-item index="/log" onclick="location.href='${ctx}/log/list'">
                    <i class="fas fa-clipboard-list"></i>
                    <span slot="title">操作日志</span>
                </el-menu-item>
            </c:if>
        </el-menu>
    </el-aside>

    <!-- 右侧主区域 -->
    <el-container class="main-area">
        <!-- 顶部栏 -->
        <el-header class="header-bar" height="64px">
            <div class="page-title">${param.title}</div>
            <div class="user-area">
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link user-name">
                        <i class="fas fa-user-circle" style="margin-right:6px;color:#409EFF"></i>
                        ${sessionScope.loginUser.realName}
                        <span style="color:#c0c4cc;margin:0 4px">|</span>
                        <span style="color:#909399;font-size:12px">${sessionScope.loginUser.roleName}</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="password" icon="el-icon-lock">修改密码</el-dropdown-item>
                        <el-dropdown-item divided command="logout" icon="el-icon-switch-button">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>

        <!-- 页面内容 -->
        <el-main class="content-area">
