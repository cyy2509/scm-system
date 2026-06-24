/**
 * 主布局组件 — v3.0 深色侧边栏
 */
const LayoutPage = {
    template: '\
    <div class="layout">\
        <div class="layout-sidebar">\
            <div class="logo">\
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:10px;flex-shrink:0">\
                    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>\
                </svg>\
                百货中心 SCM\
            </div>\
            <el-menu\
                :default-active="activeMenu"\
                :router="true"\
                background-color="transparent"\
                text-color="rgba(255,255,255,0.6)"\
                active-text-color="#fff">\
                <el-menu-item index="/dashboard">\
                    <el-icon><component is="Odometer"/></el-icon>\
                    <span>数据大屏</span>\
                </el-menu-item>\
                <el-menu-item index="/user" v-if="hasPerm(\'user\')">\
                    <el-icon><component is="User"/></el-icon>\
                    <span>用户管理</span>\
                </el-menu-item>\
                <el-menu-item index="/role" v-if="hasPerm(\'role\')">\
                    <el-icon><component is="UserFilled"/></el-icon>\
                    <span>角色管理</span>\
                </el-menu-item>\
                <el-menu-item index="/supplier" v-if="hasPerm(\'supplier\')">\
                    <el-icon><component is="Van"/></el-icon>\
                    <span>供应商管理</span>\
                </el-menu-item>\
                <el-menu-item index="/product" v-if="hasPerm(\'product\')">\
                    <el-icon><component is="ShoppingBag"/></el-icon>\
                    <span>商品管理</span>\
                </el-menu-item>\
                <el-menu-item index="/purchase" v-if="hasPerm(\'purchase\')">\
                    <el-icon><component is="ShoppingCart"/></el-icon>\
                    <span>采购订单</span>\
                </el-menu-item>\
                <el-menu-item index="/sales" v-if="hasPerm(\'sales\')">\
                    <el-icon><component is="Money"/></el-icon>\
                    <span>销售订单</span>\
                </el-menu-item>\
                <el-menu-item index="/news" v-if="hasPerm(\'news\')">\
                    <el-icon><component is="Document"/></el-icon>\
                    <span>新闻公告</span>\
                </el-menu-item>\
                <el-menu-item index="/log" v-if="hasPerm(\'log\')">\
                    <el-icon><component is="Notebook"/></el-icon>\
                    <span>操作日志</span>\
                </el-menu-item>\
            </el-menu>\
        </div>\
        <div class="layout-main">\
            <div class="layout-header">\
                <div class="header-left">\
                    <span class="page-title">{{ currentTitle }}</span>\
                    <el-breadcrumb separator="/" class="header-breadcrumb">\
                        <el-breadcrumb-item>首页</el-breadcrumb-item>\
                        <el-breadcrumb-item v-if="parentMenu">{{ parentMenu }}</el-breadcrumb-item>\
                        <el-breadcrumb-item>{{ currentTitle }}</el-breadcrumb-item>\
                    </el-breadcrumb>\
                </div>\
                <div class="user-area">\
                    <button class="dark-toggle" @click="toggleDark" :title="isDark ? \'切至浅色模式\' : \'切至深色模式\'">\
                        <span v-if="isDark">☀️</span>\
                        <span v-else>🌙</span>\
                    </button>\
                    <el-dropdown trigger="click">\
                        <span class="user-name">\
                            <el-icon style="margin-right:6px"><component is="User"/></el-icon>\
                            {{ userInfo.realName }}（{{ userInfo.roleName }}）\
                            <el-icon style="margin-left:4px"><component is="ArrowDown"/></el-icon>\
                        </span>\
                        <template #dropdown>\
                            <el-dropdown-menu>\
                                <el-dropdown-item disabled>{{ userInfo.username }}</el-dropdown-item>\
                                <el-dropdown-item divided @click="handleLogout">\
                                    <span style="color:#F56C6C">退出登录</span>\
                                </el-dropdown-item>\
                            </el-dropdown-menu>\
                        </template>\
                    </el-dropdown>\
                </div>\
            </div>\
            <div class="layout-content">\
                <router-view></router-view>\
            </div>\
        </div>\
    </div>',
    data: function() {
        return {
            userInfo: {},
            isDark: document.documentElement.classList.contains('dark'),
            rolePermissions: {
                '经理': ['user','role','supplier','product','purchase','sales','news','log','dashboard'],
                '采购部员工': ['supplier','purchase','dashboard'],
                '销售部员工': ['sales','dashboard'],
                '物资部员工': ['product','dashboard'],
                '人事部员工': ['user','news','dashboard']
            }
        };
    },
    computed: {
        activeMenu: function() {
            var path = this.$route.path;
            var m = path.match(/^\/(purchase|sales)\/\d+$/);
            if (m) return '/' + m[1];
            if (path.match(/^\/(purchase|sales)\/add$/)) return path.substring(0, path.lastIndexOf('/'));
            return path;
        },
        currentTitle: function() {
            var meta = this.$route.meta;
            return meta ? meta.title || '' : '';
        },
        parentMenu: function() {
            var path = this.$route.path;
            // 采购/销售子页面
            if (path.indexOf('/purchase/') === 0) return '采购订单';
            if (path.indexOf('/sales/') === 0) return '销售订单';
            return '';
        }
    },
    created: function() {
        var info = localStorage.getItem('userInfo');
        if (info) {
            try { this.userInfo = JSON.parse(info); } catch(e) {}
        }
        // 读取用户暗黑模式偏好
        var savedDark = localStorage.getItem('darkMode');
        if (savedDark === 'true') {
            this.isDark = true;
            document.documentElement.classList.add('dark');
        }
    },
    methods: {
        toggleDark: function() {
            this.isDark = !this.isDark;
            if (this.isDark) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('darkMode', 'true');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('darkMode', 'false');
            }
            // 通知所有页面主题变更
            window.dispatchEvent(new CustomEvent('themechange', { detail: { dark: this.isDark } }));
        },
        hasPerm: function(module) {
            var roleName = this.userInfo.roleName;
            if (!roleName) return false;
            if (roleName === '经理') return true;
            var perms = this.rolePermissions[roleName];
            return perms ? perms.indexOf(module) >= 0 : false;
        },
        handleLogout: function() {
            var self = this;
            ElementPlus.ElMessageBox.confirm('确定退出登录？', '提示', { type: 'warning' })
                .then(function() {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userInfo');
                    self.$router.push('/login');
                })
                .catch(function() {});
        }
    }
};
