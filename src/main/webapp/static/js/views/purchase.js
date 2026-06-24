/**
 * 采购订单 — 列表页
 */
const PurchasePage = {
    template: '\
    <div class="page-card">\
        <div class="page-header">\
            <h3>采购订单</h3>\
            <el-button type="primary" @click="$router.push(\'/purchase/add\')">新增采购</el-button>\
        </div>\
        <div class="search-bar">\
            <el-input v-model="query.orderNo" placeholder="订单号" clearable style="width:200px" @clear="loadData" @keyup.enter="loadData"></el-input>\
            <el-select v-model="query.supplierId" placeholder="选择供应商" clearable style="width:160px" @change="loadData">\
                <el-option v-for="s in suppliers" :key="s.supplierId" :label="s.supplierName" :value="s.supplierId"></el-option>\
            </el-select>\
            <el-select v-model="query.status" placeholder="状态" clearable style="width:160px" @change="loadData">\
                <el-option label="待审核" :value="0"></el-option>\
                <el-option label="已通过" :value="1"></el-option>\
                <el-option label="已驳回" :value="2"></el-option>\
            </el-select>\
            <el-button type="primary" @click="loadData">搜索</el-button>\
            <el-button @click="resetQuery">重置</el-button>\
        </div>\
        <el-table :data="page.list" v-loading="loading" border stripe empty-text="暂无数据">\
            <el-table-column prop="orderNo" label="订单号" width="180"></el-table-column>\
            <el-table-column prop="supplierName" label="供应商"></el-table-column>\
            <el-table-column prop="totalAmount" label="总金额" width="110"></el-table-column>\
            <el-table-column label="状态" width="90">\
                <template #default="{row}">\
                    <el-tag :type="row.orderStatus===0?\'warning\':row.orderStatus===1?\'success\':\'danger\'" size="small">\
                        {{ [\'待审核\',\'已通过\',\'已驳回\'][row.orderStatus] }}\
                    </el-tag>\
                </template>\
            </el-table-column>\
            <el-table-column prop="createUserName" label="创建人" width="90"></el-table-column>\
            <el-table-column label="创建时间" width="160"><template #default="{row}">{{ $formatTime(row.createTime) }}</template></el-table-column>\
            <el-table-column label="操作" width="220" fixed="right">\
                <template #default="{row}">\
                    <div class="table-actions">\
                        <el-button type="primary" link size="small" @click="$router.push(\'/purchase/\'+row.orderId)">详情</el-button>\
                        <el-button type="success" link size="small" v-if="row.orderStatus===0" @click="handleAudit(row,1)">通过</el-button>\
                        <el-button type="warning" link size="small" v-if="row.orderStatus===0" @click="handleAudit(row,2)">驳回</el-button>\
                        <el-button type="danger" link size="small" v-if="row.orderStatus!==1" @click="handleDelete(row)">删除</el-button>\
                    </div>\
                </template>\
            </el-table-column>\
        </el-table>\
        <div class="pagination-bar">\
            <span class="pagination-total">共 {{ page.totalCount }} 条记录</span>\
            <el-pagination background layout="total, sizes, prev, pager, next" :page-sizes="[10,20,50]" :total="page.totalCount" :page-size="query.pageSize" v-model:current-page="query.pageNo" @current-change="loadData" @size-change="onPageSizeChange"></el-pagination>\
        </div>\
    </div>',
    data: function() {
        return {
            query: { pageNo: 1, pageSize: 10, orderNo: '', supplierId: null, status: null },
            page: { list: [], totalCount: 0 },
            suppliers: [], loading: false
        };
    },
    created: function() { this.loadSuppliers(); this.loadData(); },
    methods: {
        loadSuppliers: function() {
            var self = this;
            api.getAllSuppliers().then(function(res) { if (res.code === 200) self.suppliers = res.data; });
        },
        loadData: function() {
            var self = this;
            self.loading = true;
            api.getPurchaseList(self.query).then(function(res) {
                self.loading = false;
                if (res.code === 200) self.page = res.data;
            }).catch(function() { self.loading = false; });
        },
        handleAudit: function(row, status) {
            var self = this;
            var msg = status === 1 ? '通过' : '驳回';
            ElementPlus.ElMessageBox.confirm('确定' + msg + '该订单？', '提示', { type: 'warning' })
                .then(function() {
                    api.auditPurchase(row.orderId, status).then(function(res) {
                        if (res.code === 200) { ElementPlus.ElMessage.success(res.msg); self.loadData(); }
                        else ElementPlus.ElMessage.error(res.msg);
                    });
                }).catch(function() {});
        },
        handleDelete: function(row) {
            var self = this;
            ElementPlus.ElMessageBox.confirm('确定删除该订单？', '提示', { type: 'warning' })
                .then(function() {
                    api.deletePurchase(row.orderId).then(function(res) {
                        if (res.code === 200) { ElementPlus.ElMessage.success(res.msg); self.loadData(); }
                        else ElementPlus.ElMessage.error(res.msg);
                    });
                }).catch(function() {});
        }
    }
};

