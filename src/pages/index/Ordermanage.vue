<template>
  <div id="box">
    <!-- 查询类 -->
    <el-form :inline="true" :model="orderSearch" class="demo-form-inline">
      <el-form-item label="订单号">
        <el-input v-model="orderSearch.num" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item label="收货人">
        <el-input v-model="orderSearch.user" placeholder="收货人"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="orderSearch.phone" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="orderSearch.state" placeholder="订单状态">
          <el-option label="已完成" value="已完成"></el-option>
          <el-option label="已受理" value="已受理"></el-option>
          <el-option label="派送中" value="派送中"></el-option>
        </el-select>
      </el-form-item>
      <br />
      <el-form-item label="选择时间">
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00']"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search()" icon="el-icon-search">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 查询列表 -->
    <h3>查询列表</h3>
    <el-table :data="searchArr" border style="width: 100%" class="search">
      <el-table-column fixed prop="orderNo" label="订单号" width="100"></el-table-column>
      <el-table-column prop="orderTime" label="下单时间" width="212"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
      <el-table-column prop="consignee" label="收货人" width="150"></el-table-column>
      <el-table-column prop="deliverAddress" label="送货地址" width="220"></el-table-column>
      <el-table-column prop="deliveryTime" label="送货时间" width="212"></el-table-column>
      <el-table-column prop="remarks" label="备注"></el-table-column>
      <el-table-column prop="orderAmount" label="订单金额" width="120"></el-table-column>
      <el-table-column prop="orderState" label="订单状态" width="80"></el-table-column>
    </el-table>
    <h3>订单列表</h3>
    <!-- 订单列表 -->
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="orderNo" label="订单号" width="100"></el-table-column>
        <el-table-column prop="orderTime" label="下单时间"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
        <el-table-column prop="consignee" label="收货人" width="150"></el-table-column>
        <el-table-column prop="deliverAddress" label="送货地址" width="220"></el-table-column>
        <el-table-column prop="deliveryTime" label="送货时间"></el-table-column>
        <el-table-column prop="remarks" label="备注"></el-table-column>
        <el-table-column prop="orderAmount" label="订单金额" width="80"></el-table-column>
        <el-table-column prop="orderState" label="订单状态" width="80"></el-table-column>
        <el-table-column fixed="right" label="操作" width="130">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row),dialogTableVisible = true"
              type="text"
              size="small"
            >
              <i class="el-icon-view el-icon--right">查看</i>
            </el-button>
            <el-button
              type="text"
              size="small"
              icon="el-icon-edit"
              @click="editClick(scope.row),dialogFormVisible = true"
            >编辑</el-button>
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
    </div>
    <!-- 查看模态框 -->
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible" width="70%">
      <el-table :data="searchList">
        <!-- v-model="searchList" -->
        <el-table-column prop="orderNo" label="订单号" width="150"></el-table-column>
        <el-table-column prop="orderTime" label="下单时间" width="200"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column prop="consignee" label="收货人"></el-table-column>
        <el-table-column prop="deliverAddress" label="送货地址"></el-table-column>
        <el-table-column prop="deliveryTime" label="送达时间" width="200"></el-table-column>
        <el-table-column prop="remarks" label="备注"></el-table-column>
        <el-table-column prop="orderAmount" label="订单金额"></el-table-column>
        <el-table-column prop="orderState" label="订单状态"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogTableVisible = false">返回</el-button>
      </div>
    </el-dialog>
    <!-- 编辑模态框 -->
    <el-dialog title="编辑信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="订单号" :label-width="formLabelWidth">
              <el-input v-model="form.orderNo" disabled autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话" :label-width="formLabelWidth">
              <el-input v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="收货人" :label-width="formLabelWidth">
              <el-input v-model="form.consignee" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="送货地址" :label-width="formLabelWidth">
              <el-input v-model="form.deliverAddress" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item label="时间" :label-width="formLabelWidth">
              <el-date-picker
                v-model="form.time"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00']"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="订单金额" :label-width="formLabelWidth">
              <el-input v-model="form.orderAmount" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="订单状态" :label-width="formLabelWidth">
              <el-select v-model="form.orderState" placeholder="订单状态">
                <el-option label="已完成" value="已完成"></el-option>
                <el-option label="派送中" value="派送中"></el-option>
                <el-option label="已受理" value="已受理"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="备注" :label-width="formLabelWidth">
              <el-input v-model="form.remarks" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false,cancel()">取 消</el-button>
        <el-button type="primary" @click="onSubmit(),dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入当前页面需要的axios
