import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

// 22.获取订单列表
export const order_list = (currentPage,pageSize,orderNo,consignee,phone,orderState,date) => axios.get('/order/list',{params:{currentPage,pageSize,orderNo,consignee,phone,orderState,date}})

// 23.含查询
// currentPage  当前页码
// pageSize     每页条数
// orderNo      订单号
// consignee    收货人
// phone        手机号
// orderState   订单状态
// date         时间范围----先不弄
export const order_search = (currentPage,pageSize,orderNo,consignee,phone,orderState,date) => axios.get('/order/search',{params:{currentPage,pageSize,orderNo,consignee,phone,orderState,date}})

// 24.获取订单详情
// id
export const order_detail = (id) => axios.get('/order/detail',{params:{id}})

// 25.修改订单
// id               要修改账号的id
// orderNo          订单号
// orderTime        下单时间
// phone            电话
// consignee        收货人
// deliverAddress   送货地址
// deliveryTime     送达时间
// remarks          备注
// orderAmount      订单金额
// orderState       订单状态
export const order_edit = (id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState) => axios.post('/order/edit',{id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState})








