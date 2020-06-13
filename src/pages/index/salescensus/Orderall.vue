<template>
  <div id="orderall">
    <div class="block">
      <span class="demonstration" style="color:#fff">起始日期</span>
      <el-date-picker
        v-model="setTime"
        type="datetimerange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['00:00:00']"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd HH:mm:ss"
      ></el-date-picker>
      <el-button type="primary" @click="search()">查询</el-button>
    </div>
    <div id="chart_box">
      <div id="chart_example"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { echarts_ordertotal } from "@/api/echarts_api";
import moment from "moment";
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      time: "", //转换的时间
      value1: "", //选择的时间
      setTime: [], //定义一个大的时间
      timeArr: "", //获取的时间数据组
      priceArr: "" //获取订单金额数组
    };
  },
  methods: {
    // 搜索
    search() {
      console.log(this.setTime);
      this.refresh();
    },
    // 加载页面获取echarts数据
    refresh() {
      let myChart = echarts.init(document.getElementById("chart_example"));
      echarts_ordertotal(JSON.stringify(this.setTime)).then(res => {
        this.priceArr = res.data.data.map((i, index) => {
          return res.data.data[index].orderAmount;
        });
        this.orderAmount = res.data.data.map((i, index) => {
          return moment(res.data.data[index].orderTime).format("YYYY-MM-DD");
        });
        let priceArr = this.priceArr;
        let orderAmount = this.orderAmount;
        let option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              crossStyle: {
                color: "#999"
              }
            }
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ["line", "bar"] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          legend: {
            data: ["价格"]
          },
          xAxis: [
            {
              type: "category",
              data: orderAmount,
              axisPointer: {
                type: "shadow"
              }
            }
          ],
          yAxis: [
            {
              type: "value",
              name: "价格",
              min: 0,
              max: 150,
              interval: 20,
              axisLabel: {
                formatter: "{value} ¥"
              }
            }
          ],
          series: [
            {
              name: "价格",
              type: "bar",
              data: priceArr
            }
          ]
        };
        myChart.setOption(option);
      });
    }
  },
  mounted() {
    this.refresh();
  }
};
</script>

<style lang="less" scoped>
#orderall {
  display: flex;
  flex-direction: column;
  .block {
    .el-date-editor {
      margin: 0 10px 20px;
    }
  }
  #chart_box {
    background-color: #ffffff;
    padding: 10px;
    #chart_example {
      width: 100%;
      height: 500px;
    }
  }
}
</style>