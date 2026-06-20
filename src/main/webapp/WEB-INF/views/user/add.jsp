<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<jsp:include page="../common/header.jsp">
    <jsp:param name="title" value="添加用户"/>
</jsp:include>
<jsp:include page="../common/menu.jsp"/>

<el-card class="form-card" shadow="never">
    <div slot="header"><h3>添加用户</h3></div>

    <c:if test="${not empty errorMsg}">
        <el-alert title="${errorMsg}" type="error" show-icon style="margin-bottom:20px"></el-alert>
    </c:if>

    <form method="post" action="${ctx}/user/add">
        <el-form label-position="top" size="small">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="用户名" required>
                        <el-input name="username" value="${user.username}" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="密码" required>
                        <el-input name="password" type="password" placeholder="请输入密码" prefix-icon="el-icon-lock" show-password></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="姓名" required>
                        <el-input name="realName" value="${user.realName}" placeholder="请输入姓名" prefix-icon="el-icon-postcard"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="角色" required>
                        <select name="roleId" style="width:100%;height:32px;border:1px solid #DCDFE6;border-radius:4px;padding:0 10px;color:#606266;font-size:13px;" required>
                            <option value="">请选择角色</option>
                            <c:forEach items="${roles}" var="role">
                                <option value="${role.roleId}" ${user.roleId == role.roleId ? 'selected' : ''}>${role.roleName}</option>
                            </c:forEach>
                        </select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="电话">
                        <el-input name="phone" value="${user.phone}" placeholder="请输入电话" prefix-icon="el-icon-phone"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="邮箱">
                        <el-input name="email" type="email" value="${user.email}" placeholder="请输入邮箱" prefix-icon="el-icon-message"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <el-button type="primary" native-type="submit" icon="el-icon-check">保存</el-button>
                <el-button icon="el-icon-back" @click="location.href='${ctx}/user/list'">返回</el-button>
            </el-form-item>
        </el-form>
    </form>
</el-card>

<jsp:include page="../common/footer.jsp"/>
