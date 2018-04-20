<template>
      <!-- 变化后的子路由的页面 -->     
   <div class="gg_content">
       <el-container >
           <!-- 侧边 -->
        <el-aside width="200px">
            <app-aside></app-aside>
        </el-aside>
        <el-container>
            <!-- 头部共用 -->
            <el-header>
                <app-header></app-header>
            </el-header>
            <!-- 主体-->
            <el-main>
                 <router-view></router-view>
            </el-main>
        </el-container>
        </el-container>
   </div>
</template>
<script>

/* 共用头部和左侧组件的引入 ,这个是固定的，并不会进行页面切换，所以这是父组件里面的子组件
在父组件里面创建子组件，首先创建子组件，因为在webpack里面是通过创建vue文件，相当于创建子组件
所以这里导入就相当于创建子组件*/
import Header from "./subcom/Header.vue";
import Aside from "./subcom/Aside.vue"
/* 创建子组件，需要通过一个属性，components{在里面写要写的东西} */
export default {
  data () {
      return {
         
      }
  },
  /* 注册子组件 */
  components: {
      appHeader:Header,
      appAside:Aside
  }
}

</script>
<style scoped land="less">
    .gg_content{
        height: 100% ;
        /* 要给层级，如果样式出不来的话，就是框架的本身有这个样式，我的层级不够高 */
    }
    .el-container{
        height: 100%; 
    }
    .el-aside{
        background: #267cb7;
        height: 100%;
    }
    .el-header{
        background: #fafafa;
        height: 100%;
    }
   .el-main{
       background: #ffffff;
       height: 100%;
   }

</style>