/**
 * 采购订单 — 新增页
 */
const PurchaseAddPage = {
    template: '\
    <div class="page-card">\
        <div class="page-header">\
            <h3>新增采购订单</h3>\
            <el-button @click="$router.back()">返回</el-button>\
        </div>\
        <el-form :model="form" :rules="rules" ref="formRef" label-width="100px" style="max-width:700px">\
            <el-form-item label="供应商" prop="supplierId">\
                <el-select v-model="form.supplierId" style="width:100%">\
                    <el-option v-for="s in suppliers" :key="s.supplierId" :label="s.supplierName" :value="s.supplierId"></el-option>\
                </el-select>\
            </el-form-item>\
            <el-form-item label="订单明细">\
                <el-button type="primary" size="small" @click="addItem">添加商品</el-button>\
                <el-table :data="form.orderItems" border size="small" style="margin-top:10px" empty-text="请添加商品">\
                    <el-table-column label="商品" min-width="180">\
                        <template #default="{row}">\
                            <el-select v-model="row.productId" size="small" style="width:100%" @change="onProductChange(row)">\
                                <el-option v-for="p in products" :key="p.productId" :label="p.productName" :value="p.productId"></el-option>\
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
            form: { supplierId: null, orderItems: [] },
            suppliers: [], products: [], submitting: false,
            rules: { supplierId: [{ required: true, message: '请选择供应商', trigger: 'change' }] }
        };
    },
    computed: {
        totalAmount: function() {
            var sum = 0;
            this.form.orderItems.forEach(function(item) { sum += item.price * item.quantity; });
            return sum.toFixed(2);
        }
    },
    created: function() { this.loadSuppliers(); this.loadProducts(); },
    methods: {
        loadSuppliers: function() {
            var self = this;
            api.getAllSuppliers().then(function(res) { if (res.code === 200) self.suppliers = res.data; });
        },
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
            api.addPurchase(self.form).then(function(res) {
                self.submitting = false;
                if (res.code === 200) { ElementPlus.ElMessage.success(res.msg); self.$router.push('/purchase'); }
                else ElementPlus.ElMessage.error(res.msg);
            }).catch(function() { self.submitting = false; });
        }
    }
};

/**
 * 采购订单 — 详情页
 */
const PurchaseDetailPage = {
    template: '\
    <div class="page-card">\
        <div class="page-header">\
            <h3>采购订单详情</h3>\
            <el-button @click="$router.back()">返回</el-button>\
        </div>\
        <el-descriptions :column="2" border>\
            <el-descriptions-item label="订单号">{{ order.orderNo }}</el-descriptions-item>\
            <el-descriptions-item label="供应商">{{ order.supplierName }}</el-descriptions-item>\
            <el-descriptions-item label="总金额">¥{{ order.totalAmount }}</el-descriptions-item>\
            <el-descriptions-item label="状态">\
                <el-tag :type="order.orderStatus===0?\'warning\':order.orderStatus===1?\'success\':\'danger\'">\
                    {{ [\'待审核\',\'已通过\',\'已驳回\'][order.orderStatus] }}\
                </el-tag>\
            </el-descriptions-item>\
            <el-descriptions-item label="创建人">{{ order.createUserName }}</el-descriptions-item>\
            <el-descriptions-item label="创建时间">{{ $formatTime(order.createTime) }}</el-descriptions-item>\
        </el-descriptions>\
        <div class="order-items">\
            <h4>订单明细</h4>\
            <el-table :data="order.orderItems || []" border empty-text="暂无明细">\
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
            var id = self.$route.params.id;
            api.getPurchaseById(id).then(function(res) {
                if (res.code === 200) self.order = res.data;
            });
        }
    }
};
