<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<jsp:include page="../common/header.jsp">
    <jsp:param name="title" value="数据大屏"/>
</jsp:include>
<jsp:include page="../common/menu.jsp"/>

<!-- 统计卡片 -->
<el-row :gutter="20" style="margin-bottom: 24px;">
    <el-col :span="6">
        <el-card class="stat-card" shadow="hover">
            <div class="stat-icon blue"><i class="fas fa-chart-line"></i></div>
            <div class="stat-label">今日销售额</div>
            <div class="stat-value">&yen;<fmt:formatNumber value="${data.todaySales}" pattern="#,##0.00"/></div>
        </el-card>
    </el-col>
    <el-col :span="6">
        <el-card class="stat-card" shadow="hover">
            <div class="stat-icon green"><i class="fas fa-shopping-bag"></i></div>
            <div class="stat-label">本月采购额</div>
            <div class="stat-value">&yen;<fmt:formatNumber value="${data.monthlyPurchase}" pattern="#,##0.00"/></div>
        </el-card>
    </el-col>
    <el-col :span="6">
        <el-card class="stat-card" shadow="hover">
            <div class="stat-icon red"><i class="fas fa-exclamation-triangle"></i></div>
            <div class="stat-label">库存预警数</div>
            <div class="stat-value">${data.lowStockCount} <span style="font-size:14px;color:#909399;font-weight:400">件</span></div>
        </el-card>
    </el-col>
    <el-col :span="6">
        <el-card class="stat-card" shadow="hover">
            <div class="stat-icon purple"><i class="fas fa-handshake"></i></div>
            <div class="stat-label">新增供应商</div>
            <div class="stat-value">${data.newSupplierCount} <span style="font-size:14px;color:#909399;font-weight:400">家</span></div>
        </el-card>
    </el-col>
</el-row>

<!-- 图表区域 -->
<el-row :gutter="20" style="margin-bottom: 0;">
    <el-col :span="16">
        <el-card class="chart-card" shadow="never">
            <div slot="header">
                <span>销售趋势</span>
                <el-radio-group size="mini" style="float:right" v-model="trendDays" @change="loadTrend">
                    <el-radio-button :label="7">近7天</el-radio-button>
                    <el-radio-button :label="30">近30天</el-radio-button>
                </el-radio-group>
            </div>
            <div id="salesChart" style="height: 320px;"></div>
        </el-card>
    </el-col>
    <el-col :span="8">
        <el-card class="chart-card" shadow="never">
            <div slot="header">商品类别销售占比</div>
            <div id="categoryChart" style="height: 320px;"></div>
        </el-card>
    </el-col>
</el-row>

<el-row :gutter="20">
    <el-col :span="12">
        <el-card class="chart-card" shadow="never">
            <div slot="header">供应商供货 TOP5</div>
            <div id="supplierChart" style="height: 300px;"></div>
        </el-card>
    </el-col>
    <el-col :span="12">
        <el-card class="chart-card" shadow="never">
            <div slot="header">
                <span style="color:#F56C6C"><i class="fas fa-exclamation-triangle" style="margin-right:6px"></i>库存预警商品</span>
            </div>
            <el-table :data="lowStockData" size="small" style="width:100%"
                      :row-class-name="function(){return 'warning-row'}" stripe>
                <el-table-column prop="name" label="商品名称"></el-table-column>
                <el-table-column prop="stock" label="当前库存" width="90" align="center"></el-table-column>
                <el-table-column prop="safety" label="安全库存" width="90" align="center"></el-table-column>
                <el-table-column label="差额" width="90" align="center">
                    <template slot-scope="scope">
                        <el-tag size="mini" type="danger">{{ scope.row.stock - scope.row.safety }}</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </el-col>
</el-row>

