/**
 * 数据大屏 — Premium v6.0
 * CountUp 数字动画 + 暗黑模式 + 半环图 + 横向柱状图 + 精美空状态
 */
const DashboardPage = {
    template: '\
    <div class="dashboard-v6">\
        <!-- 顶部工具栏 -->\
        <div class="dash-toolbar">\
            <div class="dash-toolbar-left">\
                <span class="dash-subtitle">数据实时更新 · {{ lastUpdate }}</span>\
            </div>\
            <div class="dash-toolbar-right">\
                <el-button size="small" :icon="refreshIcon" @click="refreshData" :loading="loading" round>刷新</el-button>\
            </div>\
        </div>\
\
        <!-- KPI 卡片 -->\
        <div class="stat-cards">\
            <div class="stat-card stat-card--sales" v-for="card in kpiCards" :key="card.key">\
                <div class="stat-card-glow"></div>\
                <div class="stat-card-top-bar"></div>\
                <div class="stat-card-body">\
                    <div class="stat-card-icon-box" :style="{background: card.gradient}">\
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="card.iconPaths"></svg>\
                    </div>\
                    <div class="stat-card-info">\
                        <div class="stat-card-label">{{ card.label }}</div>\
                        <div class="stat-card-value" :ref="\'counter_\' + card.key">\
                            <span class="stat-card-prefix" v-if="card.prefix">{{ card.prefix }}</span>\
                            <span class="stat-card-number">{{ card.displayValue }}</span>\
                            <span class="stat-card-suffix" v-if="card.suffix">{{ card.suffix }}</span>\
                        </div>\
                        <div class="stat-card-trend" v-if="card.trend !== null" :class="card.trend >= 0 ? \'trend-up\' : \'trend-down\'">\
                            <span class="trend-arrow">{{ card.trend >= 0 ? \'▲\' : \'▼\' }}</span>\
                            <span class="trend-pct">{{ Math.abs(card.trend) }}%</span>\
                            <span class="trend-label">较昨日</span>\
                        </div>\
                        <div class="stat-card-sub" v-else-if="card.subText">\
                            {{ card.subText }}\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
\
        <!-- 图表行1：销售趋势 + 品类占比 -->\
        <div class="charts-row">\
            <div class="chart-box chart-box--trend">\
                <div class="chart-box-header">\
                    <h4>销售趋势 · 近 7 天</h4>\
                </div>\
                <div ref="trendChart" class="chart-container"></div>\
            </div>\
            <div class="chart-box chart-box--pie">\
                <div class="chart-box-header">\
                    <h4>品类销售占比</h4>\
                </div>\
                <div ref="pieChart" class="chart-container"></div>\
            </div>\
        </div>\
\
        <!-- 图表行2：供应商Top5 + 库存预警 -->\
        <div class="charts-row charts-row--equal">\
            <div class="chart-box chart-box--bar">\
                <div class="chart-box-header">\
                    <h4>供应商采购 TOP 5</h4>\
                </div>\
                <div ref="barChart" class="chart-container"></div>\
            </div>\
            <div class="chart-box chart-box--stock">\
                <div class="chart-box-header">\
                    <h4>库存预警商品</h4>\
                </div>\
                <!-- 有数据 -->\
                <div v-if="hasStockData" class="stock-table-wrap">\
                    <div class="stock-row" v-for="(item, idx) in data.lowStockProducts" :key="idx">\
                        <div class="stock-name">\
                            <span class="stock-dot" :class="stockLevel(item)"></span>\
                            {{ item.productName }}\
                        </div>\
                        <div class="stock-bar-wrap">\
                            <div class="stock-bar-track">\
                                <div class="stock-bar-fill" :class="stockLevel(item)" :style="{width: stockPercent(item) + \'%\'}"></div>\
                            </div>\
                            <span class="stock-nums">{{ item.stock }}/{{ item.safetyStock }}</span>\
                        </div>\
                    </div>\
                </div>\
                <!-- 空状态 -->\
                <div v-else class="stock-empty">\
                    <svg width="100" height="80" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">\
                        <rect x="8" y="36" width="28" height="52" rx="3" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="1.2"/>\
                        <rect x="46" y="36" width="28" height="52" rx="3" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="1.2"/>\
                        <rect x="84" y="36" width="28" height="52" rx="3" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="1.2"/>\
                        <rect x="8" y="20" width="104" height="12" rx="3" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1"/>\
                        <circle cx="60" cy="68" r="14" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/>\
                        <path d="M56 68 L64 68 M60 64 L60 72" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>\
                    </svg>\
                    <p class="stock-empty-title">库存状态良好</p>\
                    <p class="stock-empty-desc">所有商品库存均在安全线以上</p>\
                </div>\
            </div>\
        </div>\
\
        <!-- 第三行：本月销售概况 + 最近订单 -->\
        <div class="charts-row charts-row--equal">\
            <!-- 本月销售概况 -->\
            <div class="chart-box chart-box--summary">\
                <div class="chart-box-header">\
                    <h4>本月销售概况</h4>\
                </div>\
                <div class="month-summary">\
                    <div class="summary-item">\
                        <div class="summary-value">¥{{ fmtNum(monthStats.totalSales) }}</div>\
                        <div class="summary-label">本月销售额</div>\
                    </div>\
                    <div class="summary-item">\
                        <div class="summary-value highlight">{{ monthStats.orderCount }}</div>\
                        <div class="summary-label">本月订单数</div>\
                    </div>\
                    <div class="summary-item">\
                        <div class="summary-value">¥{{ fmtNum(monthStats.avgOrder) }}</div>\
                        <div class="summary-label">平均客单价</div>\
                    </div>\
                </div>\
            </div>\
            <!-- 最近订单 -->\
            <div class="chart-box chart-box--orders">\
                <div class="chart-box-header">\
                    <h4>最近销售订单</h4>\
                </div>\
                <div v-if="hasRecentOrders" class="recent-orders-wrap">\
                    <div class="order-row" v-for="order in data.recentOrders" :key="order.orderId">\
                        <div class="order-left">\
                            <span class="order-no">{{ order.orderNo }}</span>\
                            <span class="order-user">{{ order.createUserName }}</span>\
                        </div>\
                        <div class="order-right">\
                            <span class="order-amount">¥{{ fmtNum(order.totalAmount) }}</span>\
                            <span class="order-time">{{ formatTime(order.createTime) }}</span>\
                        </div>\
                    </div>\
                </div>\
                <div v-else class="stock-empty">\
                    <p class="stock-empty-title">暂无订单</p>\
                    <p class="stock-empty-desc">新订单将实时显示在这里</p>\
                </div>\
            </div>\
        </div>\
    </div>',
    data: function() {
        return {
            data: {},
            loading: false,
            lastUpdate: '--',
            kpiCards: [
                {
                    key: 'sales',
                    label: '今日销售额',
                    prefix: '¥',
                    suffix: '',
                    displayValue: '0',
                    rawValue: 0,
                    trend: null,
                    subText: '',
                    gradient: 'linear-gradient(135deg, #2357c6, #4A7DE0)',
                    iconPaths: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>'
                },
                {
                    key: 'purchase',
                    label: '本月采购额',
                    prefix: '¥',
                    suffix: '',
                    displayValue: '0',
                    rawValue: 0,
                    trend: null,
                    subText: '',
                    gradient: 'linear-gradient(135deg, #F472B6, #FB7185)',
                    iconPaths: '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>'
                },
                {
                    key: 'stock',
                    label: '库存预警',
                    prefix: '',
                    suffix: ' 件',
                    displayValue: '0',
                    rawValue: 0,
                    trend: null,
                    subText: null,
                    gradient: 'linear-gradient(135deg, #06B6D4, #22D3EE)',
                    iconPaths: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>'
                },
                {
                    key: 'supplier',
                    label: '本月新增供应商',
                    prefix: '',
                    suffix: '',
                    displayValue: '0',
                    rawValue: 0,
                    trend: null,
                    subText: null,
                    gradient: 'linear-gradient(135deg, #10B981, #34D399)',
                    iconPaths: '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>'
                }
            ],
            countUpInstances: {}
        };
    },
    computed: {
        refreshIcon: function() {
            return this.loading ? 'Loading' : 'Refresh';
        },
        hasStockData: function() {
            var products = this.data.lowStockProducts;
            return products && products.length > 0;
        },
        hasRecentOrders: function() {
            var orders = this.data.recentOrders;
            return orders && orders.length > 0;
        },
        monthStats: function() {
            var orders = this.data.recentOrders || [];
            var totalSales = orders.reduce(function(s, o) { return s + (Number(o.totalAmount) || 0); }, 0);
            var count = orders.length;
            var avg = count > 0 ? Math.round(totalSales / count) : 0;
            return {
                totalSales: totalSales,
                orderCount: count,
                avgOrder: avg
            };
        }
    },
    mounted: function() {
        this.loadData();
        this._handleThemeChange = this.onThemeChange.bind(this);
        window.addEventListener('themechange', this._handleThemeChange);
    },
    beforeUnmount: function() {
        // Clean up theme listener
        window.removeEventListener('themechange', this._handleThemeChange);
        // Clean up resize listeners
        if (this._resizeTrend) window.removeEventListener('resize', this._resizeTrend);
        if (this._resizePie) window.removeEventListener('resize', this._resizePie);
        if (this._resizeBar) window.removeEventListener('resize', this._resizeBar);
        // Clean up countUp instances
        for (var key in this.countUpInstances) {
            if (this.countUpInstances[key]) {
                this.countUpInstances[key] = null;
            }
        }
        // Clean up chart instances
        if (this._trendChart) { this._trendChart.dispose(); }
        if (this._pieChart) { this._pieChart.dispose(); }
        if (this._barChart) { this._barChart.dispose(); }
    },
    methods: {
        fmtNum: function(n) { return (n || 0).toLocaleString('zh-CN'); },

        nowStr: function() {
            var d = new Date();
            var pad = function(n) { return n < 10 ? '0' + n : '' + n; };
            return d.getFullYear() + '-' + pad(d.getMonth()+1) + '-' + pad(d.getDate()) + ' '
                + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
        },

        formatTime: function(t) {
            if (!t) return '';
            // Java Date serialized as timestamp (number) or string
            var d = new Date(t);
            if (isNaN(d.getTime())) return t; // fallback: return as-is
            var now = new Date();
            var diff = now - d;
            if (diff < 60000) return '刚刚';
            if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前';
            if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前';
            var pad = function(n) { return n < 10 ? '0' + n : n; };
            return (d.getMonth()+1) + '-' + pad(d.getDate()) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
        },

        refreshData: function() {
            this.loadData();
        },

        onThemeChange: function() {
            // 主题切换后重新渲染图表
            this.$nextTick(function() {
                this.renderTrendChart();
                this.renderPieChart();
                this.renderBarChart();
            });
        },

        animateNumbers: function() {
            var self = this;
            var CountUp = window.CountUp;
            if (!CountUp) return;

            var targets = [
                { key: 'sales', val: self.data.todaySales || 0, prefix: '¥' },
                { key: 'purchase', val: self.data.monthlyPurchase || 0, prefix: '¥' },
                { key: 'stock', val: self.data.lowStockCount || 0, prefix: '' },
                { key: 'supplier', val: self.data.newSupplierCount || 0, prefix: '' }
            ];

            targets.forEach(function(t) {
                // Update kpiCard rawValue + displayValue for template binding first
                var card = self.kpiCards.find(function(c) { return c.key === t.key; });
                if (card) {
                    card.rawValue = t.val;
                    card.displayValue = (t.prefix || '') + self.fmtNum(t.val);
                    // Set trend for sales card
                    if (t.key === 'sales') {
                        card.trend = self.calcSalesTrend();
                    }
                    if (t.key === 'stock') {
                        var count = self.data.lowStockCount || 0;
                        card.subText = count > 0 ? '需补货 ' + count + ' 件' : '库存充足';
                        card.displayValue = count;
                    }
                }
            });

            // Run CountUp animation in next tick
            self.$nextTick(function() {
                targets.forEach(function(t) {
                    var el = self.$refs['counter_' + t.key];
                    if (!el) return;
                    var numEl = el.querySelector('.stat-card-number');
                    if (!numEl) return;

                    var oldInstance = self.countUpInstances[t.key];
                    if (oldInstance && oldInstance.reset) {
                        oldInstance.reset();
                    }

                    var endVal = t.val;
                    var startVal = 0;
                    var decimalPlaces = 0;

                    var cu = new CountUp(numEl, startVal, endVal, decimalPlaces, 1.5, {
                        useEasing: true,
                        useGrouping: true,
                        separator: ',',
                        prefix: '',
                        suffix: ''
                    });

                    if (!cu.error) {
                        cu.start();
                        self.countUpInstances[t.key] = cu;
                    } else {
                        numEl.textContent = self.fmtNum(endVal);
                    }
                });
            });
        },

        calcSalesTrend: function() {
            var t = this.data.salesTrend || [];
            if (t.length < 2) return null;
            var prev = t[t.length-2].amount || 1;
            var curr = t[t.length-1].amount || 0;
            return Math.round((curr - prev) / prev * 100);
        },

        loadData: function() {
            var self = this;
            self.loading = true;
            api.getDashboard().then(function(res) {
                self.loading = false;
                if (res.code === 200) {
                    self.data = res.data;
                    self.lastUpdate = self.nowStr();
                    self.animateNumbers();
                    self.$nextTick(function() {
                        self.renderTrendChart();
                        self.renderPieChart();
                        self.renderBarChart();
                    });
                }
            }).catch(function() {
                self.loading = false;
            });
        },

        // ===== 图表 =====

        renderTrendChart: function() {
            var el = this.$refs.trendChart; if (!el) return;
            if (this._trendChart) this._trendChart.dispose();
            var isDark = document.documentElement.classList.contains('dark');
            var chart = echarts.init(el);
            this._trendChart = chart;
            var trend = this.data.salesTrend || [];
            var textColor = isDark ? '#94A3B8' : '#64748B';
            var gridColor = isDark ? 'rgba(255,255,255,0.04)' : '#F1F5F9';

            // 如果有预测，构造两条线
            var actualData = trend.map(function(i){ return i.amount; });
            var dates = trend.map(function(i){ return i.date; });

            var series = [{
                name: '实际销售',
                data: actualData,
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 7,
                lineStyle: { width: 3, color: '#2357c6' },
                itemStyle: { color: '#2357c6' },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(35,87,198,0.18)' },
                        { offset: 1, color: 'rgba(35,87,198,0.0)' }
                    ])
                }
            }];

            // 如果有7天数据，添加简单预测线（最后一天到extend）
            if (actualData.length >= 3) {
                var last3 = actualData.slice(-3);
                var avgGrowth = (last3[2] - last3[0]) / 2;
                var forecastVal = Math.max(0, Math.round(last3[2] + avgGrowth));
                series.push({
                    name: '预测趋势',
                    data: [null, null, null, null, null, null, null].map(function(v, i) {
                        return i === 6 ? forecastVal : null;
                    }),
                    type: 'line',
                    smooth: true,
                    symbol: 'diamond',
                    symbolSize: 9,
                    lineStyle: { width: 2, type: 'dashed', color: '#F59E0B' },
                    itemStyle: { color: '#F59E0B' },
                    areaStyle: { color: 'transparent' }
                });
            }

            chart.setOption({
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
                    borderColor: isDark ? '#334155' : '#E2E8F0',
                    textStyle: { color: isDark ? '#E2E8F0' : '#0F172A', fontSize: 13 },
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    extraCssText: 'border-radius:12px;padding:12px 16px;'
                },
                legend: {
                    data: series.map(function(s){ return s.name; }),
                    bottom: 0,
                    textStyle: { color: textColor, fontSize: 11 },
                    itemWidth: 12, itemHeight: 8
                },
                grid: { left: '3%', right: '4%', bottom: '12%', top: '6%', containLabel: true },
                xAxis: {
                    type: 'category',
                    data: dates,
                    axisLine: { show: false },
                    axisTick: { show: false },
                    axisLabel: { color: textColor, fontSize: 11 }
                },
                yAxis: {
                    type: 'value',
                    splitLine: { lineStyle: { color: gridColor } },
                    axisLabel: {
                        color: textColor,
                        fontSize: 11,
                        formatter: function(v) { return v >= 10000 ? (v/10000).toFixed(1) + 'w' : v; }
                    }
                },
                series: series
            });
            this._resizeTrend = function() { chart.resize(); };
            window.addEventListener('resize', this._resizeTrend);
        },

        renderPieChart: function() {
            var el = this.$refs.pieChart; if (!el) return;
            if (this._pieChart) this._pieChart.dispose();
            var isDark = document.documentElement.classList.contains('dark');
            var chart = echarts.init(el);
            this._pieChart = chart;
            var data = this.data.categorySales || [];
            var colors = ['#2357c6', '#16A34A', '#D97706', '#DC2626', '#6C8ED0', '#0891B2'];
            var total = data.reduce(function(s, i){ return s + (i.value || 0); }, 0);
            var textColor = isDark ? '#94A3B8' : '#64748B';

            chart.setOption({
                tooltip: {
                    trigger: 'item',
                    backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
                    borderColor: isDark ? '#334155' : '#E2E8F0',
                    textStyle: { color: isDark ? '#E2E8F0' : '#0F172A' },
                    formatter: '{b}: ¥{c} ({d}%)',
                    extraCssText: 'border-radius:10px;padding:10px 14px;'
                },
                color: colors,
                graphic: [{
                    type: 'text',
                    left: 'center',
                    top: 'center',
                    style: {
                        text: '¥' + (total > 9999 ? (total/10000).toFixed(1)+'万' : total),
                        textAlign: 'center',
                        fontSize: 18,
                        fontWeight: 'bold',
                        fill: isDark ? '#E2E8F0' : '#0F172A'
                    }
                }, {
                    type: 'text',
                    left: 'center',
                    top: '58%',
                    style: {
                        text: '总销售额',
                        textAlign: 'center',
                        fontSize: 11,
                        fill: textColor
                    }
                }],
                series: [{
                    type: 'pie',
                    radius: ['55%', '75%'],
                    center: ['50%', '48%'],
                    data: data,
                    label: {
                        formatter: '{b}\n{d}%',
                        fontSize: 10,
                        color: textColor,
                        lineHeight: 15,
                        distanceToLabelLine: 4
                    },
                    emphasis: {
                        label: { fontSize: 14, fontWeight: 'bold' },
                        scaleSize: 10,
                        focus: 'self'
                    },
                    itemStyle: {
                        borderColor: isDark ? '#1E293B' : '#FFFFFF',
                        borderWidth: 3,
                        borderRadius: 3
                    }
                }]
            });
            this._resizePie = function() { chart.resize(); };
            window.addEventListener('resize', this._resizePie);
        },

        renderBarChart: function() {
            var el = this.$refs.barChart; if (!el) return;
            if (this._barChart) this._barChart.dispose();
            var isDark = document.documentElement.classList.contains('dark');
            var chart = echarts.init(el);
            this._barChart = chart;
            var data = this.data.supplierTop5 || [];
            var textColor = isDark ? '#94A3B8' : '#64748B';
            var gridColor = isDark ? 'rgba(255,255,255,0.04)' : '#F1F5F9';

            // Horizontal bar chart
            var names = data.map(function(i){ return i.name; }).reverse();
            var values = data.map(function(i){ return i.value; }).reverse();
            var totalVal = values.reduce(function(s, v){ return s + v; }, 0);
            var barColors = [
                'rgba(35,87,198,0.9)',
                'rgba(74,125,224,0.8)',
                'rgba(120,160,220,0.7)',
                'rgba(160,190,230,0.6)',
                'rgba(190,215,240,0.5)'
            ];

            chart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: 'shadow' },
                    backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
                    borderColor: isDark ? '#334155' : '#E2E8F0',
                    textStyle: { color: isDark ? '#E2E8F0' : '#0F172A', fontSize: 13 },
                    formatter: function(params) {
                        var p = params[0];
                        var pct = totalVal > 0 ? (p.value / totalVal * 100).toFixed(1) : '0';
                        return p.name + '<br/>采购额：¥' + p.value.toLocaleString() + '<br/>占比：' + pct + '%';
                    },
                    extraCssText: 'border-radius:12px;padding:12px 16px;'
                },
                grid: { left: '3%', right: '15%', bottom: '2%', top: '2%', containLabel: true },
                xAxis: {
                    type: 'value',
                    splitLine: { lineStyle: { color: gridColor } },
                    axisLabel: {
                        color: textColor,
                        fontSize: 11,
                        formatter: function(v) { return v >= 10000 ? (v/10000).toFixed(1)+'w' : v; }
                    }
                },
                yAxis: {
                    type: 'category',
                    data: names,
                    axisLine: { show: false },
                    axisTick: { show: false },
                    axisLabel: {
                        color: isDark ? '#CBD5E1' : '#0F172A',
                        fontSize: 12,
                        fontWeight: 500,
                        formatter: function(value, index) {
                            // Reverse index for ranking: original order
                            var rank = data.length - index;
                            var medals = ['🥇', '🥈', '🥉'];
                            var prefix = medals[rank-1] || (rank + ' ');
                            return prefix + '  ' + value;
                        }
                    }
                },
                series: [{
                    data: values,
                    type: 'bar',
                    barWidth: '55%',
                    itemStyle: {
                        color: function(params) {
                            return barColors[params.dataIndex] || barColors[0];
                        },
                        borderRadius: [0, 8, 8, 0]
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(35,87,198,0.3)',
                            shadowOffsetX: 2
                        }
                    },
                    label: {
                        show: true,
                        position: 'right',
                        color: textColor,
                        fontSize: 11,
                        formatter: function(p) {
                            return '¥' + (p.value >= 10000 ? (p.value/10000).toFixed(1)+'万' : p.value);
                        }
                    }
                }]
            });
            this._resizeBar = function() { chart.resize(); };
            window.addEventListener('resize', this._resizeBar);
        },

        // ===== 库存工具 =====
        stockLevel: function(item) {
            var ratio = (item.stock || 0) / (item.safetyStock || 1);
            if (ratio <= 0.3) return 'danger';
            if (ratio <= 0.7) return 'warning';
            return 'safe';
        },
        stockPercent: function(item) {
            // Show stock as percentage of safety stock (capped at 100%)
            var ratio = (item.stock || 0) / (item.safetyStock || 1);
            return Math.min(ratio * 100, 100);
        }
    }
};
