<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<jsp:include page="../common/header.jsp">
    <jsp:param name="title" value="角色管理"/>
</jsp:include>
<jsp:include page="../common/menu.jsp"/>

<el-card class="data-card" shadow="never">
    <div slot="header">
        <span class="card-title">角色管理</span>
        <el-button type="primary" size="small" icon="el-icon-plus" onclick="location.href='${ctx}/role/add'">添加角色</el-button>
    </div>

    <form method="get" class="filter-bar">
        <input type="text" placeholder="角色名称" name="keyword" value="${param.keyword}">
        <el-button type="primary" size="small" native-type="submit" icon="el-icon-search">搜索</el-button>
        <el-button size="small" icon="el-icon-refresh" onclick="location.href='${ctx}/role/list'">重置</el-button>
    </form>

    <el-table :data="tableData" size="small" style="width:100%" stripe>
        <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
        <el-table-column prop="name" label="角色名称" width="200"></el-table-column>
        <el-table-column prop="desc" label="角色描述" min-width="300"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
                <el-button size="mini" type="text" icon="el-icon-edit" @click="goEdit(scope.row.id)">编辑</el-button>
                <el-button v-if="scope.row.id !== 1" size="mini" type="text" icon="el-icon-delete" style="color:#F56C6C" @click="doDelete(scope.row.id)">删除</el-button>
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
            <c:forEach items="${page.list}" var="role" varStatus="st">
            { id: ${role.roleId}, name: '${role.roleName}', desc: '${role.roleDesc}' }${!st.last ? ',' : ''}
            </c:forEach>
        ]);
        app.$set(app, 'goEdit', function(id) { location.href = '${ctx}/role/edit/' + id; });
        app.$set(app, 'doDelete', function(id) {
            app.$confirm('确定删除该角色？', '提示', { type: 'warning' }).then(function() {
                location.href = '${ctx}/role/delete/' + id;
            }).catch(function(){});
        });
        app.$set(app, 'handlePage', function(val) {
            var params = new URLSearchParams(location.search);
            params.set('pageNo', val);
            if ('${param.keyword}') params.set('keyword', '${param.keyword}');
            location.search = params.toString();
        });
    }
})();
</script>
