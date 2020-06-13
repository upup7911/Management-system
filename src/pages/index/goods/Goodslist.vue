<template>
  <div id="box">
    <h3>商品列表</h3>
    <!-- 表格 -->
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="商品价格">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="商品图片">
                <span>
                  <img
                    :src="'http://localhost:5000/upload/imgs/goods_img/'+props.row.imgUrl"
                    id="shoppic"
                  />
                </span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.ctime }}</span>
              </el-form-item>
              <el-form-item label="商品评价">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="商品销量">
                <span>{{ props.row.sellCount }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.goodsDesc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <!-- 一级标题 -->
        <el-table-column label="商品名称" prop="name" :width="320"></el-table-column>
        <el-table-column label="所属分类" prop="category" :width="220"></el-table-column>
        <el-table-column label="商品价格" prop="price" :width="180"></el-table-column>
        <el-table-column label="商品图片" prop="pic" :width="200">
          <template slot-scope="scope">
            <img
              :src="'http://localhost:5000/upload/imgs/goods_img/'+scope.row.imgUrl"
              alt
              id="shoppic"
            />
          </template>
        </el-table-column>
        <el-table-column label="商品描述" prop="goodsDesc" :width="300"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              id="editmsg"
              @click="open(scope.$index,scope.row),dialogFormVisible = true"
            ><i class="el-icon-edit"></i> 编辑</el-button>
            <el-button type="danger" @click="Del(scope.$index, scope.row)"><i class="el-icon-delete"></i> 删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      <!-- 编辑模态框 -->
      <el-dialog title="编辑信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="商品名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" :label-width="formLabelWidth">
            <el-select v-model="form.category" placeholder="用户组">
              <el-option :value="item" v-for="(item,index) in shopcate" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品价格" :label-width="formLabelWidth">
            <el-input v-model="form.price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品图片地址" :label-width="formLabelWidth">
            <el-input v-model="form.imgUrl" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品描述" :label-width="formLabelWidth">
            <el-input v-model="form.goodsDesc" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit(),dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  shop_list,
  shop_list_del,
  shop_categories,
  shop_edit
} from "@/api/shops";
import moment from "moment";

export default {
  data() {
    return {
      page: 1, // 分页
      total: 1, //总条数
      pageSize: 6, // ；每一页显示的条数
      tableData: [], //列表商品存放数组
      shopcate: [], //商品分类数组
      newarr: [],
      form: {
        // 模态框的值
        name: "", //商品名称
        category: "", //商品分类
        price: "", //商品价格
        imgUrl: "", //商品图片地址
        goodsDesc: "", //商品描述
        id: "" //id
      },
      dialogFormVisible: false, //模态框激活
      formLabelWidth: "120px" //label的长度
    };
  },
  methods: {
    // 重新赋值，把选中行内的值填入到模态框中
    open(index, row) {
      this.form.name = row.name;
      this.form.category = row.category;
      this.form.price = row.price;
      this.form.imgUrl = row.imgUrl;
      this.form.goodsDesc = row.goodsDesc;
      this.form.id = row.id;

      // this.newarr = [row]
      // console.log(this.newarr)
      // this.form[0] = this.newarr.map( (i) => {return row[i]});
      // console.log(':',this.form[0]);
    },
    // 编辑交互
    onSubmit() {
      shop_edit(
        this.form.name,
        this.form.category,
        this.form.price,
        this.form.imgUrl,
        this.form.goodsDesc,
        this.form.id
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
    // 删除
    Del(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          shop_list_del(this.tableData[index].id).then(res => {
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
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getdata(this.pageSize);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getdata(this.page);
    },
    // 获取数据刷新
    getdata() {
      shop_list(this.page, this.pageSize).then(res => {
        // this.tableData = res.data.data;

        this.tableData = res.data.data;
        this.tableData.forEach(v => {
          v.ctime = moment(v.ctime).format("YYYY-MM-DD hh:mm:ss");
        });
      });
    }
  },
  created() {
    // 分页总条数
    shop_list(this.page, this.pageSize).then(res => {
      this.total = res.data.total; //总条数
    });
    // 获取商品分类--调取的是商品分类中设置了启用的值
    shop_categories().then(res => {
      this.arr = res.data.categories.map((cateName, index) => {
        return res.data.categories[index].cateName;
      });
      this.shopcate = this.arr;
    });
    // 获取数据刷新
    this.getdata();
  }
};
</script>

<style lang="less" scoped>
h3 {
  padding: 10px 0;
}
#shoppic {
  height: 50px;
  width: 50px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
// 分页
.el-pagination {
  margin-top: 10px;
}
</style>