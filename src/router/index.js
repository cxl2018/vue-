
/* 引入vue文件,因为路由是基于vue的插件 */
import Vue from "vue";
/* 引入路由*/
import VueRouter from "vue-router"


/* 引入需要路由配置的组件登录和后台管理 */
import Login from "../component/login/Login.vue"
import Admin from "../component/admin/Admin.vue"
/* 后台管理的子路由切换 */
import Conment from "../component/admin/good/conment/Conment.vue";
import Details from "../component/admin/good/details/Details.vue"
import List from "../component/admin/good/list/List.vue";


Vue.use(VueRouter) 
/* 创建路由，通过VueRouter()创建，需要导出配置的路由规则，到时导入到main.js中 */
const good =[
    /* 后台登录子路由的路由规则 */
    { name: "conment", path: "good/conment", component: Conment },
    { name: "details", path: "good/detail/:id", component: Details},
    { name: "list", path:"good/list",component:List}

]

let router= new VueRouter({
        /* routes是vuerouter的属性 */
        routes:[
            /* 里面的每一个对象是一个路由规则，路由规则有三个参数 */
            {name:'login',path:'/login',component:Login},
            { name: 'admin', path: '/admin', component: Admin, children: [...good]}
        ]
    })


    router.beforeEach((to, from, next)=>{

     
        Vue.prototype.$http.get(Vue.prototype.$api.islogin).then(res => {
   
            let isLogin = false;
            if (res.data.code == 'logined') {
                isLogin = true;
            }
            if (to.name == 'login') {
                if (isLogin) {
                    next({ name: 'admin' });
                } else {
                    next();
                }
            }
            if (to.name != 'login') {
                if (isLogin) {
                    next();
                } else {
                    next({ name: 'login', query: { next: to.fullPath } });
                }
            }
       
            // if (to.name == 'login' && isLogin) {
            //     next('/admin');
            // }else if (to.name != 'login' && !isLogin) {
    
            //     next({ name: 'login',query: { nextPage: to.fullPath } });
            // }
            // else {
            //     next();
            // }
        });

    })
export default router;