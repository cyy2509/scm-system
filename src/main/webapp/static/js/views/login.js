/**
 * 登录页 — v4.0 商务去AI化
 * 真实B端供应链后台风格：硬阴影、偏移布局、角色化测试账号
 */
const LoginPage = {
    template: '\
    <div class="login-wrapper" @mousemove="onParallax">\
        <div class="login-bg-decor"></div>\
        <div class="login-card-wrap">\
            <div class="login-card">\
                <div class="login-card-bar"></div>\
                <div class="login-card-body">\
                    <!-- 标题区 -->\
                    <div class="login-title-area">\
                        <div class="login-brand-icon">\
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2357c6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\
                                <rect x="2" y="7" width="20" height="14" rx="2"/>\
                                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>\
                            </svg>\
                        </div>\
                        <h2 class="login-title">百货中心供应链管理系统</h2>\
                        <p class="login-subtitle">供应链进销存综合管理平台</p>\
                    </div>\
\
                    <!-- 错误提示 -->\
                    <div class="login-alert" v-if="errorMsg">\
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#E74C3C"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>\
                        <span>{{ errorMsg }}</span>\
                    </div>\
\
                    <!-- 表单 -->\
                    <form @submit.prevent="handleLogin">\
                        <!-- 用户名 -->\
                        <div class="login-field" :class="{ hasErr: fieldErrors.username }">\
                            <div class="login-input-row">\
                                <span class="login-input-icon">\
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">\
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>\
                                    </svg>\
                                </span>\
                                <input v-model="form.username" type="text" placeholder="请输入用户名"\
                                    @focus="clearFieldError(\'username\')" @input="clearFieldError(\'username\')"\
                                    @keyup.enter="handleLogin" autocomplete="username">\
                            </div>\
                            <span class="login-field-err" v-if="fieldErrors.username">{{ fieldErrors.username }}</span>\
                        </div>\
\
                        <!-- 密码 -->\
                        <div class="login-field" :class="{ hasErr: fieldErrors.password }">\
                            <div class="login-input-row">\
                                <span class="login-input-icon">\
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">\
                                        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>\
                                    </svg>\
                                </span>\
                                <input v-model="form.password" :type="showPwd ? \'text\' : \'password\'" placeholder="请输入密码"\
                                    @focus="clearFieldError(\'password\')" @input="clearFieldError(\'password\')"\
                                    @keyup.enter="handleLogin" autocomplete="current-password">\
                                <button type="button" class="login-eye-btn" @click="showPwd=!showPwd" tabindex="-1">\
                                    <!-- 闭眼 -->\
                                    <svg v-if="!showPwd" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">\
                                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>\
                                        <line x1="2" y1="2" x2="22" y2="22"/>\
                                    </svg>\
                                    <!-- 睁眼 -->\
                                    <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">\
                                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3" fill="currentColor"/>\
                                    </svg>\
                                </button>\
                            </div>\
                            <span class="login-field-err" v-if="fieldErrors.password">{{ fieldErrors.password }}</span>\
                        </div>\
\
                        <!-- 登录按钮 -->\
                        <button type="submit" class="login-submit-btn" :disabled="loading" :class="{ loading: loading }">\
                            <svg v-if="loading" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="spin-icon">\
                                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>\
                            </svg>\
                            <span>{{ loading ? \'登录中…\' : \'登 录\' }}</span>\
                        </button>\
                    </form>\
\
                    <!-- 测试账号 -->\
                    <div class="login-test-accounts">\
                        <div class="test-label">测试账号</div>\
                        <div class="test-row" v-for="acct in testAccounts" :key="acct.user" @click="quickLogin(acct.user, acct.pwd)">\
                            <span class="test-role">{{ acct.role }}</span>\
                            <span class="test-cred">{{ acct.user }} / {{ acct.pwd }}</span>\
                        </div>\
                        <div class="test-note">仅内部测试环境使用</div>\
                    </div>\
                </div>\
            </div>\
        </div>\
        <!-- 版权 -->\
        <div class="login-copyright">\
            &copy;2026 百货中心供应链管理部 版权所有\
        </div>\
    </div>',
    data: function() {
        return {
            form: { username: 'admin', password: '123456' },
            loading: false,
            errorMsg: '',
            fieldErrors: { username: '', password: '' },
            showPwd: false,
            testAccounts: [
                { role: '管理员', user: 'admin', pwd: '123456' },
                { role: '采购部', user: 'caigou', pwd: '123456' },
                { role: '销售部', user: 'xiaoshou', pwd: '123456' }
            ]
        };
    },
    methods: {
        clearFieldError: function(field) {
            this.fieldErrors[field] = '';
            this.errorMsg = '';
        },
        onParallax: function(e) {
            var x = (e.clientX / window.innerWidth - 0.5) * 4;
            var y = (e.clientY / window.innerHeight - 0.5) * 4;
            var bg = this.$el.querySelector('.login-bg-decor');
            if (bg) {
                bg.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
            }
        },
        quickLogin: function(u, p) {
            this.form.username = u;
            this.form.password = p;
            this.errorMsg = '';
            this.fieldErrors = { username: '', password: '' };
        },
        handleLogin: function() {
            var self = this;
            var hasErr = false;
            self.fieldErrors = { username: '', password: '' };
            self.errorMsg = '';

            if (!self.form.username.trim()) {
                self.fieldErrors.username = '请输入用户名';
                hasErr = true;
            }
            if (!self.form.password) {
                self.fieldErrors.password = '请输入密码';
                hasErr = true;
            }
            if (hasErr) return;

            self.loading = true;
            self.errorMsg = '';
            api.login(self.form.username, self.form.password).then(function(res) {
                self.loading = false;
                if (res.code === 200) {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('userInfo', JSON.stringify({
                        userId: res.data.userId,
                        username: res.data.username,
                        realName: res.data.realName,
                        roleName: res.data.roleName
                    }));
                    self.$router.push('/dashboard');
                } else {
                    self.errorMsg = res.msg || '用户名或密码错误';
                }
            }).catch(function(err) {
                self.loading = false;
                // 优先用error handler包装的msg，其次用响应里的msg
                var errMsg = (err && err.msg) || (err && err.response && err.response.data && err.response.data.msg);
                self.errorMsg = errMsg || '网络错误，请稍后重试';
            });
        }
    }
};
