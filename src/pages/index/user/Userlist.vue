<template>
  <div id="box">
    <h2>账号列表</h2>
    <!-- 账号列表 -->
    <div>
      <el-table
        ref="multipleTable"
        :data="accountArr"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="account" label="账号"></el-table-column>
        <el-table-column prop="userGroup" label="用户名"></el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">{{ scope.row.ctime }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button id="editmsg" @click="open(scope.$index),dialogFormVisible = true">
              <i class="el-icon-edit"></i> 编辑
            </el-button>
            <el-button type="danger" @click="Del(scope.$index, scope.row)">
              <i class="el-icon-delete"></i> 删除
            </el-button>
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
    <!-- 批量删除与取消全选 -->
    <div style="margin-top: 20px">
      <el-button type="danger" @click="batch_del()">
        <i class="el-icon-delete"></i> 批量删除
      </el-button>
      <el-button type="primary" @click="deselect()">
        <i class="el-icon-refresh"></i>取消选择
      </el-button>
    </div>

    <!-- 编辑模态框 -->
    <el-dialog title="编辑信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.input_acc" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户组" :label-width="formLabelWidth">
          <el-select v-model="form.input_group" placeholder="用户组">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit(),dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入当前页面axios
import {
  API_accountlist, //获取账号列表
  API_accountDle, //删除账号
  API_batchDel, //批量删除账号
  API_AccEdit //修改账号
} from "../../../api/apis";
import moment from "moment";
export default {
  data() {
    return {
      page: 1, // 分页
      total: 15, //总条数
      page_num1: "6", // ；每一页显示的条数
      accountArr: [], // 选中的数组
      multipleSelection: [], //监听数组
      box: [], // 删除id的数组
      cdel: "", // 删除的id
      input_group: "", // 保存一个固定的用户组
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        // 模态框的值
        input_acc: "",
        input_group: "",
        type: []
      },
      formLabelWidth: "120px"
    };
  },

  methods: {
    // 删除单个数据行
    Del(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          API_accountDle(this.accountArr[index].id).then(res => {
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
    // 监听选中的数据
    handleSelectionChange(selection) {
      this.newarr = JSON.stringify(selection.map(item => item.id));
    },
    // 批量删除账号
    batch_del() {
      if (!this.newarr) {
        return this.$message({
          type: "warning",
          message: "请选中要删除的!"
        });
      }
      this.$confirm("此操作将永久删除选中的文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          API_batchDel(this.newarr).then(res => {
            if (res.data.code == 0) {
              // 重新获取列表
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

    // 取消全选
    deselect() {
      this.$refs.multipleTable.clearSelection();
    },
    // 保存input的值，在编辑里面对用来发送参数
    open(index) {
      this.form.input_id = this.accountArr[index].id;
      this.form.input_acc = this.accountArr[index].account;
      this.form.input_group = this.accountArr[index].userGroup;
      // 保存一个固定的判断是否修改
      this.input_group = this.accountArr[index].userGroup;
    },
    // 编辑发送请求--编辑内容
    onSubmit() {
      API_AccEdit(
        this.form.input_id,
        this.form.input_acc,
        this.form.input_group
      ).then(res => {
        if (this.input_group == this.form.input_group) {
          this.$message({
            message: "没有修改",
            type: "warning"
          });
        } else {
          if (res.data.code == 0) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            //刷新页面
            this.getdata();
          }
        }
      });
    },
    // 获取页面账户列表数据与总页数
    getdata() {
      API_accountlist(`${this.page}`, `${this.page_num1}`).then(res => {
        this.total = parseInt(res.data.total);

        this.accountArr = res.data.data;
        this.accountArr.forEach(v => {
          v.ctime = moment(v.ctime).format("YYYY-MM-DD hh:mm:ss");
        });
      });
    }
  },
  // 获取用户列表
  created() {
    this.getdata();
  }
};
</script>

<style lang="less" scoped>
#box {
  background: #ffffff;
  .block {
    margin-top: 10px;
  }
  h2 {
    padding: 10px 0;
  }
}
</style>