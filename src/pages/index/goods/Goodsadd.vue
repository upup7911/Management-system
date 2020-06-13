<template>
  <div id="box">
    <h3>商品添加</h3>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="商品名称">
        <el-input class="name_input" v-model="name" placeholder="商品名称"></el-input>
      </el-form-item>
      <br />
      <el-form-item label="商品分类">
        <el-select v-model="category" placeholder="商品分类">
          <el-option :value="item" v-for="(item,index) in shopcate" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <br />
      <el-form-item label="商品价格">
        <el-input-number v-model="price" :min="1" :max="100" label></el-input-number>
      </el-form-item>
      <br />
      <el-form-item label="商品图片">
        <el-upload
          action="http://localhost:5000/goods/goods_img_upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
          :data="data"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>
      <br />
      <el-form-item label="商品描述">
        <el-input
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 6}"
          placeholder="请输入内容"
          v-model="goodsDesc"
        ></el-input>
      </el-form-item>
      <br />
      <el-form-item label>
        <el-button type="primary" @click="addcate()" class="el-icon-thumb"> 添加商品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { shop_categories,shop_add } from "@/api/shops";
export default {
  data() {
    return {
      name:'',//商品名称
      category:'',//商品分类
      price: 1,//默认商品价格
      imgUrl:"",//图片名  //商品图片地址
      goodsDesc:'',//商品描述
      value: true, // 是否启用
      shopcate: [], //商品分类数组
      data: { id: localStorage.id },//上传图片的id
      // 图片
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {
    // 图片上传功能
    handleRemove(file, fileList) {
      console.log(file, fileList);
      console.log(file.fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      console.log(file);
    },
    // 获取图片名称
    handleAvatarSuccess(file) {
      this.imgUrl = file.imgUrl
    },
    // 添加商品
    addcate(){
      shop_add(this.name,this.category,this.price,this.imgUrl,this.goodsDesc).then( res => {
        if(res.data.code == 0){
          this.$message({
          message: '恭喜你，商品添加成功！',
          type: 'success'
        });
          setTimeout(()=>{
            this.$router.push('/index/goods/goodslist')
          },1000)
        }else{
          this.$message.error('添加商品失败！');
        }
      })
    }
  },
  created() {
    // 获取商品分类--调取的是商品分类中设置了启用的值
    shop_categories().then(res => {
      this.arr = res.data.categories.map((cateName, index) => {
        return res.data.categories[index].cateName;
      });
      this.shopcate = this.arr;
    });
  }
};
</script>

<style lang="less" scoped>
h3{
  padding: 10px 0;
}
.name_input {
  width: 217px !important;
}
.el-button {
  margin-top: 10px;
}
/deep/.el-textarea__inner{
  width: 300px;
}
</style>