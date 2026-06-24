/**
 * 操作日志页面
 */
const LogPage = {
    template: '<div class="page-card"><div class="page-header"><h3>操作日志</h3></div><div class="search-bar"><el-input v-model="query.keyword" placeholder="搜索用户名/操作" clearable style="width:200px" @clear="loadData" @keyup.enter="loadData"></el-input><el-select v-model="query.module" placeholder="选择模块" clearable style="width:160px" @change="loadData"><el-option label="用户" value="User"></el-option><el-option label="供应商" value="Supplier"></el-option><el-option label="商品" value="Product"></el-option><el-option label="采购" value="PurchaseOrder"></el-option><el-option label="销售" value="SalesOrder"></el-option><el-option label="新闻" value="News"></el-option></el-select><el-button type="primary" @click="loadData">搜索</el-button><el-button @click="resetQuery">重置</el-button></div><el-table :data="page.list" v-loading="loading" border stripe empty-text="暂无数据"><el-table-column prop="logId" label="ID" width="60"></el-table-column><el-table-column prop="username" label="用户" width="100"></el-table-column><el-table-column prop="operation" label="操作" width="80"></el-table-column><el-table-column prop="module" label="模块" width="120"></el-table-column><el-table-column prop="method" label="方法" width="120"></el-table-column><el-table-column prop="ip" label="IP" width="130"></el-table-column><el-table-column label="时间" width="160"><template #default="scope"><span>{{ $formatTime(scope.row.createTime) }}</span></template></el-table-column></el-table><div style="margin-top:15px;display:flex;justify-content:flex-end"><el-pagination background layout="total, prev, pager, next" :total="page.totalCount" :page-size="query.pageSize" :current-page.sync="query.pageNo" @current-change="loadData"></el-pagination></div></div>',
    data: function() {
        return {
            query: { pageNo: 1, pageSize: 10, keyword: '', module: '' },
            page: { list: [], totalCount: 0 },
            loading: false
        };
    },
    created: function() { this.loadData(); },
    methods: {
        resetQuery: function() {
            this.query = { pageNo: 1, pageSize: this.query.pageSize, keyword: '', module: '' };
            this.loadData();
        },
        loadData: function() {
            var self = this;
            self.loading = true;
            api.getLogList(self.query).then(function(res) {
                self.loading = false;
                if (res.code === 200) self.page = res.data;
            }).catch(function() { self.loading = false; });
        }
    }
};
