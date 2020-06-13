<template>
  <div id="box">
    <!-- 登录框 -->
    <el-form label-width="50px" class="login-box">
      <h3 class="login-title">欢迎登录芜湖餐饮管理系统</h3>
      <el-form-item label="账号">
        <el-input type="text" placeholder="请输入账号" v-model="username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" placeholder="请输入密码" v-model="pwd" />
      </el-form-item>
      <div id="button_box">
        <el-button type="primary" @click="onSubmit()">登录</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
// 引入axios
import { Login } from "../api/apis";
export default {
  data() {
    return {
      username: "admin",
      pwd: "12345", //先设置一个默认的密码，方便测试
      sendAcc: true // 是否发送请求，先设置为true进入
    };
  },
  methods: {
    onSubmit() {
      // 设置-防抖节流：3秒定时器..点击发送一次请求后需要等3秒后才能再发送
      if (this.sendAcc == false) return;

      // 发送一次登录请求后，把标识设置为false
      this.sendAcc = false;

      // 发送请求
      Login(this.username, this.pwd).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          //本地存储保存id、token、role
          localStorage.token = res.data.token; //token值
          localStorage.role = res.data.role; //用户组
          localStorage.id = res.data.id; //id值
          localStorage.user = this.username; //登录的用户名
          this.$message({
            message: "欢迎您进入芜湖餐饮管理系统！",
            type: "success",
            center: true
          });
          // 设置1秒后跳转到主页面
          setTimeout(() => {
            this.$router.push("/index/indexmsg");
          }, 1000);
        } else {
          this.$message.error("登录失败，用户名或密码错误");
        }
      });
      // 设置倒计时3秒后恢复发送功能
      setTimeout(() => {
        this.sendAcc = true;
      }, 3000);
    }
  },
};
</script>

<style lang="less" scoped>
// 大的登录框样式设置
.login-box {
  border: 1px solid #dcdfe6;
  width: 350px;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  box-shadow: 0 0 25px #909399;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(241, 236, 236, 0.6);
  z-index: 100;
}
/deep/.el-form-item__label{
  color: #000;
}
// 标题居中
.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
// 登录框居中
#button_box {
  text-align: center;
  margin: 0 auto;
}
</style>