<template>
    <div class="login">
        <section >
         <el-form :model="ruleForm2" label-position="top" status-icon :rules="rules2" ref="a" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账号" prop="uname" >
            <el-input type="password" v-model="ruleForm2.uname" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="upwd">
            <el-input type="password" v-model="ruleForm2.upwd" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('a')">登录</el-button>
            <el-button @click="resetForm('a')">重置</el-button>
          </el-form-item>
        </el-form>
        </section>      
    </div>
</template>

<script>
    export default {
         data() {
           /* 验证规则 */
          // var validatePass = (rule, value, callback) => {
          //   /* console.log(rule);
          //   console.log("--------");
          //   console.log(value);
          //   console.log("--------");
          //   console.log(callback); */
          //   if (value === '') {
          //     callback(new Error('请输入账号'));
          //   } else {
          //     if (this.ruleForm2.checkPass !== '') {
          //       this.$refs.ruleForm2.validateField('uname');
          //     }
          //     callback();
          //   }
          // };
      /* 一般按照接口文档传参数据进行修改 */
      return {
        ruleForm2: {
         uname: '',
         upwd: '',
        },
        
        /* 表单验证规则 */
        /* 校验规则跟prop是相关联，所以需要更改，这个校验字段可以有多个 */
        rules2: {
          /* 密码 */
          uname: [
            /* validator单词：验证器，trigger单词：触发 
            validatePass是一个函数，当return出去的时候，触发上面的函数 }
          ],*/
          /* 当vauel为空的时候 */
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          /* 再次确认密码 */
          upwd: [
            {  required: true, message: '请输入密码', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      login(){
       /*  console.log(123); */
        this.$http.post(this.$api.login,this.ruleForm2).then((res)=>{
            /* this.$alert("登") */
           
           if (res.data.status==0) {
             /* 登录跳转之前把数据存到浏览器中 */
             localStorage.setItem("uname",res.data.message.uname)
             /* 当登录成功的时候进行跳转 */
            let nextPage = this.$route.query.nextPage || '/admin' ;
          this.$router.push({ path: nextPage });
              // this.$router.push({ name: 'admin'});
           }else{
              this.$message({
                showClose: true,
                message: res.data.message,
                type: 'error'
            });
           }
        })
      },
      submitForm(b) {
      /*   console.log(this.$refs[b]); */
        
        this.$refs[b].validate((valid) => {
     /*      console.log(valid);  */
          if (valid) {
            /*   this.$alert("登录成功"); */
              this.login();
          } else {
            console.log('登录失败');
            // 停止执行以下代码
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
    }
</script>

<style scoped lang="less">
    .login{
        height:100%;
        background-color: #2277bb;
        section{
           width:400px;
           height:300px;
           position:relative;
           top:50%;
           left:50%;
           transform:translate(-50%,-50%);
            border-radius: 13px;
           border:1px solid #fff;
          padding: 30px;
        }
    }
    
</style>