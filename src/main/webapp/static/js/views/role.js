/**
 * 角色管理页面
 */
const RolePage = {
    template: '\
    <div class="page-card">\
        <div class="page-header">\
            <h3>角色管理</h3>\
            <el-button type="primary" @click="showAdd">新增角色</el-button>\
        </div>\
        <el-table :data="page.list" v-loading="loading" border stripe>\
            <el-table-column prop="roleId" label="ID" width="60"></el-table-column>\
            <el-table-column prop="roleName" label="角色名称" width="150"></el-table-column>\
            <el-table-column prop="roleDesc" label="描述"></el-table-column>\
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
        <el-dialog v-model="dialogVisible" :title="isEdit?\'编辑角色\':\'新增角色\'" width="400px">\
            <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">\
                <el-form-item label="角色名" prop="roleName">\
                    <el-input v-model="form.roleName"></el-input>\
                </el-form-item>\
                <el-form-item label="描述"><el-input v-model="form.roleDesc" type="textarea"></el-input></el-form-item>\
            </el-form>\
            <template #footer>\
                <el-button @click="dialogVisible=false">取消</el-button>\
                <el-button type="primary" :loading="submitting" @click="handleSubmit">确定</el-button>\
            </template>\
        </el-dialog>\
    </div>',
    data: function() {
        return {
            query: { pageNo: 1, pageSize: 10 },
            page: { list: [], totalCount: 0 },
            loading: false, dialogVisible: false, isEdit: false, submitting: false,
            form: {},
            rules: { roleName: [{ required: true, message: '请输入角色名', trigger: 'blur' }] }
        };
    },
    created: function() { this.loadData(); },
    methods: {
        loadData: function() {
            var self = this;
            self.loading = true;
            api.getRoleList(self.query).then(function(res) {
                self.loading = false;
                if (res.code === 200) self.page = res.data;
            }).catch(function() { self.loading = false; });
        },
        showAdd: function() {
            this.isEdit = false; this.form = { roleName: '', roleDesc: '' };
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
                var fn = self.isEdit ? api.updateRole : api.addRole;
                fn(self.form).then(function(res) {
                    self.submitting = false;
                    if (res.code === 200) { ElementPlus.ElMessage.success(res.msg); self.dialogVisible = false; self.loadData(); }
                    else ElementPlus.ElMessage.error(res.msg);
                }).catch(function() { self.submitting = false; });
            });
        },
        handleDelete: function(row) {
            var self = this;
            ElementPlus.ElMessageBox.confirm('确定删除角色 ' + row.roleName + '？', '提示', { type: 'warning' })
                .then(function() {
                    api.deleteRole(row.roleId).then(function(res) {
                        if (res.code === 200) { ElementPlus.ElMessage.success(res.msg); self.loadData(); }
                        else ElementPlus.ElMessage.error(res.msg);
                    });
                }).catch(function() {});
        }
    }
};
