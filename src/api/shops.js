import axios from 'axios';

// axios.defaults.baseURL = ;
// export const SERVER_IP = 'http://localhost:5000'
// // 获取服务器封装地址
// // 服务器上传店铺头像API地址
// export const SERVER_SHOP_IMG = SERVER_IP + '/upload/shop/'
// //服务器店铺图片地址
// export const SERVER_UPLOAD = SERVER_IP + '/shop/upload'


// axios.defaults.baseURL = SERVER_IP
//服务器IP地址
export const SERVER_IP = 'http://localhost:5000'
//服务器上传图片API地址
export const SERVER_UPLOAD = SERVER_IP + '/shop/upload/'

// ---------------------------   获取服务器各类图片地址 ------------------------------------//
//服务器店铺图片地址
export const SERVER_SHOP_IMG = SERVER_IP + '/upload/shop/'
// //服务器商品图片地址
// export const SERVER_GOODS_IMG =  SERVER_IP + '/shop/upload'
// //服务器用户头像图片地址
// export const SERVER_USERS_IMG =  SERVER_IP + '/shop/upload'

axios.defaults.baseURL = SERVER_IP


// 12.添加分类
// cateName：分类名称
// state：是否启用
export const shop_addcate = (cateName,state) => axios.post('/goods/addcate', {cateName,state})

// 13.获取分类
// cateName：分类名称
// state：是否启用
export const shop_catelist = (currentPage,pageSize) => axios.get('/goods/catelist', {params:{currentPage,pageSize}})

// 14.删除分类
// id：id值
export const shop_delcate = (id) => axios.get('/goods/delcate', {params:{id}})

// 15.修改分类
// id：id值
// cateName：分类名称
// state：分类状态
export const shop_editcate = (id,cateName,state) => axios.post('/goods/editcate', {id,cateName,state})

// 16.查询所有分类名称
export const shop_categories = () => axios.get('/goods/categories', {})

// 17.商品图片上传接口
export const shop_goods_img_upload = () => axios.post('/goods/goods_img_upload',{})

// 18.添加商品
// 参数		参数说明
// name		商品名称
// category	商品分类
// price	商品价格
// imgUrl	商品图片地址
// goodsDesc	商品描述
export const shop_add = (name,category,price,imgUrl,goodsDesc) => axios.post('/goods/add',{name,category,price,imgUrl,goodsDesc})

// 19.获取商品列表
// currentPage:当前页码
// pageSize：每页条数
export const shop_list = (currentPage,pageSize) => axios.get('/goods/list', {params:{currentPage,pageSize}})

// 20.删除商品
// id:id值
export const shop_list_del = (id) => axios.get('/goods/del', {params:{id}})

// 21.修改商品
// 参数		    参数说明
// name		    商品名称
// category	    商品分类
// price	    商品价格
// imgUrl	    商品图片地址
// goodsDesc	商品描述
// id:id值
export const shop_edit = (name,category,price,imgUrl,goodsDesc,id) => axios.post('/goods/edit',{name,category,price,imgUrl,goodsDesc,id})


// 26.获取店铺详情
export const shop_info = () => axios.get('/shop/info');


// 28.店铺内容修改
// id	            店铺id
// name	            店铺名称
// bulletin	        店铺公告
// avatar	        店铺头像
// deliveryPrice	起送价格
// deliveryTime	    送达时间
// description	    店铺描述
// score	        店铺好评率
// sellCount	    店铺销量
// supports	        活动支持
// date	            营业时间
// pics	            图片地址
// export const shopEdit = (id,name,bulletin,avatar,deliveryPrice,deliveryTime,description,score,sellCount,supports,date,pics) => axios.post('/shop/edit',{id,name,bulletin,avatar,deliveryPrice,deliveryTime,description,score,sellCount,supports,date,pics})
export const shopEdit = (params) => axios.post('/shop/edit',params)