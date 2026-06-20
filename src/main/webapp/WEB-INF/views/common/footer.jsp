<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

        </el-main>
    </el-container>
</el-container>
</div>

<!-- jQuery (部分页面AJAX需要) -->
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
<!-- Vue 2 -->
<script src="https://cdn.jsdelivr.net/npm/vue@2.7.16/dist/vue.min.js"></script>
<!-- Element UI -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>

<script>
new Vue({
    el: '#app',
    data: function() {
        var path = window.location.pathname;
        var ctx = '${ctx}';
        var active = '/dashboard';
        if (path.indexOf(ctx + '/user') === 0) active = '/user';
        else if (path.indexOf(ctx + '/role') === 0) active = '/role';
        else if (path.indexOf(ctx + '/supplier') === 0) active = '/supplier';
        else if (path.indexOf(ctx + '/product') === 0) active = '/product';
        else if (path.indexOf(ctx + '/purchase') === 0) active = '/purchase';
        else if (path.indexOf(ctx + '/sales') === 0) active = '/sales';
        else if (path.indexOf(ctx + '/news') === 0) active = '/news';
        else if (path.indexOf(ctx + '/log') === 0) active = '/log';
        return {
            activeMenu: active,
            // 仪表盘默认数据
            trendDays: 7,
            lowStockData: [],
            recentOrderData: [],
            // 列表页默认数据
            tableData: [],
            // 采购/销售添加页默认数据
            items: [],
            products: [],
            totalAmount: '0.00'
        };
    },
    methods: {
        handleCommand: function(command) {
            var ctx = '${ctx}';
            if (command === 'logout') {
                window.location.href = ctx + '/logout';
            } else if (command === 'password') {
                window.location.href = ctx + '/user/password';
            }
        },
        loadTrend: function() {}
    }
});
</script>
</body>
</html>
