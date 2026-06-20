<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<jsp:include page="../common/header.jsp">
    <jsp:param name="title" value="添加商品"/>
</jsp:include>
<jsp:include page="../common/menu.jsp"/>

<el-card class="form-card" shadow="never">
    <div slot="header"><h3>添加商品</h3></div>

    <c:if test="${not empty errorMsg}">
        <el-alert title="${errorMsg}" type="error" show-icon style="margin-bottom:20px"></el-alert>
    </c:if>

    <form method="post" action="${ctx}/product/add" enctype="multipart/form-data">
        <el-form label-position="top" size="small">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="商品名称" required>
                        <el-input name="productName" value="${product.productName}" placeholder="请输入商品名称" prefix-icon="el-icon-goods"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="商品类别">
                        <select name="categoryId" style="width:100%;height:32px;border:1px solid #DCDFE6;border-radius:4px;padding:0 10px;color:#606266;font-size:13px;">
                            <option value="">请选择类别</option>
                            <c:forEach items="${categories}" var="cat">
                                <option value="${cat.categoryId}">${cat.categoryName}</option>
                            </c:forEach>
                        </select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="价格" required>
                        <el-input name="price" type="number" step="0.01" value="${product.price}" placeholder="0.00" prefix-icon="el-icon-money"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="库存">
                        <el-input name="stock" type="number" value="${product.stock != null ? product.stock : 0}" placeholder="0"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="安全库存">
                        <el-input name="safetyStock" type="number" value="${product.safetyStock != null ? product.safetyStock : 10}" placeholder="10"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="商品图片">
                <input type="file" name="imageFile" accept="image/*" style="font-size:13px;color:#606266">
            </el-form-item>
            <el-form-item label="商品描述">
                <el-input name="productDesc" type="textarea" :rows="3" placeholder="请输入商品描述">${product.productDesc}</el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit" icon="el-icon-check">保存</el-button>
                <el-button icon="el-icon-back" @click="location.href='${ctx}/product/list'">返回</el-button>
            </el-form-item>
        </el-form>
    </form>
</el-card>

<jsp:include page="../common/footer.jsp"/>
