<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<jsp:include page="../common/header.jsp">
    <jsp:param name="title" value="销售订单详情"/>
</jsp:include>
<jsp:include page="../common/menu.jsp"/>

<el-card class="detail-card" shadow="never">
    <div slot="header"><h3>销售订单详情</h3></div>

    <el-descriptions :column="2" border size="medium" style="margin-bottom:24px">
        <el-descriptions-item label="订单号">${order.orderNo}</el-descriptions-item>
        <el-descriptions-item label="创建人">${order.createUserName}</el-descriptions-item>
        <el-descriptions-item label="创建时间"><fmt:formatDate value="${order.createTime}" pattern="yyyy-MM-dd HH:mm:ss"/></el-descriptions-item>
        <el-descriptions-item label="总金额">
            <span style="color:#F56C6C;font-size:18px;font-weight:700">&yen;<fmt:formatNumber value="${order.totalAmount}" pattern="#,##0.00"/></span>
        </el-descriptions-item>
    </el-descriptions>

    <h4 style="font-size:15px;color:#303133;margin-bottom:12px"><i class="el-icon-document" style="margin-right:6px"></i>商品明细</h4>
    <el-table :data="itemData" size="small" style="width:100%" border>
        <el-table-column prop="productName" label="商品名称" min-width="200"></el-table-column>
        <el-table-column label="单价" width="140" align="right">
            <template slot-scope="scope">&yen;{{ scope.row.price }}</template>
        </el-table-column>
        <el-table-column prop="quantity" label="数量" width="100" align="center"></el-table-column>
        <el-table-column label="金额" width="140" align="right">
            <template slot-scope="scope"><span style="color:#F56C6C;font-weight:600">&yen;{{ scope.row.amount }}</span></template>
        </el-table-column>
    </el-table>

    <div class="action-buttons">
        <el-button icon="el-icon-back" @click="location.href='${ctx}/sales/list'">返回列表</el-button>
    </div>
</el-card>

<jsp:include page="../common/footer.jsp"/>

<script>
(function() {
    var app = document.getElementById('app').__vue__;
    if (app) {
        app.$set(app, 'itemData', [
            <c:forEach items="${order.orderItems}" var="item" varStatus="st">
            {
                productName: '${item.productName}',
                price: '<fmt:formatNumber value="${item.price}" pattern="#,##0.00"/>',
                quantity: ${item.quantity},
                amount: '<fmt:formatNumber value="${item.amount}" pattern="#,##0.00"/>'
            }${!st.last ? ',' : ''}
            </c:forEach>
        ]);
    }
})();
</script>
