<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<jsp:include page="../common/header.jsp">
    <jsp:param name="title" value="添加供应商"/>
</jsp:include>
<jsp:include page="../common/menu.jsp"/>

<el-card class="form-card" shadow="never">
    <div slot="header"><h3>添加供应商</h3></div>

    <c:if test="${not empty errorMsg}">
        <el-alert title="${errorMsg}" type="error" show-icon style="margin-bottom:20px"></el-alert>
    </c:if>

    <form method="post" action="${ctx}/supplier/add">
        <el-form label-position="top" size="small">
            <el-form-item label="供应商名称" required>
                <el-input name="supplierName" value="${supplier.supplierName}" placeholder="请输入供应商名称" prefix-icon="el-icon-office-building"></el-input>
            </el-form-item>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="联系人">
                        <el-input name="contact" value="${supplier.contact}" placeholder="请输入联系人" prefix-icon="el-icon-user"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="电话">
                        <el-input name="phone" value="${supplier.phone}" placeholder="请输入电话" prefix-icon="el-icon-phone"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="地址">
                <el-input name="address" value="${supplier.address}" placeholder="请输入地址" prefix-icon="el-icon-location"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input name="remark" type="textarea" :rows="3" placeholder="请输入备注">${supplier.remark}</el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit" icon="el-icon-check">保存</el-button>
                <el-button icon="el-icon-back" @click="location.href='${ctx}/supplier/list'">返回</el-button>
            </el-form-item>
        </el-form>
    </form>
</el-card>

<jsp:include page="../common/footer.jsp"/>
