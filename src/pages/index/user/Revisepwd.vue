<template>
  <div id="box">
    <h2>修改账号</h2>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="原密码" prop="oldpwd">
        <el-input v-model.number="ruleForm.oldpwd" @blur="testpwd()" placeholder="请输入原密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请再次输入新密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="resetForm('ruleForm')">
          <i class="el-icon-refresh"></i>重置
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 引入当前页面axios
import { API_checkoldpwd, API_editpwd } from "../../../api/apis";
export default {
  data() {
    var checkaccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
      setTimeout(() => {
        if (!Number) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldpwd: "",
        pass: "",
        checkPass: ""
      },
      // 输入的规则
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        oldpwd: [{ validator: checkaccount, trigger: "blur" }]
      },
      // 是否发送请求，先设置为true进入
      sendAcc: true,
      // 保存信息
      id: 0,
      acc: 0,
      pwd: 0,
      flag: true
    };
  },
  methods: {
    // 发送请求判断原密码是否填写正确
    testpwd() {
      API_checkoldpwd(this.ruleForm.oldpwd, this.id).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "原密码填写正确",
            type: "success"
          });
          this.flag = true;
        } else {
          this.$message.error("原密码填写错误");
          this.flag = false;
        }
      });
    },
    // 修改密码
    submitForm() {
      if (this.flag == true) {
        if (
          this.ruleForm.pass == this.ruleForm.checkPass &&
          this.ruleForm.pass != this.ruleForm.oldpwd
        ) {
          // 防抖节流
          if (this.sendAcc == false) return;
          this.sendAcc = false;
          // 发送请求
          console.log(this.ruleForm.pass);
          console.log(this.id);
          API_editpwd(this.ruleForm.pass, this.id).then(res => {
            if (res.data.code == 0) {
              this.$message({
                message: "恭喜你，修改成功了，请重新登录，1秒后跳转到登录页面",
                type: "success"
              });
              setTimeout(() => {
                this.$router.push("/");
              }, 1000);
            } else {
              console.log(res.data.code);
              this.$message.error("密码修改错误，原密码不能和新密码相同！");
            }
          });
          // 设置倒计时3秒后恢复发送功能
          setTimeout(() => {
            this.sendAcc = true;
          }, 5000);
        } else {
          this.$message.error("新密码不能和旧密码相同！");
        }
      } else {
        this.$message.error("信息填写错误，修改失败");
      }
    },
    // 重置按钮
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    this.id = localStorage.id;
  }
};
</script>

<style lang="less" scoped>
.el-input {
  width: 217px !important;
}

h2 {
  padding: 10px 0;
}
</style>