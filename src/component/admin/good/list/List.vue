<template>
  <div>
      <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="list">
      <el-button-group>
      <!-- button按钮 -->
        <el-button plain icon="el-icon-plus" size="small">新增</el-button>
        <el-button plain icon="el-icon-check" size="small"  @click="allBtn">全选</el-button>
        <el-button plain icon="el-icon-delete" size="small" @click="del">删除</el-button>
      </el-button-group>
      <!-- input搜索框,需要双向数据绑定 ，当用户输入值的时候，data的数据会发生改变或者说
            绑定的这个值就会获得什么数据 -->
      <div class="list_btn">
        <el-input placeholder="请输入搜索内容" suffix-icon="el-icon-search" size="small" v-model="apiQuery.searchvalue" @blur="search">
        </el-input>
      </div>
    </div>
    <!-- 多选表格 -->
    <template>
      <!-- ref只是一个名字，相当于类名，同this.$refs获取这个dom元素 -->
      <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="change">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <!-- 标题可以不加宽度，其他的给到120宽度，剩下的余多少就给到标题 -->
        <el-table-column label="标题">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="" placement="right-start">
              <!-- `/admin/good/detail/${scope.row.id}` -->
              <router-link class="v_title" :to="{path:`detail/${scope.row.id}`}">{{ scope.row.title}}</router-link>
              <div slot="content">
                <img :src="scope.row.imgurl" width="200px" alt="商品图片">
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="categoryname" label="所属类别" width="120">
        </el-table-column>
        <el-table-column prop="stock_quantity" label="库存" width="120" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="market_price" label="市场价" width="120" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="sell_price" label="销售价" width="120" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="属性" width="120" show-overflow-tooltip>
          <template slot-scope="scope" >
            <!-- 使用v-bind的另一种方法 -->
            <span :class="['el-icon-picture', scope.row.is_slide == 1? 'active': '']"></span>
            <span :class="['el-icon-upload',scope.row.is_top==1? 'active': '' ] "></span>
            <span :class="['el-icon-star-on',scope.row.is_top==1? 'active': '' ]"></span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" show-overflow-tooltip>
          <template slot-scope="scope">
            <router-link  :to="{path:`detail/${scope.row.id}`}"  class="v_title">修改</router-link>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页操作 -->
    <template>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="apiQuery.pageIndex" :page-sizes="[ 2, 4, 6]" :page-size="apiQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="apiQuery.total">
        </el-pagination>
      </div>
    </template>
    </div>
</template>

<script>
export default {
  
  data() {
    return {
      /* 分页操作 */
       currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
      /* 搜索功能的数据 */
      apiQuery: {
        /* 当前页 */
        pageIndex: 1,
        /* 每页显示多少条 */
        pageSize: 2,
        searchvalue: "",
        total:0
      },
      /* 定一个属性来装需要删除的对象 */
      selecdGoodList: [],
      tableData3: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      multipleSelection: []
    };
  },

  methods: {
    /* 搜索功能先后端请求接口 */
    search() {
      this.getGoodsData();
    },
    /* 向后端发送数据请求 */
    getGoodsData() {
      this.$http
        .get(
          `${this.$api.gsList}?pageIndex=${this.apiQuery.pageIndex}&pageSize=${
            this.apiQuery.pageSize
          }&searchvalue=${this.apiQuery.searchvalue}`
        )
        .then(res => {
          if (res.data.status == 0) {
            this.tableData3 = res.data.message;
            this.apiQuery.total = res.data.totalcount;
        /*     console.log(this.apiQuery.total); */
          }
        });
    },
    change(selection) {
       
      /* 把监听到多选框变化的值，赋值给到data中的selecdGoodList */
      this.selecdGoodList = selection;
      
    
    },
    del() {
      /* 点击删除发送请求，根据id进行删除，如何获取到id，有一个监听事件，selection-change,可以监听到，有一个
        参数selection，这个参数是获取你点击的那个对象，把我们点击的对象给到data，因为我们需要删除的数据是多个的，所以
        用数组包围起来，把我们监听到的数据存到data中，我们获取data中的属性即可获取到这个对象，获取对象中的id，根据
        map（），从一个数组映射成另一个数组，map（v=>v.id）,要转换的数组，需要获取里面的什么 */

      /* 获取对象里面的id */
      let delId = this.selecdGoodList.map(v => v.id);
      /* 根据id进行删除 */
      this.$http.get(this.$api.gsDel + delId).then(res => {
        /* 判断数据请求成功 */
        if (res.data.status == 0) {
          this.getGoodsData();
        }
      });
    },
    /* 点击全选，获取下面全选框的功能 */
    allBtn() {
      document.querySelector(".el-checkbox__inner").click();
    },
    /* toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    } */
    /* 分页操作 */
    /* 写val也行，任意写的 */
      handleSizeChange(page) {
        console.log(`每页 ${page} 条`);
        /* 把分页和表格的数据绑定，我们触犯事件里面的参数，当事件触发时，赋值给到分页组件，告诉它我已经更改页码 */
        this.apiQuery.pageSize = page
         this.getGoodsData();
      },
      handleCurrentChange(size) {
        console.log(`当前页: ${size}`);
        this.apiQuery.pageIndex = size/* 分页组件刷新后，觉得表格也要刷新，调用接口，不然没反应的 */
        this.getGoodsData();
      }
  },
  /* 页面一上来就自动调用接口获取数据，进行展示 */
  created() {
    this.getGoodsData();
  }
};
</script>

<style scoped lang="less">
.el-breadcrumb {
  /*   border-bottom: 1px solid #eeeeee; */
  padding: 10px;
}
.el-button {
  margin: 0 12px 0 12px;
  border-radius: 4px;
}
.list {
  height: 50px;
  border: 1px solid #eee;
  padding: 8px;
  line-height: 50px;
  border-radius: 12px;
  &_btn {
    float: right;
  }
}
.v_title {
  color: #666;
  font-size: 14px;
  text-decoration: none;
}

span{
    font-size: 19px;
}
[class^="el-icon"].active {
  opacity: 0.5;
}
</style>