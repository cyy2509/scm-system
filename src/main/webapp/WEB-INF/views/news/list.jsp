<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<jsp:include page="../common/header.jsp">
    <jsp:param name="title" value="新闻公告"/>
</jsp:include>
<jsp:include page="../common/menu.jsp"/>

<el-card class="data-card" shadow="never">
    <div slot="header">
        <span class="card-title">新闻公告</span>
        <c:if test="${sessionScope.loginUser.roleName == '经理' || sessionScope.loginUser.roleName == '人事部员工'}">
            <el-button type="primary" size="small" icon="el-icon-plus" onclick="location.href='${ctx}/news/add'">发布新闻</el-button>
        </c:if>
    </div>

    <form method="get" class="filter-bar">
        <input type="text" placeholder="搜索标题/内容" name="keyword" value="${param.keyword}" style="width:260px">
        <el-button type="primary" size="small" native-type="submit" icon="el-icon-search">搜索</el-button>
        <el-button size="small" icon="el-icon-refresh" onclick="location.href='${ctx}/news/list'">重置</el-button>
    </form>

    <el-table :data="tableData" size="small" style="width:100%" stripe>
        <el-table-column prop="id" label="ID" width="60" align="center"></el-table-column>
        <el-table-column label="标题" min-width="280">
            <template slot-scope="scope">
                <a :href="'${ctx}/news/detail/' + scope.row.id" style="color:#409EFF;text-decoration:none">{{ scope.row.title }}</a>
            </template>
        </el-table-column>
        <el-table-column prop="author" label="作者" width="120" align="center"></el-table-column>
        <el-table-column prop="createTime" label="发布时间" width="170"></el-table-column>
        <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
                <el-button size="mini" type="text" icon="el-icon-view" @click="goDetail(scope.row.id)">查看</el-button>
                <c:if test="${sessionScope.loginUser.roleName == '经理' || sessionScope.loginUser.roleName == '人事部员工'}">
                    <el-button size="mini" type="text" icon="el-icon-edit" @click="goEdit(scope.row.id)">编辑</el-button>
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
            <c:forEach items="${page.list}" var="news" varStatus="st">
            {
                id: ${news.newsId},
                title: '${news.title}',
                author: '${news.author}',
                createTime: '<fmt:formatDate value="${news.createTime}" pattern="yyyy-MM-dd HH:mm"/>'
            }${!st.last ? ',' : ''}
            </c:forEach>
        ]);
        app.$set(app, 'goDetail', function(id) { location.href = '${ctx}/news/detail/' + id; });
        app.$set(app, 'goEdit', function(id) { location.href = '${ctx}/news/edit/' + id; });
        app.$set(app, 'doDelete', function(id) {
            app.$confirm('确定删除此新闻？', '提示', { type: 'warning' }).then(function() {
                location.href = '${ctx}/news/delete/' + id;
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
