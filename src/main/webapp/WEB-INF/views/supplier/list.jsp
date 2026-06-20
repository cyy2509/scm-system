<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<jsp:include page="../common/header.jsp">
    <jsp:param name="title" value="供应商管理"/>
</jsp:include>
<jsp:include page="../common/menu.jsp"/>

<el-card class="data-card" shadow="never">
    <div slot="header">
        <span class="card-title">供应商管理</span>
        <el-button type="primary" size="small" icon="el-icon-plus" onclick="location.href='${ctx}/supplier/add'">添加供应商</el-button>
    </div>

    <form method="get" class="filter-bar">
        <input type="text" placeholder="供应商名称" name="keyword" value="${param.keyword}">
        <input type="text" placeholder="联系人" name="contact" value="${param.contact}">
        <el-button type="primary" size="small" native-type="submit" icon="el-icon-search">搜索</el-button>
        <el-button size="small" icon="el-icon-refresh" onclick="location.href='${ctx}/supplier/list'">重置</el-button>
    </form>

    <el-table :data="tableData" size="small" style="width:100%" stripe>
        <el-table-column prop="id" label="ID" width="60" align="center"></el-table-column>
        <el-table-column prop="name" label="供应商名称" min-width="160"></el-table-column>
        <el-table-column prop="contact" label="联系人" width="100"></el-table-column>
        <el-table-column prop="phone" label="电话" width="130"></el-table-column>
        <el-table-column prop="address" label="地址" min-width="180"></el-table-column>
        <el-table-column prop="remark" label="备注" width="150"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="120"></el-table-column>
        <el-table-column label="操作" width="160" align="center">
            <template slot-scope="scope">
                <el-button size="mini" type="text" icon="el-icon-edit" @click="goEdit(scope.row.id)">编辑</el-button>
                <el-button size="mini" type="text" icon="el-icon-delete" style="color:#F56C6C" @click="doDelete(scope.row.id)">删除</el-button>
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
            <c:forEach items="${page.list}" var="s" varStatus="st">
            {
                id: ${s.supplierId},
                name: '${s.supplierName}',
                contact: '${s.contact}',
                phone: '${s.phone}',
                address: '${s.address}',
                remark: '${s.remark}',
                createTime: '<fmt:formatDate value="${s.createTime}" pattern="yyyy-MM-dd"/>'
            }${!st.last ? ',' : ''}
            </c:forEach>
        ]);
        app.$set(app, 'goEdit', function(id) { location.href = '${ctx}/supplier/edit/' + id; });
        app.$set(app, 'doDelete', function(id) {
            app.$confirm('确定删除此供应商？', '提示', { type: 'warning' }).then(function() {
                location.href = '${ctx}/supplier/delete/' + id;
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
