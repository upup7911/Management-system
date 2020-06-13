<template>
  <div id="box">
    <h2>添加账号</h2>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="account">
        <el-input v-model.number="ruleForm.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="部门">
        <el-select v-model="ruleForm.grounp" placeholder="选择等级">
          <el-option label="超级管理员" value="超级管理员"></el-option>
          <el-option label="普通管理员" value="普通管理员"></el-option>
        </el-select>
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
import { API_account } from "../../../api/apis";

export default {
  data() {
    var checkaccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
      setTimeout(() => {
        if (!String) {
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
        account: "",
        pass: "",
        checkPass: "",
        grounp: ""
      },
      // 输入的规则
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        account: [{ validator: checkaccount, trigger: "blur" }]
      },
      // 是否发送请求，先设置为true进入
      sendAcc: true
    };
  },
  methods: {
    // 提交
    submitForm() {
      // 密码相同情况下才发送
      if (this.ruleForm.pass == this.ruleForm.checkPass) {
        if (this.sendAcc == false) return;
        this.sendAcc = false;
        // 发送请求
        API_account(
          this.ruleForm.account,
          this.ruleForm.pass,
          this.ruleForm.grounp
        ).then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "恭喜你，注册成功了",
              type: "success"
            });
            (this.ruleForm.account = ""),
              (this.ruleForm.pass = ""),
              (this.ruleForm.checkPass = ""),
              (this.ruleForm.grounp = "");
          } else {
            this.$message.error("注册信息填写错误，注册失败！");
          }
        });
        // 设置倒计时3秒后恢复发送功能
        setTimeout(() => {
          this.sendAcc = true;
        }, 5000);
      } else {
        this.$message.error("密码不同注册失败");
      }
    },
    // 重置按钮
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
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