<template>
  <div id="box">
    <div id="top">
      <h3>商品分类</h3>
      <el-button type="primary" @click="dialogFormVisible = true">添加分类</el-button>
    </div>
    <!-- 表格 -->
    <div>
      <el-table ref="multipleTable" :data="accountArr" tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="cateName" label="分类名称"></el-table-column>
        <el-table-column prop="state" label="是否使用">
          <template slot-scope="scope">
          <el-switch v-model="scope.row.state" disabled active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              id="editmsg"
              @click="open(scope.$index,scope.row),dialogTableVisible = true"
            ><i class="el-icon-edit"></i> 编辑</el-button>
            <el-button type="danger" @click="Del(scope.$index, scope.row)"><i class="el-icon-delete"></i> 删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[6, 10, 15, 20]"
        :page-size="6"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >></el-pagination>
    </div>
    <!-- 添加分类模态框 -->
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.newcate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" :label-width="formLabelWidth">
          <el-switch v-model="form.state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit(),dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑模态框 -->
    <el-dialog title="修改分类" :visible.sync="dialogTableVisible">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.input_cataName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" :label-width="formLabelWidth">
          <el-switch v-model="value2" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="editcate(),dialogTableVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  shop_catelist,
  shop_addcate,
  shop_delcate,
  shop_editcate
} from "@/api/shops";
export default {
  data() {
    return {
      page: 1, // 分页
      total: 1, //总条数
      page_num1: "6", // ；每一页显示的条数
      accountArr: [], // 选中的数组
      dialogTableVisible: false, //编辑框
      dialogFormVisible: false, //添加框
      value1: true,//默认的开关值
      value2:"",//开关的model值
      form: {
        newcate: "", //添加分类名称
        state: true,//添加分类开关
        input_id: "",//编辑id
        input_cataName: "",//编辑名称
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    // 保存input的值，在编辑里面对用来发送参数
    open(index,row) {
      this.form.input_id = row.id;
      this.form.input_cataName = row.cateName;
      this.value1 = row.state
      this.value2 = this.value1
    },
    // 编辑发送请求--编辑内容
    editcate() {
      shop_editcate(
        this.form.input_id,
        this.form.input_cataName,
        this.value2.toString()
      ).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          //刷新页面
          this.getdata();
        }
      });
    },
    // 增加分类
    onSubmit() {
      shop_addcate(this.form.newcate, this.form.state.toString()).then(res => {
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "添加成功!"
          });
          this.form.newcate = ""; //清空输入框
          this.getdata();
        } else {
          this.$message({
            message: "添加失败",
            type: "warning"
          });
        }
      });
    },
    // 删除单个数据行
    Del(index) {
      // console.log(index)
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          shop_delcate(this.accountArr[index].id).then(res => {
            if (res.data.code == 0) {
              this.getdata();
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 分页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.page_num1 = val; //将值赋给每页的条数
      this.getdata(this.page_num1); //刷新
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val; //将值赋给当前页
      this.getdata(this.page); //刷新
    },

    // 刷新页面
    getdata() {
      shop_catelist(this.page, this.page_num1).then(res => {
        // this.accountArr = res.data.data;
        this.newarr = res.data.data.map((item, index) => {
        if (res.data.data[index].state == 1) {
          res.data.data[index].state = true;
        } else {
          res.data.data[index].state = false;
        }
        return res.data.data[index];
      });
      this.accountArr = this.newarr;
      });
    }
  },
  created() {
    shop_catelist(this.page, this.page_num1).then(res => {
      this.total = parseInt(res.data.total);
      this.getdata()
    });
  }
};
</script>

<style lang="less" scoped>
#top {
  display: flex;
  justify-content: space-between;
  // align-items: center;
  // margin-bottom: 10px;
  padding: 10px 0;
}
.el-pagination {
  margin-top: 10px;
}
</style>