/**
 * 销售订单 — 列表页
 */
const SalesPage = {
    template: '\
    <div class="page-card">\
        <div class="page-header">\
            <h3>销售订单</h3>\
            <el-button type="primary" @click="$router.push(\'/sales/add\')">新增销售</el-button>\
        </div>\
        <div class="search-bar">\
            <el-input v-model="query.orderNo" placeholder="订单号" clearable style="width:180px" @clear="loadData" @keyup.enter="loadData"></el-input>\
            <el-date-picker v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="YYYY-MM-DD" style="width:280px" @change="onDateChange"></el-date-picker>\
            <el-button type="primary" @click="loadData">搜索</el-button>\
        </div>\
        <el-table :data="page.list" v-loading="loading" border stripe>\
            <el-table-column prop="orderNo" label="订单号" width="180"></el-table-column>\
            <el-table-column prop="totalAmount" label="总金额" width="120"></el-table-column>\
            <el-table-column prop="createUserName" label="创建人" width="100"></el-table-column>\
            <el-table-column prop="createTime" label="创建时间" width="160"></el-table-column>\
            <el-table-column label="操作" width="160" fixed="right">\
                <template #default="{row}">\
                    <div class="table-actions">\
                        <el-button type="primary" link size="small" @click="$router.push(\'/sales/\'+row.orderId)">详情</el-button>\
                        <el-button type="danger" link size="small" @click="handleDelete(row)">删除</el-button>\
                    </div>\
                </template>\
            </el-table-column>\
        </el-table>\
        <div style="margin-top:15px;display:flex;justify-content:flex-end">\
            <el-pagination background layout="total, prev, pager, next" :total="page.totalCount" :page-size="query.pageSize" v-model:current-page="query.pageNo" @current-change="loadData"></el-pagination>\
        </div>\
    </div>',
    data: function() {
        return {
            query: { pageNo: 1, pageSize: 10, orderNo: '', startDate: '', endDate: '' },
            page: { list: [], totalCount: 0 },
            dateRange: null, loading: false
        };
    },
    created: function() { this.loadData(); },
    methods: {
        onDateChange: function(val) {
            this.query.startDate = val ? val[0] : '';
            this.query.endDate = val ? val[1] : '';
            this.loadData();
        },
        loadData: function() {
            var self = this;
            self.loading = true;
            api.getSalesList(self.query).then(function(res) {
                self.loading = false;
                if (res.code === 200) self.page = res.data;
            }).catch(function() { self.loading = false; });
        },
        handleDelete: function(row) {
            var self = this;
            ElementPlus.ElMessageBox.confirm('确定删除该订单？', '提示', { type: 'warning' })
                .then(function() {
                    api.deleteSales(row.orderId).then(function(res) {
                        if (res.code === 200) { ElementPlus.ElMessage.success(res.msg); self.loadData(); }
                        else ElementPlus.ElMessage.error(res.msg);
                    });
                }).catch(function() {});
        }
    }
};

/**
 * 销售订单 — 新增页
 */
