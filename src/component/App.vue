<template>
    <div id="app"> 
           {{val}}          
     <router-view></router-view>  
    </div>
</template>

<script>
    export default {
       data() {
           return {
               val: "这是一个vue脚手架测试"
           }
       }
    }
</script>

<style scoped>

</style>