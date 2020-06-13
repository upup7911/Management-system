<template>
  <div id="box">
    <!-- 顶部 -->
    <div id="top">
      <h2>店铺管理</h2>
      <el-button type="primary" @click="save" id="save">保存</el-button>
    </div>
    <!-- 内容部分 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="店铺名字" :label-width="labelWidth">
        <el-input class="name_input" v-model="formInline.name"></el-input>
      </el-form-item>
      <br />
      <el-form-item label="店铺公告" :label-width="labelWidth">
        <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="formInline.bulletin"></el-input>
      </el-form-item>
      <br />
      <el-form-item label="店铺头像" :label-width="labelWidth">
        <el-upload
          class="avatar-uploader"
          :action="serverupload"
          :show-file-list="false"
          :on-success="avatarimgsuccess"
        >
          <img
            v-if="formInline.avatar"
            :src="servershopimg + formInline.avatar"
            width="150"
            class="avatar"
          />
          <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
        </el-upload>
      </el-form-item>
      <br />
      <el-form-item label="起送价格" :label-width="labelWidth">
        <el-input v-model="formInline.deliveryPrice"></el-input>
      </el-form-item>
      <el-form-item label="送达时间" :label-width="labelWidth">
        <el-input v-model="formInline.deliveryTime"></el-input>
      </el-form-item>
      <el-form-item label="店铺描述" :label-width="labelWidth">
        <el-input v-model="formInline.description"></el-input>
      </el-form-item>
      <br />
      <el-form-item label="店铺好评率" :label-width="labelWidth">
        <el-input v-model="formInline.score"></el-input>
      </el-form-item>
      <el-form-item label="店铺销量" :label-width="labelWidth">
        <el-input v-model="formInline.sellCount"></el-input>
      </el-form-item>
      <el-form-item label="配送费" :label-width="labelWidth">
        <el-input class="fee_input" v-model="formInline.minPrice"></el-input>
      </el-form-item>
      <br />
      <el-form-item label="活动支持" :label-width="labelWidth">
        <!-- 特殊 -->
        <el-checkbox-group v-model="type">
          <el-checkbox v-for="itm in organList" :label="itm" :key="itm">{{itm}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <br />
      <el-form-item label="营业时间" :label-width="labelWidth">
        <el-time-picker
          is-range
          v-model="formInline.date"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
        ></el-time-picker>
      </el-form-item>
      <br />
      <el-form-item label="店铺图片" :label-width="labelWidth">
        <el-upload
          :action="serverupload"
          list-type="picture-card"
          :on-success="handleAvatarSuccess"
          :on-remove="handleRemove"
          :file-list="fileList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <!-- <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  shop_info,
  shopEdit,
  SERVER_SHOP_IMG,
  SERVER_UPLOAD
} from "@/api/shops";
export default {
  data() {
    return {
      // 活动内容
      organList: [
        "在线支付满28减5",
        "VC无限橙果汁全场8折",
        "单人精彩套餐",
        "特价饮品8折抢购",
        "单人特色套餐"
      ],
      fileList: [], //上传店铺图片动态显示
      dialogImageUrl: "", //图片
      dialogVisible: false, //图片
      labelWidth: "100px", //label的宽度
      formInline: {}, // 数据储存
      type: [], //活动支持
      serverupload: SERVER_UPLOAD, //服务器上传图片接口地址
      servershopimg: SERVER_SHOP_IMG //服务器获取商店图片地址
    };
  },
  methods: {
    // 头像上传
    avatarimgsuccess(res) {
      this.formInline.avatar = res.imgUrl;
    },
    // 点击保存编辑后的内容
    save() {
      let newobj = { ...this.formInline };
      newobj.supports = JSON.stringify(this.formInline.supports); //活动
      newobj.date = JSON.stringify(this.formInline.date); //营业时间
      newobj.pics = JSON.stringify(this.formInline.pics); //店铺图片
      shopEdit(newobj).then(res => {
        console.log(res);
        console.log(newobj);
        if (res.data.code == 0) {
          this.$message({
            message: "恭喜你，修改成功！",
            type: "success"
          });
        } else {
          this.$message.error("修改失败，请重新输入！");
        }
      });
    },
    // 店铺图像上传成功
    handleAvatarSuccess(file) {
      this.formInline.pics.push(file.imgUrl);
    },
    handleChange(value) {
      console.log(value);
    },
    // 店铺图片删除
    handleRemove(fileList) {
      console.log(fileList)
      for (var p in this.formInline.pics) {
        if (this.formInline.pics[p] === fileList.name) {
          this.formInline.pics.splice(p, 1);
        }
      }
      //构造函数
      // Array.prototype.delete = function(val) {
      //   var index = this.indexOf(val);
      //   if (index > -1) {
      //     this.splice(index, 1);
      //   }
      // };
      // this.formInline.pics.delete(fileList.name);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 获取数据
    getdata() {
      shop_info().then(res => {
        this.formInline = res.data.data;
        // 店铺动态上传已有图片
        this.fileList = res.data.data.pics.map(item => {
          return {
            name: item,
            url: this.servershopimg + item
          };
        });
        this.type = this.formInline.supports; // 活动支持
      });
    }
  },
  created() {
    this.getdata();
  }
};
</script>

<style lang="less" scoped>
#box {
  background: #f6f6f6;
  #top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    #save {
      position: fixed;
      top: 90px;
      right: 70px;
    }
  }
  .name_input {
    width: 300px;
  }
  .block {
    width: 100px;
    height: 100px;
    img {
      // border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  }
  // textinput
  /deep/.el-textarea__inner {
    width: 400px !important;
  }

  // 店铺图片
  #shop_imgs {
    padding: 10px;
    width: 100px;
    height: 100px;
    overflow: hidden;
  }
}
</style>