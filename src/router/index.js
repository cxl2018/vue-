
/* 引入vue文件,因为路由是基于vue的插件 */
import Vue from "vue";
/* 引入路由*/
import VueRouter from "vue-router"

Vue.use(VueRouter) 
/* 引入需要路由配置的组件登录和注册 */
import Login from "../component/login/Login.vue"
import Register from "../component/register/Register.vue"

/* 创建路由，通过VueRouter()创建，需要导出配置的路由规则，到时导入到main.js中 */

 export default new VueRouter({
        /* routes是vuerouter的属性 */
        routes:[
            /* 里面的每一个对象是一个路由规则，路由规则有三个参数 */
            {name:'login',path:'/login',component:Login},
            {name:'register',path:'/register',component:Register}
        ]
    })

