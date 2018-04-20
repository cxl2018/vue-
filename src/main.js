
/* 引入vue的文件 */
import Vue from "vue";
import App from "./component/App.vue";
/* 引入登录页面的css我们自己写的文件 */
import "./less/index.less"
/* 引入ui文件 */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

/* 启用 */
Vue.use(ElementUI)

/* 安裝后导入类库，为了让初始化默认统一样式 */
import 'normalize.css'
/* 引入excios,导入的是默认的 */
import axios from "axios"
/* 引入api */
import api, {domain} from "./js/api.js"



/* 将路由的js组件导入到这里 */
import vueRouter from "./router/index.js"


/* 配置默认域名，这样请求的时候就不用在url里每次手动加域名了 */
axios.defaults.baseURL = domain;
/* console.log("------");
console.log(this.axios);  */
/* 因为调用的接口跨域了，默认情况下接口给我们设置cookie无效，为了让它有效，我们必须添加此配置 */
axios.defaults.withCredentials = true;
/* 为了使用方便，把axios和api添加到vue原型中，将来vue组件就可以直接使用 */
Vue.prototype.$http = axios;
Vue.prototype.$api = api;
/* 创建一个vue实例 */
 new Vue({
    el:"#app",
    /* 将路由注入到vue实例中 */
     router: vueRouter,
    render: h=>h(App)

})