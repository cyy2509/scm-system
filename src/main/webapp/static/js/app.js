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

// 挂载
app.mount('#app');
