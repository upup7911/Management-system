<template>
  <!-- 整体框架 -->
  <el-container id="index_main">
    <!-- 左侧边栏 -->
    <el-aside width="300px">
      <div id="aside_header">
        <span class="iconfont icon-logo" id="title"></span>
        芜湖餐饮管理系统
      </div>
      <!-- 导航栏 -->
      <el-menu
        :default-active="defaultChoise"
        class="el-menu-vertical-demo"
        background-color="#222222"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        unique-opened
      >
        <!-- router：设置了就可以在下面使用index跳转页面了 -->
        <!-- unique-opened:展示一个，其他子选择不展开 -->
        <div v-for="item in newtreelist" :key="item.index">
          <!-- submenu；带二级选项卡 -->
          <el-submenu v-if="item.children" :index="item.index">
            <template slot="title">
              <span :class="item.icon"></span>
              <span>{{ item.title }}</span>
            </template>
            <!-- 子标题，二次遍历 -->
            <el-menu-item v-for="child in item.children" :key="child.index" :index="child.index">
              <i :class="child.icon"></i>
              {{ child.title }}
            </el-menu-item>
          </el-submenu>
          <!-- el-menu-item：一级选项卡，不展开 -->
          <el-menu-item v-else :index="item.index">
            <span :class="item.icon"></span>
            <span>{{ item.title }}</span>
          </el-menu-item>
        </div>
      </el-menu>
      <div class="css214439098321973">
        <span class="iconfont icon-logo" id="title"></span>
        <div>
          一起加班的是同事
          <br />一起吃饭的是家人
        </div>
      </div>
    </el-aside>
    <!-- 右侧部分 -->
    <el-container>
      <!-- 头部 -->
      <el-header>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" id="bread_list">
          <!-- 遍历动态的数组获取面包屑值 -->
          <el-breadcrumb-item v-for="item in headlist" :key="item" style="color: red">{{ item }}</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 头像个人中心 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" id="Acc_img">
          <!-- 用户名、个人中心、退出登录 -->
          <el-dropdown>
            <span class="el-dropdown-link">
              <span v-html="acc">下拉菜单</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <router-link to="/index/user/My" id="headpic">
                <el-dropdown-item>个人中心</el-dropdown-item>
              </router-link>
              <!-- 点击退出事件 -->
              <span @click="OutAccount()">
                <el-dropdown-item>退出登录</el-dropdown-item>
              </span>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- 用户头像——可跳转 -->
          <router-link to="/index/user/My">
            <el-avatar :size="50" src="https://empty">
              <img :src="this.img" title="个人中心" />
            </el-avatar>
          </router-link>
        </el-breadcrumb>
      </el-header>
      <!-- 传入不同页面内容区域 -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { API_checktoken, API_accountinfo } from "@/api/apis";
