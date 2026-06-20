<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<jsp:include page="../common/header.jsp">
    <jsp:param name="title" value="操作日志"/>
</jsp:include>
<jsp:include page="../common/menu.jsp"/>

<el-card class="data-card" shadow="never">
    <div slot="header">
        <span class="card-title">操作日志</span>
    </div>

    <form method="get" class="filter-bar">
        <input type="text" placeholder="用户名/操作类型" name="keyword" value="${param.keyword}" style="width:220px">
        <select name="module">
            <option value="">所有模块</option>
            <option value="User" ${param.module == "User" ? "selected" : ""}>用户管理</option>
            <option value="Product" ${param.module == "Product" ? "selected" : ""}>商品管理</option>
            <option value="Supplier" ${param.module == "Supplier" ? "selected" : ""}>供应商管理</option>
            <option value="PurchaseOrder" ${param.module == "PurchaseOrder" ? "selected" : ""}>采购订单</option>
            <option value="SalesOrder" ${param.module == "SalesOrder" ? "selected" : ""}>销售订单</option>
            <option value="News" ${param.module == "News" ? "selected" : ""}>新闻公告</option>
        </select>
        <el-button type="primary" size="small" native-type="submit" icon="el-icon-search">搜索</el-button>
        <el-button size="small" icon="el-icon-refresh" onclick="location.href='${ctx}/log/list'">重置</el-button>
    </form>

    <el-table :data="tableData" size="small" style="width:100%" stripe>
        <el-table-column prop="id" label="ID" width="60" align="center"></el-table-column>
        <el-table-column prop="username" label="用户" width="110" align="center"></el-table-column>
        <el-table-column label="操作" width="90" align="center">
            <template slot-scope="scope">
                <el-tag size="mini" :type="scope.row.opType">{{ scope.row.operation }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="module" label="模块" width="130"></el-table-column>
        <el-table-column prop="method" label="方法" min-width="160"></el-table-column>
        <el-table-column prop="ip" label="IP地址" width="130"></el-table-column>
        <el-table-column prop="createTime" label="时间" width="170"></el-table-column>
    </el-table>

    <c:if test="${empty page.list}">
        <div style="text-align:center;padding:40px;color:#c0c4cc">
            <i class="el-icon-document" style="font-size:48px;display:block;margin-bottom:12px"></i>
            暂无操作日志
        </div>
    </c:if>

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
            <c:forEach items="${page.list}" var="log" varStatus="st">
            {
                id: ${log.logId},
                username: '${log.username}',
                operation: '${log.operation}',
                opType: '<c:choose><c:when test="${log.operation == \"新增\"}">success</c:when><c:when test="${log.operation == \"修改\"}">warning</c:when><c:when test="${log.operation == \"删除\"}">danger</c:when><c:otherwise>info</c:otherwise></c:choose>',
                module: '${log.module}',
                method: '${log.method}',
                ip: '${log.ip}',
                createTime: '<fmt:formatDate value="${log.createTime}" pattern="yyyy-MM-dd HH:mm:ss"/>'
            }${!st.last ? ',' : ''}
            </c:forEach>
        ]);
        app.$set(app, 'handlePage', function(val) {
            var params = new URLSearchParams(location.search);
            params.set('pageNo', val);
            if ('${param.keyword}') params.set('keyword', '${param.keyword}');
            if ('${param.module}') params.set('module', '${param.module}');
            location.search = params.toString();
        });
    }
})();
</script>
