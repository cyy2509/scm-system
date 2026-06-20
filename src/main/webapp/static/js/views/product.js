/**
 * 商品管理页面
 */
const ProductPage = {
    template: '\
    <div class="page-card">\
        <div class="page-header">\
            <h3>商品管理</h3>\
            <el-button type="primary" @click="showAdd">新增商品</el-button>\
        </div>\
        <div class="search-bar">\
            <el-input v-model="query.keyword" placeholder="搜索商品名称" clearable style="width:180px" @clear="loadData" @keyup.enter="loadData"></el-input>\
            <el-select v-model="query.categoryId" placeholder="选择分类" clearable style="width:140px" @change="loadData">\
                <el-option v-for="c in categories" :key="c.categoryId" :label="c.categoryName" :value="c.categoryId"></el-option>\
            </el-select>\
            <el-button type="primary" @click="loadData">搜索</el-button>\
        </div>\
        <el-table :data="page.list" v-loading="loading" border stripe>\
            <el-table-column prop="productId" label="ID" width="60"></el-table-column>\
            <el-table-column label="图片" width="80">\
                <template #default="{row}">\
                    <el-image v-if="row.imageUrl" :src="row.imageUrl" style="width:40px;height:40px;border-radius:4px" fit="cover"></el-image>\
                </template>\
            </el-table-column>\
            <el-table-column prop="productName" label="商品名称"></el-table-column>\
            <el-table-column prop="categoryName" label="分类" width="100"></el-table-column>\
            <el-table-column prop="price" label="价格" width="90"></el-table-column>\
            <el-table-column label="库存" width="90">\
                <template #default="{row}">\
                    <span :style="{color: row.stock < row.safetyStock ? \'#F56C6C\' : \'#303133\'}">{{ row.stock }}</span>\
                </template>\
            </el-table-column>\
            <el-table-column label="操作" width="160" fixed="right">\
                <template #default="{row}">\
                    <div class="table-actions">\
                        <el-button type="primary" link size="small" @click="showEdit(row)">编辑</el-button>\
                        <el-button type="danger" link size="small" @click="handleDelete(row)">删除</el-button>\
                    </div>\
                </template>\
            </el-table-column>\
        </el-table>\
        <div style="margin-top:15px;display:flex;justify-content:flex-end">\
            <el-pagination background layout="total, prev, pager, next" :total="page.totalCount" :page-size="query.pageSize" v-model:current-page="query.pageNo" @current-change="loadData"></el-pagination>\
        </div>\
        <el-dialog v-model="dialogVisible" :title="isEdit?\'编辑商品\':\'新增商品\'" width="500px">\
            <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">\
                <el-form-item label="名称" prop="productName"><el-input v-model="form.productName"></el-input></el-form-item>\
                <el-form-item label="分类" prop="categoryId">\
                    <el-select v-model="form.categoryId" style="width:100%">\
                        <el-option v-for="c in categories" :key="c.categoryId" :label="c.categoryName" :value="c.categoryId"></el-option>\
                    </el-select>\
                </el-form-item>\
                <el-form-item label="价格" prop="price"><el-input-number v-model="form.price" :min="0" :precision="2" style="width:100%"></el-input-number></el-form-item>\
                <el-form-item label="库存" prop="stock"><el-input-number v-model="form.stock" :min="0" style="width:100%"></el-input-number></el-form-item>\
                <el-form-item label="安全库存"><el-input-number v-model="form.safetyStock" :min="0" style="width:100%"></el-input-number></el-form-item>\
                <el-form-item label="图片">\
                    <input type="file" ref="fileInput" @change="onFileChange" accept="image/*">\
                </el-form-item>\
                <el-form-item label="描述"><el-input v-model="form.productDesc" type="textarea"></el-input></el-form-item>\
            </el-form>\
            <template #footer>\
                <el-button @click="dialogVisible=false">取消</el-button>\
                <el-button type="primary" :loading="submitting" @click="handleSubmit">确定</el-button>\
            </template>\
        </el-dialog>\
    </div>',
    data: function() {
        return {
            query: { pageNo: 1, pageSize: 10, keyword: '', categoryId: null },
            page: { list: [], totalCount: 0 },
            categories: [],
            loading: false, dialogVisible: false, isEdit: false, submitting: false,
            form: {}, imageFile: null,
            rules: {
                productName: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
                price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
                stock: [{ required: true, message: '请输入库存', trigger: 'blur' }]
            }
        };
    },
    created: function() { this.loadCategories(); this.loadData(); },
    methods: {
        loadCategories: function() {
            var self = this;
            api.getCategories().then(function(res) { if (res.code === 200) self.categories = res.data; });
        },
        loadData: function() {
            var self = this;
            self.loading = true;
            api.getProductList(self.query).then(function(res) {
                self.loading = false;
                if (res.code === 200) self.page = res.data;
            }).catch(function() { self.loading = false; });
        },
        showAdd: function() {
            this.isEdit = false; this.imageFile = null;
            this.form = { productName: '', categoryId: null, price: 0, stock: 0, safetyStock: 10, productDesc: '' };
            this.dialogVisible = true;
        },
        showEdit: function(row) {
            this.isEdit = true; this.imageFile = null;
            this.form = Object.assign({}, row);
            this.dialogVisible = true;
        },
        onFileChange: function(e) {
            this.imageFile = e.target.files[0];
        },
        handleSubmit: function() {
            var self = this;
            self.$refs.formRef.validate(function(valid) {
                if (!valid) return;
                self.submitting = true;
                var fd = new FormData();
                // 将 form 字段加入 FormData
                for (var key in self.form) {
                    if (self.form[key] !== null && self.form[key] !== undefined) {
                        fd.append(key, self.form[key]);
                    }
                }
                if (self.imageFile) fd.append('imageFile', self.imageFile);
                var fn = self.isEdit ? api.updateProduct : api.addProduct;
                fn(fd).then(function(res) {
                    self.submitting = false;
                    if (res.code === 200) { ElementPlus.ElMessage.success(res.msg); self.dialogVisible = false; self.loadData(); }
                    else ElementPlus.ElMessage.error(res.msg);
                }).catch(function() { self.submitting = false; });
            });
        },
        handleDelete: function(row) {
            var self = this;
            ElementPlus.ElMessageBox.confirm('确定删除商品 ' + row.productName + '？', '提示', { type: 'warning' })
                .then(function() {
                    api.deleteProduct(row.productId).then(function(res) {
                        if (res.code === 200) { ElementPlus.ElMessage.success(res.msg); self.loadData(); }
                        else ElementPlus.ElMessage.error(res.msg);
                    });
                }).catch(function() {});
        }
    }
};
