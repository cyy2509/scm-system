<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<jsp:include page="../common/header.jsp">
    <jsp:param name="title" value="销售订单"/>
</jsp:include>
<jsp:include page="../common/menu.jsp"/>

<el-card class="data-card" shadow="never">
    <div slot="header">
        <span class="card-title">销售订单管理</span>
        <c:if test="${sessionScope.loginUser.roleName == '经理' || sessionScope.loginUser.roleName == '销售部员工'}">
            <el-button type="primary" size="small" icon="el-icon-plus" onclick="location.href='${ctx}/sales/add'">创建销售订单</el-button>
        </c:if>
    </div>

    <form method="get" class="filter-bar">
        <input type="text" placeholder="订单号" name="orderNo" value="${param.orderNo}">
        <input type="date" name="startDate" value="${param.startDate}" title="开始日期">
        <input type="date" name="endDate" value="${param.endDate}" title="结束日期">
        <el-button type="primary" size="small" native-type="submit" icon="el-icon-search">搜索</el-button>
        <el-button size="small" icon="el-icon-refresh" onclick="location.href='${ctx}/sales/list'">重置</el-button>
    </form>

    <el-table :data="tableData" size="small" style="width:100%" stripe>
        <el-table-column prop="orderNo" label="订单号" min-width="180"></el-table-column>
        <el-table-column label="总金额" width="140" align="right">
            <template slot-scope="scope">
                <span style="color:#F56C6C;font-weight:600">&yen;{{ scope.row.amount }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="createUser" label="创建人" width="120" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="170"></el-table-column>
        <el-table-column label="操作" width="160" align="center">
            <template slot-scope="scope">
                <el-button size="mini" type="text" icon="el-icon-view" @click="goDetail(scope.row.id)">详情</el-button>
                <c:if test="${sessionScope.loginUser.roleName == '经理'}">
                    <el-button size="mini" type="text" icon="el-icon-delete" style="color:#F56C6C" @click="doDelete(scope.row.id)">删除</el-button>
                </c:if>
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
                amount: '<fmt:formatNumber value="${order.totalAmount}" pattern="#,##0.00"/>',
                createUser: '${order.createUserName}',
                createTime: '<fmt:formatDate value="${order.createTime}" pattern="yyyy-MM-dd HH:mm"/>'
            }${!st.last ? ',' : ''}
            </c:forEach>
        ]);
        app.$set(app, 'goDetail', function(id) { location.href = '${ctx}/sales/detail/' + id; });
        app.$set(app, 'doDelete', function(id) {
            app.$confirm('确定删除该销售订单？删除后会恢复库存', '提示', { type: 'warning' }).then(function() {
                location.href = '${ctx}/sales/delete/' + id;
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
