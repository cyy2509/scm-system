<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<jsp:include page="../common/header.jsp">
    <jsp:param name="title" value="修改密码"/>
</jsp:include>
<jsp:include page="../common/menu.jsp"/>

<el-card class="form-card" shadow="never" style="max-width:500px">
    <div slot="header"><h3><i class="el-icon-lock" style="margin-right:8px"></i>修改密码</h3></div>

    <c:if test="${not empty errorMsg}">
        <el-alert title="${errorMsg}" type="error" show-icon style="margin-bottom:20px"></el-alert>
    </c:if>
    <c:if test="${not empty successMsg}">
        <el-alert title="${successMsg}" type="success" show-icon style="margin-bottom:20px"></el-alert>
    </c:if>

    <form method="post" action="${ctx}/user/password">
        <el-form label-position="top" size="small">
            <el-form-item label="原密码">
                <el-input name="oldPassword" type="password" placeholder="请输入原密码" prefix-icon="el-icon-lock" show-password></el-input>
            </el-form-item>
            <el-form-item label="新密码">
                <el-input name="newPassword" type="password" placeholder="请输入新密码（至少6位）" prefix-icon="el-icon-key" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认新密码">
                <el-input name="confirmPassword" type="password" placeholder="请再次输入新密码" prefix-icon="el-icon-key" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit" icon="el-icon-check">确认修改</el-button>
                <el-button icon="el-icon-back" @click="location.href='${ctx}/dashboard'">返回首页</el-button>
            </el-form-item>
        </el-form>
    </form>
</el-card>

<jsp:include page="../common/footer.jsp"/>