import {
  order_list,
  order_search,
  order_detail,
  order_edit
} from "@/api/order";
import moment from "moment";
export default {
  data() {
    return {
      page: 1, // 分页
      total: 1, //总条数
      pageSize: 6, // ；每一页显示的条数
      //
      value1: [new Date(2019, 0, 1, 0, 0, 0), new Date(2022, 0, 1, 0, 0, 0)], //时间
      time: "", //获取时间转换的数据

      tableData: [], //列表内容数组
      searchList: [], //查询数据存放与查看数据存放为一起
      searchArr: [], //查询数据存放与查看数据存放为一起
      orderEdit: [], //编辑的数据存放
      dialogTableVisible: false, //查看模态框激活
      dialogFormVisible: false, //编辑模态框激活
      formLabelWidth: "120px", //label的长度
      // 查询动态数据
      orderSearch: {
        num: "", //订单号
        user: "", //收货人
        phone: "", //手机号
        state: "" //订单状态
      },
      // 编辑模态框的值
      form: {
        id: "", //id值
        orderNo: "", //订单号
        orderTime: "", //下单时间
        phone: "", //电话
        consignee: "", //收货人
        deliverAddress: "", //送货地址
        deliveryTime: "", //送达时间
        remarks: "", //备注
        orderAmount: "", //订单金额
        orderState: "", //订单状态
        time: []
      }
    };
  },
  methods: {
    // 打开编辑
    editClick(row) {
      this.form.orderTime = new Date(row.orderTime);
      this.form.deliveryTime = new Date(row.deliveryTime);
      this.form.time.push(this.form.orderTime, this.form.deliveryTime); //时间
      // console.log(this.box); //Thu Jun 04 2020 17:35:19 GMT+0800 (中国标准时间)
      this.form.id = row.id; //id值
      this.form.orderNo = row.orderNo; //订单号
      this.form.orderTime = row.orderTime; //下单时间
      this.form.phone = row.phone; //电话
      this.form.consignee = row.consignee; //收货人
      this.form.deliverAddress = row.deliverAddress; //送货地址
      this.form.deliveryTime = row.deliveryTime; //送达时间
      this.form.remarks = row.remarks; //备注
      this.form.orderAmount = row.orderAmount; //订单金额
      this.form.orderState = row.orderState; //订单状态
      // console.log(this.form.orderTime)
      // console.log(this.form.deliveryTime)
    },
    // 取消
    cancel() {
      // 如果关闭，就情况时间数组
      this.form.time = [];
    },
    // 提交编辑内容
    onSubmit() {
      // 如果提交，就情况时间数组
      this.form.time = [];
      order_edit(
        this.form.id,
        this.form.orderNo,
        this.form.orderTime,
        this.form.phone,
        this.form.consignee,
        this.form.deliverAddress,
        this.form.deliveryTime,
        this.form.remarks,
        this.form.orderAmount,
        this.form.orderState
      ).then(res => {
        // console.log(res);
        if (res.data.code == 0) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.getdata();
        } else {
          this.$message.error("修改失败！");
        }
      });
    },
    // 打开查看——ok
    handleClick(row) {
      order_detail(row.id).then(res => {
        this.searchList = [res.data.data]; // 把对象转为数组
        // 转变数组内的时间为正常时间
        this.searchList.forEach(v => {
          v.orderTime = moment(v.orderTime).format("YYYY-MM-DD hh:mm:ss");
          v.deliveryTime = moment(v.deliveryTime).format("YYYY-MM-DD hh:mm:ss");
        });
        /* this.searchList = this.searchList.map(item => {
          if (res.data.data.orderTime != 0) {
            var date = new Date(res.data.data.orderTime); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            this.Y = date.getFullYear() + "-";
            this.M =
              (date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1) + "-";
            this.D = date.getDate() + " ";
            this.h = date.getHours() + ":";
            this.m = date.getMinutes() + ":";
            this.s = date.getSeconds();
            res.data.data.orderTime =
              this.Y + this.M + this.D + this.h + this.m + this.s;

            var deliveryTime = new Date(res.data.data.deliveryTime); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            this.Y = deliveryTime.getFullYear() + "-";
            this.M =
              (deliveryTime.getMonth() + 1 < 10
                ? "0" + (deliveryTime.getMonth() + 1)
                : deliveryTime.getMonth() + 1) + "-";
            this.D = deliveryTime.getDate() + " ";
            this.h = deliveryTime.getHours() + ":";
            this.m = deliveryTime.getMinutes() + ":";
            this.s = deliveryTime.getSeconds();
            res.data.data.deliveryTime =
              this.Y + this.M + this.D + this.h + this.m + this.s;
          }
          return item;
        }); */
        console.log(this.searchList);
      });
    },
    // 查询——ok
    search() {
      if (
        this.orderSearch.num.length != 5 &&
        this.orderSearch.phone.length != 11 &&
        this.orderSearch.user <= 0
      ) {
        this.$message.error("查询失败,请填写正确的查询数据");
      } else {
        order_search(
          1,//这的当前页一直是第一页，因为它只是查询当前页面，如果设置为page就获取不到数据了
          this.total,
          this.orderSearch.num,
          this.orderSearch.user,
          this.orderSearch.phone,
          this.orderSearch.state,
          this.value1
        ).then(res => {
          if (res.data.data.length != 0) {
            this.$message({
              type: "success",
              message: "查询成功!"
            });
            this.searchArr = res.data.data;
            this.searchArr.forEach(v => {
              v.orderTime = moment(v.orderTime).format("YYYY-MM-DD hh:mm:ss");
              v.deliveryTime = moment(v.deliveryTime).format(
                "YYYY-MM-DD hh:mm:ss"
              );
            });
          } else {
            this.$message.error("查询失败,没有找到该订单");
          }
        });
      }
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      // this.getdata(this.pageSize);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      // this.getdata(this.page);
    },
    // 数据调用函数
    getdata() {
      order_list(
        this.page,
        this.pageSize
        // this.orderSearch.num,
        // this.orderSearch.user,
        // this.orderSearch.phone,
        // this.orderSearch.state,
        // this.value1
      ).then(res => {
        this.total = res.data.total; //总条数
        this.tableData = res.data.data;
        this.tableData.forEach(v => {
          v.orderTime = moment(v.orderTime).format("YYYY-MM-DD hh:mm:ss");
          v.deliveryTime = moment(v.deliveryTime).format("YYYY-MM-DD hh:mm:ss");
        });
      });
    }
  },
  created() {
    this.getdata();
  }
};
</script>

<style lang="less" scoped>
// 分页样式
.el-pagination {
  margin-top: 10px;
}
// 查询框样式
.demo-form-inline {
  padding-top: 20px;
}
// 搜索样式
.search {
  background: #f5f5f5;
  margin-bottom: 20px;
}
</style>