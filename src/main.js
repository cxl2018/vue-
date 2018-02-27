
/* 引入vue的文件 */
import Vue from "vue";
import App from "./component/App.vue";

/* 将路由的js组件导入到这里 */
import vueRouter from "./router/index.js"
/* 创建一个vue实例 */
 new Vue({
    el:"#app",
    /* 将路由注入到vue实例中 */
     router: vueRouter,
    render: h=>h(App)
})