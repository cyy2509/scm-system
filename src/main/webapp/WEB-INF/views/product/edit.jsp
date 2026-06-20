<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<jsp:include page="../common/header.jsp">
    <jsp:param name="title" value="编辑商品"/>
</jsp:include>
<jsp:include page="../common/menu.jsp"/>

<el-card class="form-card" shadow="never">
    <div slot="header"><h3>编辑商品</h3></div>

    <c:if test="${not empty errorMsg}">
        <el-alert title="${errorMsg}" type="error" show-icon style="margin-bottom:20px"></el-alert>
    </c:if>

    <form method="post" action="${ctx}/product/edit" enctype="multipart/form-data">
        <input type="hidden" name="productId" value="${product.productId}">
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
                            <c:forEach items="${categories}" var="cat">
                                <option value="${cat.categoryId}" ${product.categoryId == cat.categoryId ? 'selected' : ''}>${cat.categoryName}</option>
                            </c:forEach>
                        </select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="价格" required>
                        <el-input name="price" type="number" step="0.01" value="${product.price}" prefix-icon="el-icon-money"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="库存">
                        <el-input name="stock" type="number" value="${product.stock}"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="安全库存">
                        <el-input name="safetyStock" type="number" value="${product.safetyStock}"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="商品图片">
                <c:if test="${not empty product.imageUrl}">
                    <div style="margin-bottom:10px">
                        <img src="${ctx}${product.imageUrl}" style="width:80px;height:80px;object-fit:cover;border-radius:8px;border:1px solid #ebeef5">
                        <span style="font-size:12px;color:#909399;margin-left:10px">当前图片</span>
                    </div>
                </c:if>
                <input type="file" name="imageFile" accept="image/*" style="font-size:13px;color:#606266">
                <div style="font-size:12px;color:#909399;margin-top:4px">留空表示不修改图片</div>
            </el-form-item>
            <el-form-item label="商品描述">
                <el-input name="productDesc" type="textarea" :rows="3">${product.productDesc}</el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit" icon="el-icon-check">保存</el-button>
                <el-button icon="el-icon-back" @click="location.href='${ctx}/product/list'">返回</el-button>
            </el-form-item>
        </el-form>
    </form>
</el-card>

<jsp:include page="../common/footer.jsp"/>
