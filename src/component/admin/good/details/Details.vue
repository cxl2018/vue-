<template>
    <div>
         <el-breadcrumb separator-class="el-icon-arrow-right">
             <el-breadcrumb-item :to="{ name:'list'}">返回上一层</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/admin'}">商品管理</el-breadcrumb-item>       
             <el-breadcrumb-item>编辑商品</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 大大的form表单 -->
        <el-form ref="form" :model="form" label-width="80px" class="datail_form">
        <el-form-item label="内容标题">
            <el-input v-model="form.title"></el-input>
        </el-form-item>
         <el-form-item label="副标题">
            <el-input v-model="form.sub_title"></el-input>
        </el-form-item>
        <el-form-item label="所属类别">
            <el-select v-model="form.category_id" placeholder="请选择">
                <!-- 一个，其他使用循环渲染 ,key一定要写唯一的值-->
            <el-option v-for="item in category" :key="item.category_id" :label="item.title" :value="item.category_id"></el-option>
            </el-select> 
        </el-form-item>
        <el-form-item label="是否发布">
            <el-switch v-model="form.status"
             active-text="是"
             inactive-text="否"></el-switch>
        </el-form-item>
        <el-form-item label="推荐类型">
            <el-switch v-model="form.is_slide"  active-text="轮播图"></el-switch>
             <el-switch v-model="form.is_top"  active-text="置顶"></el-switch>
              <el-switch v-model="form.is_hot"  active-text="推荐"></el-switch>
        </el-form-item>
        <el-form-item label="上传封面">
             <!-- action用来设置上传接口，list-type用来设置文件表示演示
             ：file-list关联数据用的 -->            
                <el-upload
                    class="upload-demo"
                    
                    action="http://localhost:8899/admin/article/uploadimg"
                    :file-list="form.imgList"
                    list-type="picture"
                    :on-success="uploadImg">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
          
        </el-form-item>
        <el-form-item label="上传附件">
            <el-upload
                    class="upload-demo"
                     :on-success="uploadFile"
                    action="http://localhost:8899/admin/article/uploadfile"
                    :file-list=" form.fileList"
                   >
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
        </el-form-item>
          <el-form-item label="商品货号">
            <el-input v-model="form.goods_no"></el-input>
        </el-form-item>
         <el-form-item label="库存数量">
            <el-input v-model="form.stock_quantity"></el-input>
        </el-form-item>
         <el-form-item label="市场价格">
            <el-input v-model="form.market_price"></el-input>
        </el-form-item>
        <el-form-item label="销售价格">
            <el-input v-model="form.sell_price"></el-input>
        </el-form-item>
        <el-form-item label="内容摘要">
            <el-input type="textarea" v-model="form.zhaiyao"></el-input>
        </el-form-item>
        <el-form-item label="详细内容">
            <quillEditor v-model="form.content"></quillEditor>
          <!--  <div v-html=""></div> -->
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交保存</el-button>
            <el-button @click ="$router.go(-1)">返回上一页</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>

<script>
    /* 富文本操作 */
        import 'quill/dist/quill.core.css'
        import 'quill/dist/quill.snow.css'
        import 'quill/dist/quill.bubble.css'
        import { quillEditor } from 'vue-quill-editor'

    export default {
        data() {
          
            return {
            /* from表单的数据 */
        form: {},
        /* 从url里面获取参数的方式 */
        id:this.$route.params.id,
        /* 分类返回的是一个数组，我们用一个数组来接收*/
        category:[]
      }
    },
    methods: {
        /* 根据分类获取数据 */
        getCategory(){
             this.$http.get(this.$api.ctList+'goods').then((res)=>{
                console.log(res);
                 if (res.data.status==0) {
                     this.category =res.data.message;
                   
                 }
            })
        },
        /* 获取商品数据，让页面一上课就可以调用,根据id获取接口数据 */
        getGoods(){
            this.$http.get(this.$api.gsDetail+this.id).then((res)=>{
                console.log(res);
                 if (res.data.status==0) {
                     this.form =res.data.message;
                     /* 为了让数据显示正常，不会显示数字，需要把数字改为nuber类型 */
                  this.form.category_id = +this.form.category_id;
                 }
            })
        },
        /* 上传图片 */
        uploadImg(data){
            /* console.log("上传"); */
            /* 上传封面，咱们的后端接口，只能接收一张封面 */
           /*  this.form.imgList=[];
            this.form.fileList.push(data);    */
            /* 简写 */
            this.form.imgList = [data];
        },
        /* 上传附件 */
         uploadFile(data){
            /* console.log("上传"); */
            this.form.imgList.push(data)/*uploadFile(data)后台返回的数据，因为后台传过来的就是一个数组，所以我们直接push到
            到form表单里面，到时保存数据的时候一起保存  */        
        },
        /* 保存数据 ,也相当于修改数据，把原来的数据修进行编辑*/
        onSubmit() {
       /*  console.log('submit!'); */
             this.$http.post(this.$api.gsEdit+this.id,this.form).then((res)=>{
                // console.log(res);
                 if (res.data.status==0) {
                    this.$alert("数据修改成功")
                 }
            })
            // console.log(this.$api.gsEdit+this.id,this.form);
      },
    
    },
    /* 当页面一上来就自动调用接口获取数据，进行展示 */
    /* 生命周期函数 */
    created(){
        this.getGoods();
        this.getCategory();
        /* console.log(this.id); */
    },
     /* 使用子组件，富文本 */
        components: {
            quillEditor
        }
    }
</script>

<style scoped lang="less">
  /*   .el-breadcrumb{
        padding-bottom: 25px;
    } */
    .datail{
        &_form{
            margin-top: 30px;
            width: 700px;
        }
    }
    
</style>