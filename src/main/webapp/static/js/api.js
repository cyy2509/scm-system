/**
 * API 请求封装
 * 使用 Axios，自动携带 JWT token
 */

// 获取上下文路径（部署在 /scm-system/ 下时自动适配）
const ctx = (function() {
    const base = document.querySelector('base');
    if (base) return base.getAttribute('href') || '';
    // 从当前页面路径推断
    const path = window.location.pathname;
    // 如果路径以 /index.html 或 / 结尾，取前面的部分
    const match = path.match(/^(.*?)(\/index\.html)?$/);
    return match ? match[1] : '';
})();

// 创建 Axios 实例
const http = axios.create({
    baseURL: ctx + '/api',
    timeout: 15000,
    headers: { 'Content-Type': 'application/json' }
});

// 请求拦截器：自动携带 token
http.interceptors.request.use(function(config) {
    var token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
});

// 响应拦截器：统一处理错误
http.interceptors.response.use(function(response) {
    var data = response.data;
    // 401 未登录 → 跳转登录页
    if (data.code === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        window.location.hash = '#/login';
        ElementPlus.ElMessage.error(data.msg || '请先登录');
        return Promise.reject(data);
    }
    return data;
}, function(error) {
    ElementPlus.ElMessage.error('网络错误，请稍后重试');
    return Promise.reject(error);
});

/**
 * API 接口定义
 */
const api = {
    // 登录
    login: function(username, password) {
        return http.post('/login', null, { params: { username: username, password: password } });
    },
    logout: function() {
        return http.post('/logout');
    },
    getUserInfo: function() {
        return http.get('/userinfo');
    },

    // 数据大屏
    getDashboard: function() {
        return http.get('/dashboard');
    },

    // 用户管理
    getUserList: function(params) {
        return http.get('/user/list', { params: params });
    },
    getUserRoles: function() {
        return http.get('/user/roles');
    },
    getUserById: function(id) {
        return http.get('/user/' + id);
    },
    addUser: function(data) {
        return http.post('/user/add', data);
    },
    updateUser: function(data) {
        return http.post('/user/update', data);
    },
    deleteUser: function(userId) {
        return http.post('/user/delete', null, { params: { userId: userId } });
    },
    updatePassword: function(data) {
        return http.post('/user/password', null, { params: data });
    },

    // 角色管理
    getRoleList: function(params) {
        return http.get('/role/list', { params: params });
    },
    getAllRoles: function() {
        return http.get('/role/all');
    },
    addRole: function(data) {
        return http.post('/role/add', data);
    },
    updateRole: function(data) {
        return http.post('/role/update', data);
    },
    deleteRole: function(roleId) {
        return http.post('/role/delete', null, { params: { roleId: roleId } });
    },

    // 供应商管理
    getSupplierList: function(params) {
        return http.get('/supplier/list', { params: params });
    },
    getAllSuppliers: function() {
        return http.get('/supplier/all');
    },
    addSupplier: function(data) {
        return http.post('/supplier/add', data);
    },
    updateSupplier: function(data) {
        return http.post('/supplier/update', data);
    },
    deleteSupplier: function(supplierId) {
        return http.post('/supplier/delete', null, { params: { supplierId: supplierId } });
    },

    // 商品管理
    getProductList: function(params) {
        return http.get('/product/list', { params: params });
    },
    getCategories: function() {
        return http.get('/product/categories');
    },
    getAllProducts: function() {
        return http.get('/product/all');
    },
    getProductById: function(id) {
        return http.get('/product/' + id);
    },
    addProduct: function(formData) {
        return http.post('/product/add', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    },
    updateProduct: function(formData) {
        return http.post('/product/update', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    },
    deleteProduct: function(productId) {
        return http.post('/product/delete', null, { params: { productId: productId } });
    },

    // 采购订单
    getPurchaseList: function(params) {
        return http.get('/purchase/list', { params: params });
    },
    getPurchaseSuppliers: function() {
        return http.get('/purchase/suppliers');
    },
    getPurchaseById: function(id) {
        return http.get('/purchase/' + id);
    },
    addPurchase: function(data) {
        return http.post('/purchase/add', data);
    },
    auditPurchase: function(orderId, status) {
        return http.post('/purchase/audit', null, { params: { orderId: orderId, status: status } });
    },
    deletePurchase: function(orderId) {
        return http.post('/purchase/delete', null, { params: { orderId: orderId } });
    },

    // 销售订单
    getSalesList: function(params) {
        return http.get('/sales/list', { params: params });
    },
    getSalesById: function(id) {
        return http.get('/sales/' + id);
    },
    addSales: function(data) {
        return http.post('/sales/add', data);
    },
    deleteSales: function(orderId) {
        return http.post('/sales/delete', null, { params: { orderId: orderId } });
    },

    // 新闻公告
    getNewsList: function(params) {
        return http.get('/news/list', { params: params });
    },
    getNewsById: function(id) {
        return http.get('/news/' + id);
    },
    addNews: function(data) {
        return http.post('/news/add', data);
    },
    updateNews: function(data) {
        return http.post('/news/update', data);
    },
    deleteNews: function(newsId) {
        return http.post('/news/delete', null, { params: { newsId: newsId } });
    },

    // 操作日志
    getLogList: function(params) {
        return http.get('/log/list', { params: params });
    }
};
