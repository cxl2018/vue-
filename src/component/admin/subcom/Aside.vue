<template>
    <div>
          <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#409eff"
      text-color="#fff"
      active-text-color="#ffd04b">
      <!-- item循环数组的每一项，名字随便起的
       muni需要被渲染的整个数组
      -->
      <el-submenu  v-for="item in muni" :key="item.title" :index="item.title">
          <!-- 菜单title -->
        <template slot="title">
          <i class="el-icon-message"></i>
          <span>{{item.title}}</span>
        </template>
        <!-- 菜单list,遍历的当前菜单的chidren拿数据 -->
        <el-menu-item index="1-1" v-for="subitem in item.chidren" :key="subitem.title">
            <router-link :to="subitem.path">{{subitem.title}}</router-link>
        </el-menu-item >
      </el-submenu>
    </el-menu>
    </div>
</template>

<script>
   export default {
       /* 左侧导航列表数据 */
       data() {
           return {
               muni: [
                   {  
                       title:"商品详情",
                       chidren:[
                           {title:"内容管理",path:"/admin/good/list"},
                           {title:"类别管理",path:"/admin/good/details/:id"},
                           {title:"评论管理",path:"/admin/good/conment"}
                       ]
                   },
                    {  
                      title:"订单详情",
                      chidren:[
                            { title:"内容管理1",path:"/admin/a"},
                            { title:"类别管理2",path:"/admin/a"},
                            { title:"评论管理3",path:"/admin/a"}
                        ]
                   }
               ]
           }
       },
  }
</script>

<style scoped>
    i{
        color: #fff;
    }
    el-menu{
        font-size: 15px;
        font-weight: 600;
    }
    a{
        text-decoration: none;
        color: #fff;
    }
</style>