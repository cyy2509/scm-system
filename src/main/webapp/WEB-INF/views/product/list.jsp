<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<jsp:include page="../common/header.jsp">
    <jsp:param name="title" value="商品管理"/>
</jsp:include>
<jsp:include page="../common/menu.jsp"/>

<el-card class="data-card" shadow="never">
    <div slot="header">
        <span class="card-title">商品管理</span>
        <el-button type="primary" size="small" icon="el-icon-plus" onclick="location.href='${ctx}/product/add'">添加商品</el-button>
    </div>

    <!-- 搜索栏 -->
    <form method="get" class="filter-bar">
        <input type="text" placeholder="商品名称" name="keyword" value="${param.keyword}">
        <select name="categoryId">
            <option value="">所有类别</option>
            <c:forEach items="${categories}" var="cat">
                <option value="${cat.categoryId}" ${param.categoryId == cat.categoryId ? 'selected' : ''}>${cat.categoryName}</option>
            </c:forEach>
        </select>
        <input type="number" placeholder="最低价格" name="minPrice" value="${param.minPrice}" style="width:130px">
        <input type="number" placeholder="最高价格" name="maxPrice" value="${param.maxPrice}" style="width:130px">
        <el-button type="primary" size="small" native-type="submit" icon="el-icon-search">搜索</el-button>
        <el-button size="small" icon="el-icon-refresh" onclick="location.href='${ctx}/product/list'">重置</el-button>
    </form>

    <!-- 数据表格 -->
    <el-table :data="tableData" size="small" style="width:100%" stripe>
        <el-table-column prop="id" label="ID" width="60" align="center"></el-table-column>
        <el-table-column label="图片" width="70" align="center">
            <template slot-scope="scope">
                <el-image v-if="scope.row.image" :src="scope.row.image" style="width:40px;height:40px;border-radius:4px" fit="cover"></el-image>
                <span v-else style="color:#c0c4cc;font-size:12px">无</span>
            </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" min-width="140"></el-table-column>
        <el-table-column prop="category" label="类别" width="110"></el-table-column>
        <el-table-column label="价格" width="110" align="right">
            <template slot-scope="scope">
                <span style="color:#F56C6C;font-weight:600">&yen;{{ scope.row.price }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="stock" label="库存" width="80" align="center"></el-table-column>
        <el-table-column prop="safety" label="安全库存" width="90" align="center"></el-table-column>
        <el-table-column label="状态" width="90" align="center">
            <template slot-scope="scope">
                <el-tag size="mini" :type="scope.row.lowStock ? 'danger' : 'success'">{{ scope.row.lowStock ? '库存预警' : '正常' }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
            <template slot-scope="scope">
                <el-button size="mini" type="text" icon="el-icon-edit" @click="goEdit(scope.row.id)">编辑</el-button>
                <el-button size="mini" type="text" icon="el-icon-delete" style="color:#F56C6C" @click="doDelete(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 分页 -->
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
            <c:forEach items="${page.list}" var="p" varStatus="st">
            {
                id: ${p.productId},
                name: '${p.productName}',
                category: '${p.categoryName}',
                price: '<fmt:formatNumber value="${p.price}" pattern="#,##0.00"/>',
                stock: ${p.stock},
                safety: ${p.safetyStock},
                lowStock: ${p.stock < p.safetyStock},
                image: '${ctx}${p.imageUrl}'
            }${!st.last ? ',' : ''}
            </c:forEach>
        ]);
        app.$set(app, 'goEdit', function(id) { location.href = '${ctx}/product/edit/' + id; });
        app.$set(app, 'doDelete', function(id) {
            app.$confirm('确定删除此商品？', '提示', { type: 'warning' }).then(function() {
                location.href = '${ctx}/product/delete/' + id;
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
