<template>
    <div class="header"> 
        <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
            <span>你好，{{uname}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">修改密码</el-dropdown-item>
            <el-dropdown-item command="b">注销登录</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    export default {
        data() {
            return {
             uname:localStorage.getItem("uname")
            }
        },

        methods: {
            logout(){
                /* 向后端发送请求 */
                this.$http.get(this.$api.logout).then(()=>{
                    this.$router.push({name: 'login'});
                })
            },
            handleCommand(command) {
              /* 判断，当点击等b的时候，执行退出登录 */
              if (command=="b") {
                  this.logout()
              }
      }
    }
    }
</script>

<style scoped>
    .header{
        text-align: right;
        line-height: 42px;
    }
</style>