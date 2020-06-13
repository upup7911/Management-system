import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

// 29.首页报表接口
export const echarts_totaldata = () => axios.get('/order/totaldata')

// 30.订单报表接口
export const echarts_ordertotal = (date) => axios.get('/order/ordertotal',{params:{date}})