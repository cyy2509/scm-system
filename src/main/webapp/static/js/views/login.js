/**
 * 登录页
 */
const LoginPage = {
    template: '\
    <div class="login-container">\
        <div class="login-card">\
            <h2>百货中心供应链管理系统</h2>\
            <el-form :model="form" :rules="rules" ref="formRef" @keyup.enter="handleLogin">\
                <el-form-item prop="username">\
                    <el-input v-model="form.username" placeholder="请输入用户名" size="large" prefix-icon="User"></el-input>\
                </el-form-item>\
                <el-form-item prop="password">\
                    <el-input v-model="form.password" type="password" placeholder="请输入密码" size="large" prefix-icon="Lock" show-password></el-input>\
                </el-form-item>\
                <el-form-item>\
                    <el-button type="primary" :loading="loading" @click="handleLogin" size="large" style="width:100%">登 录</el-button>\
                </el-form-item>\
            </el-form>\
            <div style="text-align:center;color:#909399;font-size:12px;margin-top:10px;">\
                测试账号：admin/123456 · caigou/123456 · xiaoshou/123456\
            </div>\
        </div>\
    </div>',
    data: function() {
        return {
            form: { username: 'admin', password: '123456' },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            },
            loading: false
        };
    },
    methods: {
        handleLogin: function() {
            var self = this;
            self.$refs.formRef.validate(function(valid) {
                if (!valid) return;
                self.loading = true;
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
                        ElementPlus.ElMessage.success('登录成功');
                        self.$router.push('/dashboard');
                    } else {
                        ElementPlus.ElMessage.error(res.msg);
                    }
                }).catch(function() { self.loading = false; });
            });
        }
    }
};
