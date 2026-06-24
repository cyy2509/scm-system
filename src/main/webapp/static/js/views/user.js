/**
 * 用户管理页面
 */
const UserPage = {
    template: '\
    <div class="page-card">\
        <div class="page-header">\
            <h3>用户管理</h3>\
            <el-button type="primary" @click="showAdd">新增用户</el-button>\
        </div>\
        <div class="search-bar">\
            <el-input v-model="query.keyword" placeholder="搜索用户名/姓名" clearable style="width:200px" @clear="loadData" @keyup.enter="loadData"></el-input>\
            <el-select v-model="query.roleId" placeholder="选择角色" clearable style="width:160px" @change="loadData">\
                <el-option v-for="r in roles" :key="r.roleId" :label="r.roleName" :value="r.roleId"></el-option>\
            </el-select>\
            <el-button type="primary" @click="loadData">搜索</el-button>\
            <el-button @click="resetQuery">重置</el-button>\
        </div>\
        <el-table :data="page.list" v-loading="loading" border stripe empty-text="暂无数据">\
            <el-table-column prop="userId" label="ID" width="60"></el-table-column>\
            <el-table-column prop="username" label="用户名" width="120"></el-table-column>\
            <el-table-column prop="realName" label="姓名" width="100"></el-table-column>\
            <el-table-column prop="roleName" label="角色" width="120"></el-table-column>\
            <el-table-column prop="phone" label="电话" width="130"></el-table-column>\
            <el-table-column prop="email" label="邮箱"></el-table-column>\
            <el-table-column label="状态" width="80">\
                <template #default="{row}">\
                    <el-tag :type="row.status===1?\'success\':\'danger\'" size="small">{{ row.status===1?\'启用\':\'禁用\' }}</el-tag>\
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
        <div class="pagination-bar">\
            <span class="pagination-total">共 {{ page.totalCount }} 条记录</span>\
            <el-pagination background layout="total, sizes, prev, pager, next" :page-sizes="[10,20,50]" :total="page.totalCount" :page-size="query.pageSize" v-model:current-page="query.pageNo" @current-change="loadData" @size-change="onPageSizeChange"></el-pagination>\
        </div>\
        <!-- 新增/编辑弹窗 -->\
        <el-dialog v-model="dialogVisible" :title="isEdit?\'编辑用户\':\'新增用户\'" width="500px">\
            <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">\
                <el-form-item label="用户名" prop="username">\
                    <el-input v-model="form.username" :disabled="isEdit"></el-input>\
                </el-form-item>\
                <el-form-item label="姓名" prop="realName">\
                    <el-input v-model="form.realName"></el-input>\
                </el-form-item>\
                <el-form-item label="密码" prop="password" v-if="!isEdit">\
                    <el-input v-model="form.password" type="password" show-password></el-input>\
                </el-form-item>\
                <el-form-item label="角色" prop="roleId">\
                    <el-select v-model="form.roleId" style="width:100%">\
                        <el-option v-for="r in roles" :key="r.roleId" :label="r.roleName" :value="r.roleId"></el-option>\
                    </el-select>\
                </el-form-item>\
                <el-form-item label="电话"><el-input v-model="form.phone"></el-input></el-form-item>\
                <el-form-item label="邮箱"><el-input v-model="form.email"></el-input></el-form-item>\
                <el-form-item label="状态">\
                    <el-switch v-model="form.status" :active-value="1" :inactive-value="0"></el-switch>\
                </el-form-item>\
            </el-form>\
            <template #footer>\
                <el-button @click="dialogVisible=false">取消</el-button>\
                <el-button type="primary" :loading="submitting" @click="handleSubmit">确定</el-button>\
            </template>\
        </el-dialog>\
    </div>',
    data: function() {
        return {
            query: { pageNo: 1, pageSize: 10, keyword: '', roleId: null },
            page: { list: [], totalCount: 0 },
            roles: [],
            loading: false,
            dialogVisible: false,
            isEdit: false,
            submitting: false,
            form: {},
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                realName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                roleId: [{ required: true, message: '请选择角色', trigger: 'change' }]
            }
        };
    },
    created: function() { this.loadRoles(); this.loadData(); },
    methods: {
        resetQuery: function() {
            this.query = { pageNo: 1, pageSize: this.query.pageSize, keyword: '', roleId: null };
            this.loadData();
        },
        onPageSizeChange: function(size) {
            this.query.pageSize = size;
            this.query.pageNo = 1;
            this.loadData();
        },
        loadRoles: function() {
            var self = this;
            api.getUserRoles().then(function(res) { if (res.code === 200) self.roles = res.data; });
        },
        loadData: function() {
            var self = this;
            self.loading = true;
            api.getUserList(self.query).then(function(res) {
                self.loading = false;
                if (res.code === 200) self.page = res.data;
            }).catch(function() { self.loading = false; });
        },
        showAdd: function() {
            this.isEdit = false;
            this.form = { username: '', realName: '', password: '', roleId: null, phone: '', email: '', status: 1 };
            this.dialogVisible = true;
            this.$nextTick(function() { this.$refs.formRef && this.$refs.formRef.clearValidate(); });
        },
        showEdit: function(row) {
            this.isEdit = true;
            this.form = Object.assign({}, row);
            this.dialogVisible = true;
            this.$nextTick(function() { this.$refs.formRef && this.$refs.formRef.clearValidate(); });
        },
        handleSubmit: function() {
            var self = this;
            self.$refs.formRef.validate(function(valid) {
                if (!valid) return;
                self.submitting = true;
                var fn = self.isEdit ? api.updateUser : api.addUser;
                fn(self.form).then(function(res) {
                    self.submitting = false;
                    if (res.code === 200) {
                        ElementPlus.ElMessage.success(res.msg);
                        self.dialogVisible = false;
                        self.loadData();
                    } else {
                        ElementPlus.ElMessage.error(res.msg);
                    }
                }).catch(function() { self.submitting = false; });
            });
        },
        handleDelete: function(row) {
            var self = this;
            ElementPlus.ElMessageBox.confirm('确定删除用户 ' + row.realName + '？', '提示', { type: 'warning' })
                .then(function() {
                    api.deleteUser(row.userId).then(function(res) {
                        if (res.code === 200) { ElementPlus.ElMessage.success(res.msg); self.loadData(); }
                        else ElementPlus.ElMessage.error(res.msg);
                    });
                }).catch(function() {});
        }
    }
};
