/**
 * 数据大屏页面
 */
const DashboardPage = {
    template: '\
    <div>\
        <div class="stat-cards">\
            <div class="stat-card">\
                <div class="icon icon-sales">¥</div>\
                <div class="info">\
                    <div class="label">今日销售额</div>\
                    <div class="value">{{ data.todaySales || 0 }}</div>\
                </div>\
            </div>\
            <div class="stat-card">\
                <div class="icon icon-purchase">¥</div>\
                <div class="info">\
                    <div class="label">本月采购额</div>\
                    <div class="value">{{ data.monthlyPurchase || 0 }}</div>\
                </div>\
            </div>\
            <div class="stat-card">\
                <div class="icon icon-stock">!</div>\
                <div class="info">\
                    <div class="label">库存预警</div>\
                    <div class="value">{{ data.lowStockCount || 0 }}</div>\
                </div>\
            </div>\
            <div class="stat-card">\
                <div class="icon icon-supplier">+</div>\
                <div class="info">\
                    <div class="label">本月新增供应商</div>\
                    <div class="value">{{ data.newSupplierCount || 0 }}</div>\
                </div>\
            </div>\
        </div>\
        <div class="charts-row">\
            <div class="chart-box">\
                <h4>销售趋势（近7天）</h4>\
                <div ref="trendChart" class="chart-container"></div>\
            </div>\
            <div class="chart-box">\
                <h4>商品类别销售占比</h4>\
                <div ref="pieChart" class="chart-container"></div>\
            </div>\
        </div>\
        <div class="charts-row">\
            <div class="chart-box">\
                <h4>供应商采购 Top5</h4>\
                <div ref="barChart" class="chart-container"></div>\
            </div>\
            <div class="chart-box">\
                <h4>库存预警商品</h4>\
                <el-table :data="data.lowStockProducts || []" size="small" max-height="260">\
                    <el-table-column prop="productName" label="商品名称"></el-table-column>\
                    <el-table-column prop="stock" label="当前库存" width="80"></el-table-column>\
                    <el-table-column prop="safetyStock" label="安全库存" width="80"></el-table-column>\
                </el-table>\
            </div>\
        </div>\
    </div>',
    data: function() {
        return { data: {} };
    },
    mounted: function() {
        this.loadData();
    },
    methods: {
        loadData: function() {
            var self = this;
            api.getDashboard().then(function(res) {
                if (res.code === 200) {
                    self.data = res.data;
                    self.$nextTick(function() {
                        self.renderTrendChart();
                        self.renderPieChart();
                        self.renderBarChart();
                    });
                }
            });
        },
        renderTrendChart: function() {
            var chart = echarts.init(this.$refs.trendChart);
            var trend = this.data.salesTrend || [];
            chart.setOption({
                tooltip: { trigger: 'axis' },
                xAxis: { type: 'category', data: trend.map(function(i) { return i.date; }) },
                yAxis: { type: 'value' },
                series: [{
                    data: trend.map(function(i) { return i.amount; }),
                    type: 'line', smooth: true, areaStyle: { opacity: 0.3 },
                    itemStyle: { color: '#667eea' }
                }],
                grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true }
            });
            window.addEventListener('resize', function() { chart.resize(); });
        },
        renderPieChart: function() {
            var chart = echarts.init(this.$refs.pieChart);
            var data = this.data.categorySales || [];
            chart.setOption({
                tooltip: { trigger: 'item' },
                series: [{
                    type: 'pie', radius: ['40%', '70%'],
                    data: data,
                    label: { formatter: '{b}: {d}%' }
                }]
            });
            window.addEventListener('resize', function() { chart.resize(); });
        },
        renderBarChart: function() {
            var chart = echarts.init(this.$refs.barChart);
            var data = this.data.supplierTop5 || [];
            chart.setOption({
                tooltip: { trigger: 'axis' },
                xAxis: { type: 'category', data: data.map(function(i) { return i.name; }) },
                yAxis: { type: 'value' },
                series: [{
                    data: data.map(function(i) { return i.value; }),
                    type: 'bar', barWidth: '40%',
                    itemStyle: { color: '#667eea', borderRadius: [4, 4, 0, 0] }
                }],
                grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true }
            });
            window.addEventListener('resize', function() { chart.resize(); });
        }
    }
};
