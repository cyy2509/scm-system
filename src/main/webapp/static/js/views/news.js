/**
 * 新闻公告页面
 */
const NewsPage = {
    template: '\
    <div class="page-card">\
        <div class="page-header">\
            <h3>新闻公告</h3>\
            <el-button type="primary" @click="showAdd">发布公告</el-button>\
        </div>\
        <div class="search-bar">\
            <el-input v-model="query.keyword" placeholder="搜索标题/内容" clearable style="width:200px" @clear="loadData" @keyup.enter="loadData"></el-input>\
            <el-button type="primary" @click="loadData">搜索</el-button>\
            <el-button @click="resetQuery">重置</el-button>\
        </div>\
        <el-table :data="page.list" v-loading="loading" border stripe empty-text="暂无数据">\
            <el-table-column prop="newsId" label="ID" width="60"></el-table-column>\
            <el-table-column prop="title" label="标题"></el-table-column>\
            <el-table-column prop="author" label="作者" width="100"></el-table-column>\
            <el-table-column label="发布时间" width="160"><template #default="{row}">{{ $formatTime(row.createTime) }}</template></el-table-column>\
            <el-table-column label="操作" width="200" fixed="right">\
                <template #default="{row}">\
                    <div class="table-actions">\
                        <el-button type="primary" link size="small" @click="showDetail(row)">查看</el-button>\
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
        <!-- 详情弹窗 -->\
        <el-dialog v-model="detailVisible" title="新闻详情" width="600px">\
            <h3 class="news-title" style="margin-bottom:6px;font-size:18px">{{ detail.title }}</h3>\
            <div class="news-meta">{{ detail.author }} · {{ $formatTime(detail.createTime) }}</div>\
            <div class="news-content">{{ detail.content }}</div>\
        </el-dialog>\
        <!-- 新增/编辑弹窗 -->\
        <el-dialog v-model="dialogVisible" :title="isEdit?\'编辑公告\':\'发布公告\'" width="600px">\
            <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">\
                <el-form-item label="标题" prop="title"><el-input v-model="form.title"></el-input></el-form-item>\
                <el-form-item label="内容" prop="content"><el-input v-model="form.content" type="textarea" :rows="8"></el-input></el-form-item>\
            </el-form>\
            <template #footer>\
                <el-button @click="dialogVisible=false">取消</el-button>\
                <el-button type="primary" :loading="submitting" @click="handleSubmit">确定</el-button>\
            </template>\
        </el-dialog>\
    </div>',
    data: function() {
        return {
            query: { pageNo: 1, pageSize: 10, keyword: '' },
            page: { list: [], totalCount: 0 },
            loading: false, dialogVisible: false, detailVisible: false,
            isEdit: false, submitting: false,
            form: {}, detail: {},
            rules: {
                title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
                content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
            }
        };
    },
    created: function() { this.loadData(); },
    methods: {
        resetQuery: function() {
            this.query = { pageNo: 1, pageSize: this.query.pageSize, keyword: '' };
            this.loadData();
        },
        onPageSizeChange: function(size) {
            this.query.pageSize = size;
            this.query.pageNo = 1;
            this.loadData();
        },
        loadData: function() {
            var self = this;
            self.loading = true;
            api.getNewsList(self.query).then(function(res) {
                self.loading = false;
                if (res.code === 200) self.page = res.data;
            }).catch(function() { self.loading = false; });
        },
        showDetail: function(row) {
            var self = this;
            api.getNewsById(row.newsId).then(function(res) {
                if (res.code === 200) { self.detail = res.data; self.detailVisible = true; }
            });
        },
        showAdd: function() {
            this.isEdit = false;
            this.form = { title: '', content: '' };
            this.dialogVisible = true;
        },
        showEdit: function(row) {
            var self = this;
            api.getNewsById(row.newsId).then(function(res) {
                if (res.code === 200) {
                    self.isEdit = true;
                    self.form = Object.assign({}, res.data);
                    self.dialogVisible = true;
                }
            });
        },
        handleSubmit: function() {
            var self = this;
            self.$refs.formRef.validate(function(valid) {
                if (!valid) return;
                self.submitting = true;
                var fn = self.isEdit ? api.updateNews : api.addNews;
                fn(self.form).then(function(res) {
                    self.submitting = false;
                    if (res.code === 200) { ElementPlus.ElMessage.success(res.msg); self.dialogVisible = false; self.loadData(); }
                    else ElementPlus.ElMessage.error(res.msg);
                }).catch(function() { self.submitting = false; });
            });
        },
        handleDelete: function(row) {
            var self = this;
            ElementPlus.ElMessageBox.confirm('确定删除公告「' + row.title + '」？', '提示', { type: 'warning' })
                .then(function() {
                    api.deleteNews(row.newsId).then(function(res) {
                        if (res.code === 200) { ElementPlus.ElMessage.success(res.msg); self.loadData(); }
                        else ElementPlus.ElMessage.error(res.msg);
                    });
                }).catch(function() {});
        }
    }
};
