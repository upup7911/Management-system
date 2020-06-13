<template>
  <div id="box">
    <h3>管理员信息</h3>
    <div v-for="item in arr" :key="item.id">
      <p>管理员ID：{{ item.id }}</p>
      <p>账号：{{ item.acc }}</p>
      <p>用户组：{{ item.group }}</p>
      <p>创建时间：{{ item.time }}</p>
      <p id="addpic">
        <img :src="item.img" id="accpic" />
修改头像
        <el-upload
          class="avatar-uploader"
          action="http://localhost:5000/users/avatar_upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :data="data"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </p>
    </div>
  </div>
</template>

<script>
// import { API_checktoken } from "@/api/apis";
export default {
  data() {
    return {
      arr: [
        {
          id: "",
          acc: "",
          group: "",
          time: "",
          img: ""
        }
      ],
      data: { id: localStorage.id },
      //图片
      imageUrl: ""
    };
  },
  methods: {
    // 图片方法
    handleAvatarSuccess() {
      window.location.reload(); //重新刷新页面
      this.frss();
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 调用
    frss() {
      this.arr[0].id = localStorage.id;
      this.arr[0].acc = localStorage.account;
      this.arr[0].group = localStorage.userGroup;
      this.arr[0].time = localStorage.ctime;
      this.arr[0].img = localStorage.img;
    }
  },
  created() {
    this.frss();
  }
  //   });
  // }
};
</script>

<style lang="less" scoped>
#addpic {
  display: flex;
}
#accpic {
  height: 180px;
  margin: 10px;
}
p {
  line-height: 50px;
  border-bottom: 1px solid #ccc;
}
img {
  vertical-align: middle;
}
#box {
  padding: 20px !important;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px solid skyblue;
  margin: 10px 0 10px 10px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>