<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<jsp:include page="../common/header.jsp">
    <jsp:param name="title" value="商品详情"/>
</jsp:include>
<jsp:include page="../common/menu.jsp"/>

<el-card class="detail-card" shadow="never">
    <div slot="header"><h3>商品详情</h3></div>

    <el-row :gutter="30">
        <el-col :span="8">
            <div style="text-align:center">
                <c:choose>
                    <c:when test="${not empty product.imageUrl}">
                        <img src="${ctx}${product.imageUrl}" style="width:100%;max-height:260px;object-fit:cover;border-radius:12px;border:1px solid #ebeef5" alt="商品图片">
                    </c:when>
                    <c:otherwise>
                        <div style="height:200px;background:#f5f7fa;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#c0c4cc;font-size:14px">
                            <i class="el-icon-picture-outline" style="font-size:48px"></i>
                        </div>
                    </c:otherwise>
                </c:choose>
            </div>
        </el-col>
        <el-col :span="16">
            <el-descriptions title="" :column="1" border size="medium">
                <el-descriptions-item label="商品名称">${product.productName}</el-descriptions-item>
                <el-descriptions-item label="所属分类">${product.categoryName}</el-descriptions-item>
                <el-descriptions-item label="价格">
                    <span style="color:#F56C6C;font-size:20px;font-weight:700">&yen;<fmt:formatNumber value="${product.price}" pattern="#,##0.00"/></span>
                </el-descriptions-item>
                <el-descriptions-item label="库存数量">
                    <c:choose>
                        <c:when test="${product.stock < product.safetyStock}">
                            <el-tag type="danger" size="small">${product.stock}</el-tag>
                            <span style="color:#F56C6C;margin-left:8px;font-size:12px">库存不足！安全库存：${product.safetyStock}</span>
                        </c:when>
                        <c:otherwise>
                            <el-tag type="success" size="small">${product.stock}</el-tag>
                        </c:otherwise>
                    </c:choose>
                </el-descriptions-item>
                <el-descriptions-item label="安全库存">${product.safetyStock}</el-descriptions-item>
                <el-descriptions-item label="商品描述">${not empty product.productDesc ? product.productDesc : '暂无描述'}</el-descriptions-item>
            </el-descriptions>
        </el-col>
    </el-row>

    <div class="action-buttons">
        <el-button icon="el-icon-back" @click="history.back()">返回</el-button>
        <el-button type="warning" icon="el-icon-edit" @click="location.href='${ctx}/product/edit/${product.productId}'">编辑</el-button>
    </div>
</el-card>

<jsp:include page="../common/footer.jsp"/>
