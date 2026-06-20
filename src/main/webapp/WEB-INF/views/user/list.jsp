<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<jsp:include page="../common/header.jsp">
    <jsp:param name="title" value="用户管理"/>
</jsp:include>
<jsp:include page="../common/menu.jsp"/>

<el-card class="data-card" shadow="never">
    <div slot="header">
        <span class="card-title">用户管理</span>
        <el-button type="primary" size="small" icon="el-icon-plus" onclick="location.href='${ctx}/user/add'">添加用户</el-button>
    </div>

    <form method="get" class="filter-bar">
        <input type="text" placeholder="用户名/姓名" name="keyword" value="${page.keyword}">
        <select name="roleId">
            <option value="">所有角色</option>
            <c:forEach items="${roles}" var="role">
                <option value="${role.roleId}" ${param.roleId == role.roleId ? 'selected' : ''}>${role.roleName}</option>
            </c:forEach>
        </select>
        <el-button type="primary" size="small" native-type="submit" icon="el-icon-search">搜索</el-button>
        <el-button size="small" icon="el-icon-refresh" onclick="location.href='${ctx}/user/list'">重置</el-button>
    </form>

    <el-table :data="tableData" size="small" style="width:100%" stripe>
        <el-table-column prop="id" label="ID" width="60" align="center"></el-table-column>
        <el-table-column prop="username" label="用户名" width="120"></el-table-column>
        <el-table-column prop="realName" label="姓名" width="110"></el-table-column>
        <el-table-column prop="roleName" label="角色" width="120">
            <template slot-scope="scope">
                <el-tag size="mini" type="info">{{ scope.row.roleName }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="phone" label="电话" width="130"></el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="180"></el-table-column>
        <el-table-column label="状态" width="80" align="center">
            <template slot-scope="scope">
                <el-tag size="mini" :type="scope.row.status === 1 ? 'success' : 'danger'">{{ scope.row.status === 1 ? '启用' : '禁用' }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="160"></el-table-column>
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
            <c:forEach items="${page.list}" var="user" varStatus="st">
            {
                id: ${user.userId},
                username: '${user.username}',
                realName: '${user.realName}',
                roleName: '${user.roleName}',
                phone: '${user.phone}',
                email: '${user.email}',
                status: ${user.status},
                createTime: '<fmt:formatDate value="${user.createTime}" pattern="yyyy-MM-dd HH:mm"/>'
            }${!st.last ? ',' : ''}
            </c:forEach>
        ]);
        app.$set(app, 'goEdit', function(id) { location.href = '${ctx}/user/edit/' + id; });
        app.$set(app, 'doDelete', function(id) {
            app.$confirm('确定删除此用户？', '提示', { type: 'warning' }).then(function() {
                location.href = '${ctx}/user/delete/' + id;
            }).catch(function(){});
        });
        app.$set(app, 'handlePage', function(val) {
            var params = new URLSearchParams(location.search);
            params.set('pageNo', val);
            if ('${page.keyword}') params.set('keyword', '${page.keyword}');
            location.search = params.toString();
        });
    }
})();
</script>
