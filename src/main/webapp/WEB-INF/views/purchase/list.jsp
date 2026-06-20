<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<jsp:include page="../common/header.jsp">
    <jsp:param name="title" value="采购订单"/>
</jsp:include>
<jsp:include page="../common/menu.jsp"/>

<el-card class="data-card" shadow="never">
    <div slot="header">
        <span class="card-title">采购订单管理</span>
        <c:if test="${sessionScope.loginUser.roleName == '经理' || sessionScope.loginUser.roleName == '采购部员工'}">
            <el-button type="primary" size="small" icon="el-icon-plus" onclick="location.href='${ctx}/purchase/add'">创建采购订单</el-button>
        </c:if>
    </div>

    <form method="get" class="filter-bar">
        <input type="text" placeholder="订单号" name="orderNo" value="${param.orderNo}">
        <select name="supplierId">
            <option value="">所有供应商</option>
            <c:forEach items="${suppliers}" var="s">
                <option value="${s.supplierId}" ${param.supplierId == s.supplierId ? 'selected' : ''}>${s.supplierName}</option>
            </c:forEach>
        </select>
        <select name="status">
            <option value="">所有状态</option>
            <option value="0" ${param.status == '0' ? 'selected' : ''}>待审核</option>
            <option value="1" ${param.status == '1' ? 'selected' : ''}>已通过</option>
            <option value="2" ${param.status == '2' ? 'selected' : ''}>已驳回</option>
        </select>
        <el-button type="primary" size="small" native-type="submit" icon="el-icon-search">搜索</el-button>
        <el-button size="small" icon="el-icon-refresh" onclick="location.href='${ctx}/purchase/list'">重置</el-button>
    </form>

    <el-table :data="tableData" size="small" style="width:100%" stripe>
        <el-table-column prop="orderNo" label="订单号" min-width="160"></el-table-column>
        <el-table-column prop="supplier" label="供应商" width="160"></el-table-column>
        <el-table-column label="总金额" width="130" align="right">
            <template slot-scope="scope">
                <span style="color:#F56C6C;font-weight:600">&yen;{{ scope.row.amount }}</span>
            </template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center">
            <template slot-scope="scope">
                <el-tag size="mini" :type="scope.row.statusType">{{ scope.row.statusText }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="createUser" label="创建人" width="100" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="160"></el-table-column>
        <el-table-column label="操作" width="240" align="center">
            <template slot-scope="scope">
                <el-button size="mini" type="text" icon="el-icon-view" @click="goDetail(scope.row.id)">详情</el-button>
                <template v-if="scope.row.canAudit">
                    <el-button size="mini" type="text" icon="el-icon-check" style="color:#67C23A" @click="doAudit(scope.row.id, 1)">通过</el-button>
                    <el-button size="mini" type="text" icon="el-icon-close" style="color:#E6A23C" @click="doAudit(scope.row.id, 2)">驳回</el-button>
                </template>
                <el-button v-if="scope.row.canDelete" size="mini" type="text" icon="el-icon-delete" style="color:#F56C6C" @click="doDelete(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <div class="pagination-wrap">
        <el-pagination
            background
            layout="total, prev, pager, next"
            :total="${page.totalCount}"
            :page-size="${page.pageSize}"
            :current-page="${page.pageNo}"
            @current-change="handlePage">
        </el-pagination>
    </div>
</el-card>

<jsp:include page="../common/footer.jsp"/>

<script>
(function() {
    var app = document.getElementById('app').__vue__;
    if (app) {
        app.$set(app, 'tableData', [
            <c:forEach items="${page.list}" var="order" varStatus="st">
            {
                id: ${order.orderId},
                orderNo: '${order.orderNo}',
                supplier: '${order.supplierName}',
                amount: '<fmt:formatNumber value="${order.totalAmount}" pattern="#,##0.00"/>',
                statusText: '<c:choose><c:when test="${order.orderStatus == 0}">待审核</c:when><c:when test="${order.orderStatus == 1}">已通过</c:when><c:when test="${order.orderStatus == 2}">已驳回</c:when></c:choose>',
                statusType: '<c:choose><c:when test="${order.orderStatus == 0}">warning</c:when><c:when test="${order.orderStatus == 1}">success</c:when><c:when test="${order.orderStatus == 2}">danger</c:when></c:choose>',
                createUser: '${order.createUserName}',
                createTime: '<fmt:formatDate value="${order.createTime}" pattern="yyyy-MM-dd HH:mm"/>',
                canAudit: ${sessionScope.loginUser.roleName == '经理' && order.orderStatus == 0},
                canDelete: ${(order.orderStatus == 0 || order.orderStatus == 2) && sessionScope.loginUser.roleName == '采购部员工'}
            }${!st.last ? ',' : ''}
            </c:forEach>
        ]);
        app.$set(app, 'goDetail', function(id) { location.href = '${ctx}/purchase/detail/' + id; });
        app.$set(app, 'doAudit', function(id, status) {
            var msg = status === 1 ? '确定审核通过？' : '确定驳回？';
            app.$confirm(msg, '提示', { type: 'warning' }).then(function() {
                location.href = '${ctx}/purchase/audit/' + id + '/' + status;
            }).catch(function(){});
        });
        app.$set(app, 'doDelete', function(id) {
            app.$confirm('确定删除此订单？', '提示', { type: 'warning' }).then(function() {
                location.href = '${ctx}/purchase/delete/' + id;
            }).catch(function(){});
        });
        app.$set(app, 'handlePage', function(val) {
            var params = new URLSearchParams(location.search);
            params.set('pageNo', val);
            location.search = params.toString();
        });
    }
})();
</script>
