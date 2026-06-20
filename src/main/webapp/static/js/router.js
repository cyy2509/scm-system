/**
 * Vue Router 路由配置
 */
const routes = [
    { path: '/login', component: LoginPage, meta: { title: '登录' } },
    {
        path: '/', component: LayoutPage, redirect: '/dashboard',
        children: [
            { path: 'dashboard', component: DashboardPage, meta: { title: '数据大屏', icon: 'Odometer' } },
            { path: 'user', component: UserPage, meta: { title: '用户管理', icon: 'User' } },
            { path: 'role', component: RolePage, meta: { title: '角色管理', icon: 'UserFilled' } },
            { path: 'supplier', component: SupplierPage, meta: { title: '供应商管理', icon: 'Van' } },
            { path: 'product', component: ProductPage, meta: { title: '商品管理', icon: 'ShoppingBag' } },
            { path: 'purchase', component: PurchasePage, meta: { title: '采购订单', icon: 'ShoppingCart' } },
            { path: 'purchase/add', component: PurchaseAddPage, meta: { title: '新增采购', icon: 'ShoppingCart' } },
            { path: 'purchase/:id', component: PurchaseDetailPage, meta: { title: '采购详情', icon: 'ShoppingCart' } },
            { path: 'sales', component: SalesPage, meta: { title: '销售订单', icon: 'Money' } },
            { path: 'sales/add', component: SalesAddPage, meta: { title: '新增销售', icon: 'Money' } },
            { path: 'sales/:id', component: SalesDetailPage, meta: { title: '销售详情', icon: 'Money' } },
            { path: 'news', component: NewsPage, meta: { title: '新闻公告', icon: 'Document' } },
            { path: 'log', component: LogPage, meta: { title: '操作日志', icon: 'Notebook' } },
        ]
    },
    { path: '/:pathMatch(.*)*', redirect: '/dashboard' }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: routes
});

// 路由守卫：检查登录状态
router.beforeEach(function(to, from, next) {
    var token = localStorage.getItem('token');
    if (to.path === '/login') {
        if (token) {
            next('/dashboard');
        } else {
            next();
        }
    } else {
        if (token) {
            next();
        } else {
            next('/login');
        }
    }
});
