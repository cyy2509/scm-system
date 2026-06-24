/**
 * 创建 Vue 应用
 */
var app = Vue.createApp({
    template: '<router-view></router-view>'
});

// 注册 Element Plus
app.use(ElementPlus, { locale: ElementPlusLocaleZhCn });

// 注册路由
app.use(router);

// 全局时间格式化方法（解决后端返回时间戳显示为原始数字的问题）
app.config.globalProperties.$formatTime = function(val) {
    if (!val) return '';
    var d = new Date(typeof val === 'number' ? val : val);
    if (isNaN(d.getTime())) return String(val);
    var pad = function(n) { return n < 10 ? '0' + n : '' + n; };
    return d.getFullYear() + '-' + pad(d.getMonth()+1) + '-' + pad(d.getDate()) + ' '
        + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
};

// 挂载
app.mount('#app');