export default {
  data() {
    return {
      // treelist:为左侧动态菜单数据
      treelist: [
        {
          index: "/index/indexmsg", // index：点击树选项卡，跳转的hash
          icon: "iconfont icon-shouye", // icon：图标
          title: "后台首页", // title：一级图标的名字
          role: ["super", "normal"]
        },
        {
          index: "/index/Ordermanage",
          icon: "iconfont icon-dingdanguanli",
          title: "订单管理",
          role: ["super", "normal"]
        },
        {
          index: "/index/Shopmanage1",
          icon: "iconfont icon-dianpuguanli",
          title: "店铺管理",
          role: ["super", "normal"]
        },
        {
          index: "4",
          icon: "iconfont icon-shangpinguanli",
          title: "商品管理",
          role: ["super"],
          children: [
            // children:一级选项卡下面的二级菜单（选项卡），带childrem
            {
              icon: "el-icon-circle-plus-outline",
              index: "/index/goods/goodsadd",
              title: "新增商品"
            },
            {
              icon: "el-icon-s-order",
              index: "/index/goods/goodslist",
              title: "商品列表"
            },
            {
              icon: "el-icon-film",
              index: "/index/goods/goodsclass",
              title: "商品分类"
            }
          ]
        },
        {
          index: "5",
          icon: "iconfont icon-zhanghaoguanli",
          title: "账号管理",
          role: ["super"],
          children: [
            {
              icon: "el-icon-document",
              index: "/index/user/userlist",
              title: "账号列表"
            },
            {
              icon: "el-icon-document-add",
              index: "/index/user/useradd",
              title: "添加账号"
            },
            {
              icon: "el-icon-paperclip",
              index: "/index/user/revisepwd",
              title: "修改密码"
            }
          ]
        },
        {
          index: "6",
          icon: "iconfont icon-xiaoshoutongji",
          title: "销售统计",
          role: ["super"],
          children: [
            {
              icon: "el-icon-shopping-cart-1",
              index: "/index/salescensus/Goodsall",
              title: "商品统计"
            },
            {
              icon: "el-icon-tickets",
              index: "/index/salescensus/Orderall",
              title: "订单统计"
            }
          ]
        }
      ],

      headlist: ["首页"], // 面包屑数组
      defaultChoise: "", // 默认选中导航栏部分hash值设定

      acc: "", // 登录数
      img: "", //头像图片
      group: "" //用户组——用来判断等级权限
    };
  },
  methods: {
    // 面包屑替换
    changelist(hash) {
      let arr = [];
      // 根据hash值的变化，改变面包屑
      switch (hash) {
        case "/index/indexmsg":
          arr = ["首页"];
          break;
        case "/index/Ordermanage":
          arr = ["订单管理"];
          break;
        case "/index/Shopmanage1":
          arr = ["店铺管理"];
          break;
        case "/index/goods/goodsadd":
          arr = ["商品管理", "新增商品"];
          break;
        case "/index/goods/goodslist":
          arr = ["商品管理", "商品列表"];
          break;
        case "/index/goods/goodsclass":
          arr = ["商品管理", "商品分类"];
          break;
        case "/index/user/userlist":
          arr = ["账号管理", "账号列表"];
          break;
        case "/index/user/useradd":
          arr = ["账号管理", "添加账号"];
          break;
        case "/index/user/revisepwd":
          arr = ["账号管理", "修改密码"];
          break;
        case "/index/user/My":
          arr = ["个人中心"];
          break;
        case "/index/salescensus/Goodsall":
          arr = ["销售统计", "商品统计"];
          break;
        case "/index/salescensus/Orderall":
          arr = ["销售统计", "订单统计"];
          break;
      }
      this.headlist = arr;
    },
    // 退出账号
    OutAccount() {
      // 跳出弹出框
      this.$confirm("是否退出账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          localStorage.clear();
          this.$router.push("/");
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
    }
  },
  //检测某个数据（hash）的变化
  watch: {
    // 监听路由变化
    $route: {
      handler: val => {
        // 检测面包屑的hash路径变化
        window._indexthis.changelist(val.path);
        // 根据hash值改变左侧菜单默认选中导航栏
        window._indexthis.defaultChoise = val.path; ////!!!!!!!!!!!
      },
      deep: true
    }
  },
  computed: {
    // 根据用户组显示对应可见的内容
    newtreelist() {
      // 判断treelist数组中的role中是否包含相应的等级，如果有就加到数组中去，如果没有就不加
      // 判断用户等级看到相应的界面
      return this.treelist.filter(item => item.role.includes(this.group));
    }
  },
  created() {
    // this.$router--main.js里的router对象实例（最大的vuerouter实例）
    // this.$routr--当前页面hash值
    let hash = this.$route.path;

    this.defaultChoise = hash;
    this.changelist(hash); // 把当前路由传到面包屑函数中去比对

    window._indexthis = this; // 在进入页面时就把this挂在全局上

    this.group = localStorage.role; //用户组

    //发送请求验证token是否过期
    API_checktoken(localStorage.token).then(res => {
      if (res.data.code == 0) {
        this.acc = localStorage.user; //用户名
        API_accountinfo(localStorage.id).then(res => {
          // 用户名，id名已有
          localStorage.ctime = res.data.accountInfo.ctime; //时间
          localStorage.account = res.data.accountInfo.account; //用户名
          localStorage.userGroup = res.data.accountInfo.userGroup; //用户组
          localStorage.img = res.data.accountInfo.imgUrl; //用户头像
          this.img = res.data.accountInfo.imgUrl; //调用数据库头像给页面添加
        });
      }
    });
  }
};
</script>

<style lang="less" scoped>
// 下拉菜单
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
// 设置高度为100%
#index_main {
  // 文字题目
  .css214439098321973 {
    margin-top: 20px;
    font-size: 30px;
    line-height: 40px;
    #title {
      font-size: 30px;
    }
  }
  background: url("../assets/imgs/bg.jpg");
  height: 100%;
  // 内容区域
  .el-menu {
    border: none;
  }
  .router-link-exact-active {
    line-height: 0px;
  }
  // 头部
  .el-header {
    box-shadow: 8px 0 15px 0px #909399;
    display: flex;
    justify-content: space-between;
    text-align: center;
    sapn {
      color: red !important;
    }
    // 头像标签的行高
    a {
      line-height: 0;
    }
    // 面包屑
    #bread_list,
    #Acc_img {
      display: flex;
      align-items: center;
      margin-right: 10px;
      color: #fff;
      span {
        margin-left: 10px;
      }
    }
  }
  // 导航栏
  .el-aside {
    background-color: rgba(00, 00, 00, 0.3);
    color: #fff;
    text-align: center;
    line-height: 200px;
    .el-menu-item,
    .el-submenu__title {
      height: 70px;
      line-height: 70px;
    }
    #aside_header {
      line-height: 120px;
      color: #ffffff;
      font-size: 24px;
      #title {
        font-size: 28px;
        margin: 0 10px 0 0;
      }
    }
    span {
      margin: 0 10px 0 10px;
    }
  }
}

// 导入的盒子样式
#box {
  background: #f6f6f6;
  padding: 0 20px 20px;
  h2 {
    padding: 10px 0;
    margin-bottom: 10px;
  }
}

// 使用deep
// element-ui的时候经常会遇到需要修改组件默认样式
/deep/.el-breadcrumb__inner {
  color: #ffffff !important;
}
</style>