<!-- 最近订单 -->
<el-card class="chart-card" shadow="never" style="margin-top:0">
    <div slot="header">最近销售订单</div>
    <el-table :data="recentOrderData" size="small" style="width:100%" stripe>
        <el-table-column prop="orderNo" label="订单号"></el-table-column>
        <el-table-column label="金额" width="150">
            <template slot-scope="scope">
                <span style="color:#F56C6C;font-weight:600">&yen;{{ scope.row.amount }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="user" label="创建人" width="120"></el-table-column>
        <el-table-column prop="time" label="创建时间" width="180"></el-table-column>
    </el-table>
</el-card>

<script src="${ctx}/static/js/echarts.min.js"></script>
<script>
    // 销售趋势图
    var salesChart = echarts.init(document.getElementById('salesChart'));
    var salesData = ${data.salesTrend != null ? data.salesTrend : '[]'};
    salesChart.setOption({
        tooltip: { trigger: 'axis', backgroundColor: 'rgba(255,255,255,0.96)', borderColor: '#e4e7ed', borderWidth: 1,
                   textStyle: { color: '#606266' } },
        grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
        xAxis: { type: 'category', boundaryGap: false,
                 data: salesData.map(function(item) { return item.date || item.DATE; }),
                 axisLine: { lineStyle: { color: '#dcdfe6' } }, axisLabel: { color: '#909399' } },
        yAxis: { type: 'value', axisLine: { show: false }, axisTick: { show: false },
                 splitLine: { lineStyle: { color: '#f0f2f5' } }, axisLabel: { color: '#909399' } },
        series: [{
            data: salesData.map(function(item) { return item.amount || item.AMOUNT; }),
            type: 'line', smooth: true,
            areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(64,158,255,0.25)' },
                { offset: 1, color: 'rgba(64,158,255,0.02)' }
            ]) },
            lineStyle: { color: '#409EFF', width: 2.5 },
            itemStyle: { color: '#409EFF' }
        }]
    ;

    // 商品类别销售占比
    var categoryChart = echarts.init(document.getElementById('categoryChart'));
    var categoryData = ${data.categorySales != null ? data.categorySales : '[]'};
    categoryChart.setOption({
        tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
        legend: { bottom: '0%', left: 'center', textStyle: { color: '#909399', fontSize: 12 } },
        color: ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399'],
        series: [{
            type: 'pie', radius: ['40%', '65%'], center: ['50%', '45%'],
            avoidLabelOverlap: true,
            label: { show: false },
            emphasis: { label: { show: true, fontSize: 14, fontWeight: 'bold' } },
            data: categoryData.map(function(item) {
                return { name: item.name || item.NAME, value: item.value || item.VALUE };
            })
        }]
    ;

    // 供应商 TOP5
    var supplierChart = echarts.init(document.getElementById('supplierChart'));
    var supplierData = ${data.supplierTop5 != null ? data.supplierTop5 : '[]'};
    supplierChart.setOption({
        tooltip: { trigger: 'axis', backgroundColor: 'rgba(255,255,255,0.96)', borderColor: '#e4e7ed', borderWidth: 1,
                   textStyle: { color: '#606266' } },
        grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
        xAxis: { type: 'category',
                 data: supplierData.map(function(item) { return item.name || item.NAME; }),
                 axisLabel: { rotate: 20, color: '#909399', fontSize: 11 },
                 axisLine: { lineStyle: { color: '#dcdfe6' } } },
        yAxis: { type: 'value', axisLine: { show: false }, axisTick: { show: false },
                 splitLine: { lineStyle: { color: '#f0f2f5' } }, axisLabel: { color: '#909399' } },
        series: [{
            data: supplierData.map(function(item) { return item.value || item.VALUE; }),
            type: 'bar', barWidth: '45%',
            itemStyle: {
                borderRadius: [6, 6, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#409EFF' },
                    { offset: 1, color: '#a0cfff' }
                ])
            }
        }]
    ;

    window.addEventListener('resize', function() {
        salesChart.resize();
        categoryChart.resize();
        supplierChart.resize();
    ;
</script>

<jsp:include page="../common/footer.jsp"/>

<script>
// 仪表盘页面额外的Vue数据
(function() {
    var app = document.getElementById('app').__vue__;
    if (app) {
        // 库存预警数据
        app.$set(app, 'lowStockData', [
            <c:forEach items="${data.lowStockProducts}" var="product" varStatus="st">
            { name: '${product.productName}', stock: ${product.stock}, safety: ${product.safetyStock} }${!st.last ? ',' : ''}
            </c:forEach>
        ]);
        // 最近订单数据
        app.$set(app, 'recentOrderData', [
            <c:forEach items="${data.recentOrders}" var="order" varStatus="st">
            { orderNo: '${order.orderNo}', amount: '<fmt:formatNumber value="${order.totalAmount}" pattern="#,##0.00"/>', user: '${order.createUserName}', time: '<fmt:formatDate value="${order.createTime}" pattern="yyyy-MM-dd HH:mm"/>' }${!st.last ? ',' : ''}
            </c:forEach>
        ]);
        app.$set(app, 'trendDays', 7);
        app.loadTrend = function(days) {
            $.get('${ctx}/dashboard/trend', { days: days }, function(data) {
                var parsed = typeof data === 'string' ? JSON.parse(data) : data;
                salesChart.setOption({
                    xAxis: { data: parsed.map(function(item) { return item.date || item.DATE; }) },
                    series: [{ data: parsed.map(function(item) { return item.amount || item.AMOUNT; }) }]
                ;
            ;
        ;
    }
})();
</script>