const SalesAddPage = {
    template: '\
    <div class="page-card">\
        <div class="page-header">\
            <h3>新增销售订单</h3>\
            <el-button @click="$router.back()">返回</el-button>\
        </div>\
        <el-form :model="form" ref="formRef" label-width="100px" style="max-width:700px">\
            <el-form-item label="订单明细">\
                <el-button type="primary" size="small" @click="addItem">添加商品</el-button>\
                <el-table :data="form.orderItems" border size="small" style="margin-top:10px">\
                    <el-table-column label="商品" min-width="180">\
                        <template #default="{row}">\
                            <el-select v-model="row.productId" size="small" style="width:100%" @change="onProductChange(row)">\
                                <el-option v-for="p in products" :key="p.productId" :label="p.productName+\'(库存:\'+p.stock+\')\'" :value="p.productId"></el-option>\
                            </el-select>\
                        </template>\
                    </el-table-column>\
                    <el-table-column label="单价" width="120">\
                        <template #default="{row}"><el-input-number v-model="row.price" :min="0" :precision="2" size="small" style="width:100%"></el-input-number></template>\
                    </el-table-column>\
                    <el-table-column label="数量" width="120">\
                        <template #default="{row}"><el-input-number v-model="row.quantity" :min="1" size="small" style="width:100%"></el-input-number></template>\
                    </el-table-column>\
                    <el-table-column label="金额" width="100">\
                        <template #default="{row}">{{ (row.price * row.quantity).toFixed(2) }}</template>\
                    </el-table-column>\
                    <el-table-column label="操作" width="70">\
                        <template #default="{$index}"><el-button type="danger" link size="small" @click="form.orderItems.splice($index,1)">删除</el-button></template>\
                    </el-table-column>\
                </el-table>\
                <div style="margin-top:10px;text-align:right;font-size:16px;font-weight:bold">合计：¥{{ totalAmount }}</div>\
            </el-form-item>\
            <el-form-item>\
                <el-button type="primary" :loading="submitting" @click="handleSubmit">提交订单</el-button>\
            </el-form-item>\
        </el-form>\
    </div>',
    data: function() {
        return {
            form: { orderItems: [] },
            products: [], submitting: false
        };
    },
    computed: {
        totalAmount: function() {
            var sum = 0;
            this.form.orderItems.forEach(function(item) { sum += item.price * item.quantity; });
            return sum.toFixed(2);
        }
    },
    created: function() { this.loadProducts(); },
    methods: {
        loadProducts: function() {
            var self = this;
            api.getAllProducts().then(function(res) { if (res.code === 200) self.products = res.data; });
        },
        addItem: function() {
            this.form.orderItems.push({ productId: null, price: 0, quantity: 1 });
        },
        onProductChange: function(row) {
            var p = this.products.find(function(item) { return item.productId === row.productId; });
            if (p) row.price = p.price;
        },
        handleSubmit: function() {
            var self = this;
            if (self.form.orderItems.length === 0) {
                ElementPlus.ElMessage.warning('请添加至少一个商品');
                return;
            }
            self.submitting = true;
            api.addSales(self.form).then(function(res) {
                self.submitting = false;
                if (res.code === 200) { ElementPlus.ElMessage.success(res.msg); self.$router.push('/sales'); }
                else ElementPlus.ElMessage.error(res.msg);
            }).catch(function() { self.submitting = false; });
        }
    }
};

/**
 * 销售订单 — 详情页
 */
const SalesDetailPage = {
    template: '\
    <div class="page-card">\
        <div class="page-header">\
            <h3>销售订单详情</h3>\
            <el-button @click="$router.back()">返回</el-button>\
        </div>\
        <el-descriptions :column="2" border>\
            <el-descriptions-item label="订单号">{{ order.orderNo }}</el-descriptions-item>\
            <el-descriptions-item label="总金额">¥{{ order.totalAmount }}</el-descriptions-item>\
            <el-descriptions-item label="创建人">{{ order.createUserName }}</el-descriptions-item>\
            <el-descriptions-item label="创建时间">{{ order.createTime }}</el-descriptions-item>\
        </el-descriptions>\
        <div class="order-items">\
            <h4>订单明细</h4>\
            <el-table :data="order.orderItems || []" border>\
                <el-table-column prop="productName" label="商品名称"></el-table-column>\
                <el-table-column prop="price" label="单价" width="120"></el-table-column>\
                <el-table-column prop="quantity" label="数量" width="100"></el-table-column>\
                <el-table-column prop="amount" label="金额" width="120"></el-table-column>\
            </el-table>\
        </div>\
    </div>',
    data: function() { return { order: {} }; },
    created: function() { this.loadData(); },
    methods: {
        loadData: function() {
            var self = this;
            api.getSalesById(self.$route.params.id).then(function(res) {
                if (res.code === 200) self.order = res.data;
            });
        }
    }
};
