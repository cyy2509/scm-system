/**
 * 供应商管理页面
 */
const SupplierPage = {
    template: '\
    <div class="page-card">\
        <div class="page-header">\
            <h3>供应商管理</h3>\
            <el-button type="primary" @click="showAdd">新增供应商</el-button>\
        </div>\
        <div class="search-bar">\
            <el-input v-model="query.keyword" placeholder="搜索供应商名称" clearable style="width:200px" @clear="loadData" @keyup.enter="loadData"></el-input>\
            <el-input v-model="query.contact" placeholder="搜索联系人" clearable style="width:160px" @clear="loadData" @keyup.enter="loadData"></el-input>\
            <el-button type="primary" @click="loadData">搜索</el-button>\
        </div>\
        <el-table :data="page.list" v-loading="loading" border stripe>\
            <el-table-column prop="supplierId" label="ID" width="60"></el-table-column>\
            <el-table-column prop="supplierName" label="供应商名称"></el-table-column>\
            <el-table-column prop="contact" label="联系人" width="100"></el-table-column>\
            <el-table-column prop="phone" label="电话" width="130"></el-table-column>\
            <el-table-column prop="address" label="地址"></el-table-column>\
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
        <el-dialog v-model="dialogVisible" :title="isEdit?\'编辑供应商\':\'新增供应商\'" width="500px">\
            <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">\
                <el-form-item label="名称" prop="supplierName"><el-input v-model="form.supplierName"></el-input></el-form-item>\
                <el-form-item label="联系人" prop="contact"><el-input v-model="form.contact"></el-input></el-form-item>\
                <el-form-item label="电话"><el-input v-model="form.phone"></el-input></el-form-item>\
                <el-form-item label="地址"><el-input v-model="form.address"></el-input></el-form-item>\
                <el-form-item label="备注"><el-input v-model="form.remark" type="textarea"></el-input></el-form-item>\
            </el-form>\
            <template #footer>\
                <el-button @click="dialogVisible=false">取消</el-button>\
                <el-button type="primary" :loading="submitting" @click="handleSubmit">确定</el-button>\
            </template>\
        </el-dialog>\
    </div>',
    data: function() {
        return {
            query: { pageNo: 1, pageSize: 10, keyword: '', contact: '' },
            page: { list: [], totalCount: 0 },
            loading: false, dialogVisible: false, isEdit: false, submitting: false,
            form: {},
            rules: { supplierName: [{ required: true, message: '请输入供应商名称', trigger: 'blur' }] }
        };
    },
    created: function() { this.loadData(); },
    methods: {
        loadData: function() {
            var self = this;
            self.loading = true;
            api.getSupplierList(self.query).then(function(res) {
                self.loading = false;
                if (res.code === 200) self.page = res.data;
            }).catch(function() { self.loading = false; });
        },
        showAdd: function() {
            this.isEdit = false;
            this.form = { supplierName: '', contact: '', phone: '', address: '', remark: '' };
            this.dialogVisible = true;
        },
        showEdit: function(row) {
            this.isEdit = true; this.form = Object.assign({}, row);
            this.dialogVisible = true;
        },
        handleSubmit: function() {
            var self = this;
            self.$refs.formRef.validate(function(valid) {
                if (!valid) return;
                self.submitting = true;
                var fn = self.isEdit ? api.updateSupplier : api.addSupplier;
                fn(self.form).then(function(res) {
                    self.submitting = false;
                    if (res.code === 200) { ElementPlus.ElMessage.success(res.msg); self.dialogVisible = false; self.loadData(); }
                    else ElementPlus.ElMessage.error(res.msg);
                }).catch(function() { self.submitting = false; });
            });
        },
        handleDelete: function(row) {
            var self = this;
            ElementPlus.ElMessageBox.confirm('确定删除供应商 ' + row.supplierName + '？', '提示', { type: 'warning' })
                .then(function() {
                    api.deleteSupplier(row.supplierId).then(function(res) {
                        if (res.code === 200) { ElementPlus.ElMessage.success(res.msg); self.loadData(); }
                        else ElementPlus.ElMessage.error(res.msg);
                    });
                }).catch(function() {});
        }
    }
};
