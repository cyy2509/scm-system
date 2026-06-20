<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<jsp:include page="../common/header.jsp">
    <jsp:param name="title" value="添加角色"/>
</jsp:include>
<jsp:include page="../common/menu.jsp"/>

<el-card class="form-card" shadow="never" style="max-width:560px">
    <div slot="header"><h3>添加角色</h3></div>

    <c:if test="${not empty errorMsg}">
        <el-alert title="${errorMsg}" type="error" show-icon style="margin-bottom:20px"></el-alert>
    </c:if>

    <form method="post" action="${ctx}/role/add">
        <el-form label-position="top" size="small">
            <el-form-item label="角色名称" required>
                <el-input name="roleName" value="${role.roleName}" placeholder="请输入角色名称" prefix-icon="el-icon-user-solid"></el-input>
            </el-form-item>
            <el-form-item label="角色描述">
                <el-input name="roleDesc" type="textarea" :rows="3" placeholder="请输入角色描述">${role.roleDesc}</el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit" icon="el-icon-check">保存</el-button>
                <el-button icon="el-icon-back" @click="location.href='${ctx}/role/list'">返回</el-button>
            </el-form-item>
        </el-form>
    </form>
</el-card>

<jsp:include page="../common/footer.jsp"/>
