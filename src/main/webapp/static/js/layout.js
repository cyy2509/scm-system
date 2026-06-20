/**
 * 主布局组件
 */
const LayoutPage = {
    template: '\
    <div class="layout">\
        <div class="layout-sidebar">\
            <div class="logo">百货中心 SCM</div>\
            <el-menu\
                :default-active="activeMenu"\
                :router="true"\
                background-color="#304156"\
                text-color="#bfcbd9"\
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
                <span style="font-size: 16px; color: #303133;">{{ currentTitle }}</span>\
                <div style="display: flex; align-items: center; gap: 15px;">\
                    <span style="color: #606266;">{{ userInfo.realName }}（{{ userInfo.roleName }}）</span>\
                    <el-button type="danger" size="small" @click="handleLogout">退出</el-button>\
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
            if (path.match(/^\/(purchase|sales)\/\d+$/)) {
                return path.substring(0, path.lastIndexOf('/'));
            }
            if (path.match(/^\/(purchase|sales)\/add$/)) {
                return path.substring(0, path.lastIndexOf('/'));
            }
            return path;
        },
        currentTitle: function() {
            var meta = this.$route.meta;
            return meta ? meta.title || '' : '';
        }
    },
    created: function() {
        var info = localStorage.getItem('userInfo');
        if (info) {
            try { this.userInfo = JSON.parse(info); } catch(e) {}
        }
    },
    methods: {
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
