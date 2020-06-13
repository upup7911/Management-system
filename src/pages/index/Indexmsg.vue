<template>
  <div>
    <!-- 顶部区域 -->
    <div id="main_top">
      <div id="self">
        <el-carousel height="150px">
          <el-carousel-item v-for="item in 4" :key="item">
            <h2>今日上新</h2>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div id="main_box">
        <div v-for="item in arr" :key="item.id" id="main_little_box">
          <span :style="{color:item.color,fontSize:'70px'}" :class="item.icon"></span>
          <div>
            <h2 style="color:#ccc; font-weight:normal" class="title_h2">{{item.name}}</h2>
            <h2>{{item.money}}</h2>
          </div>
        </div>
      </div>
    </div>
    <!-- 1.echarts区域 -->
    <div id="chart_box">
      <div id="chart_example"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { echarts_totaldata } from "@/api/echarts_api";
export default {
  data() {
    return {
      // 4个小方块内容数组
      arr: [
        {
          id: 1,
          color: "#1296DB",
          name: "总订单",
          money: "NaN", //总订单
          icon: "iconfont icon-dingdanguanli"
        },
        {
          id: 2,
          color: "#D4237A",
          name: "总销售额",
          money: "NaN", //总销售额
          icon: "el-icon-coin"
        },
        {
          id: 3,
          color: "#1296DB",
          name: "今日订单数",
          money: "NaN", //今日订单
          icon: "el-icon-s-claim"
        },
        {
          id: 4,
          color: "#1AFA29",
          name: "今日销售额",
          money: "NaN", //今日销售额
          icon: "el-icon-document-checked"
        }
      ]
      // 存放四个值
    };
  },
  // 所有节点加载完毕完毕
  mounted() {
    // 2.使用init初始化一个DOM容器为echarts图表
    let myChart = echarts.init(document.getElementById("chart_example"));

    myChart.showLoading(); //加载图表——显示加载动画效果

    setTimeout(() => {
      echarts_totaldata().then(res => {
        // 传值
        this.arr[0].money = res.data.totalOrder;
        this.arr[1].money = res.data.totalAmount;
        this.arr[2].money = res.data.todayOrder;
        this.arr[3].money = res.data.totayAmount;

        // 3.配置表格对象，使用echarts进行渲染
        let { xData, orderData, amountData } = res.data;
        let option = {
          title: {
            text: "订单数据"
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: ["订单数据", "金额数据"]
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: xData
            //res.data.xdata
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              name: "订单数据",
              type: "line",
              stack: "总量",
              data: orderData
            },
            {
              name: "金额数据",
              type: "line",
              stack: "总量",
              data: amountData
            }
          ]
        };
        myChart.setOption(option);

        myChart.hideLoading(); //加载图表成功后——隐藏动画效果
      });
    }, 1500);
  }
};
</script>

<style lang="less" scoped>
// 顶部区域
#main_top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  // 内容区域顶部四个小方块
  #main_box {
    display: flex;
    // width: 800px;
    flex-wrap: wrap;
    width: 65%;
    justify-content: space-around;
    #main_little_box {
      margin-bottom: 10px;
      width: 500px;
      height: 105px;
      align-items: center;
      text-align: right;
      box-sizing: border-box;
      background: rgba(241, 236, 236, 0.6);
      padding: 10px 45px;
      display: flex;
      justify-content: space-between;
      .title_h2 {
        color: #fff !important;
      }
    }
  }

  #self {
    width: 34%;
    height: 222px;
    background: #fff;
    // .走马灯
    h2{
      text-align: right;
      margin-right: 20px;
      line-height: 20px;
      color: #ffffff;
    }
    /deep/.el-carousel__container{
      height: 222px !important;
    }

    .el-carousel__item:nth-child(n) {
      background: url('../../assets/imgs/bg.jpg') no-repeat;
      background-size: 100%;
    }

    .el-carousel__item:nth-child(2n+1) {
      background: url('../../assets/imgs/lunbo2.jpg') no-repeat;
      background-size: 100%;
    }
    .el-carousel__item:nth-child(3) {
      background: url('../../assets/imgs/lunbo3.jpg') no-repeat;
      background-size: 100%;
    }
    .el-carousel__item:nth-child(4) {
      background: url('../../assets/imgs/lunbo4.jpg') no-repeat;
      background-size: 100%;
    }
  }
}
// 图表区域
#chart_box {
  background-color: #ffffff;
  padding: 10px;
  #chart_example {
    width: 100%;
    height: 500px;
  }
}
</style>
