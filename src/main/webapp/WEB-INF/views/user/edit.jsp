<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<jsp:include page="../common/header.jsp">
    <jsp:param name="title" value="编辑用户"/>
</jsp:include>
<jsp:include page="../common/menu.jsp"/>

<el-card class="form-card" shadow="never">
    <div slot="header"><h3>编辑用户</h3></div>

    <c:if test="${not empty errorMsg}">
        <el-alert title="${errorMsg}" type="error" show-icon style="margin-bottom:20px"></el-alert>
    </c:if>

    <form method="post" action="${ctx}/user/edit">
        <input type="hidden" name="userId" value="${user.userId}">
        <el-form label-position="top" size="small">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="用户名">
                        <el-input :value="'${user.username}'" disabled prefix-icon="el-icon-user">
                            <template slot="prepend"><i class="el-icon-lock" style="color:#c0c4cc"></i></template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="密码（留空不修改）">
                        <el-input name="password" type="password" placeholder="留空表示不修改" prefix-icon="el-icon-lock" show-password></el-input>
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
            <el-form-item label="状态">
                <select name="status" style="width:200px;height:32px;border:1px solid #DCDFE6;border-radius:4px;padding:0 10px;color:#606266;font-size:13px;">
                    <option value="1" ${user.status == 1 ? 'selected' : ''}>启用</option>
                    <option value="0" ${user.status == 0 ? 'selected' : ''}>禁用</option>
                </select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit" icon="el-icon-check">保存</el-button>
                <el-button icon="el-icon-back" @click="location.href='${ctx}/user/list'">返回</el-button>
            </el-form-item>
        </el-form>
    </form>
</el-card>

<jsp:include page="../common/footer.jsp"/>
