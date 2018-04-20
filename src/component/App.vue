<template>
<!-- 登录页面嵌套在主页面中，如果放在一个div里面，到时我们设置登录页面的div时，这个
div就不是最外层的div，最外层的div在这个地方，所以我们需要把它删掉或者给100% -->    
    <router-view></router-view>  
    
</template>

<script>
    export default {
       data() {
           return {
               
           }
       },
       /* 生命周期函数，vue会自动调用 */
       created () {
           this.$http.get(this.$api.logout).then(()=>console.log('退出登录'))
       }
    }

</script>

<style scoped>

</style>