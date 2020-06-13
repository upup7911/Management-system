import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

//1 API：登录
// account：用户名
// password：密码
export const Login = (account, password) => axios.post('/users/checkLogin', {account,password})

//2 API：注册
// account：用户名
// password：密码
//userGroup：用户组
export const API_account = (account, password,userGroup) => axios.post('/users/add', {account,password,userGroup})

//3 API：获取账号列表
// currentPage：当前页码
// pageSize：每页条数
export const API_accountlist = (currentPage, pageSize) => axios.get('/users/list', {params:{currentPage,pageSize}})

//4 API：删除账号
// currentPage：当前页码
// pageSize：每页条数
export const API_accountDle = (id) => axios.get('/users/del', {params:{id}})

//5 API：批量删除账号
// ids：id值
export const API_batchDel = (ids) => axios.get('/users/batchdel', {params:{ids}})

//6 API：修改账号
// id：要修改账号的id
// account：账号
// userGroup：用户组
export const API_AccEdit = (id,account,userGroup) => axios.post('/users/edit', {id,account,userGroup})

//7 API：7.检查旧密码是否正确
// newPwd：新密码
// id：账号id
export const API_checkoldpwd = (oldPwd,id) => axios.get('/users/checkoldpwd', {params:{oldPwd,id}})

//8 API：修改密码
// newPwd：新密码
// id：账号id
export const API_editpwd = (newPwd,id) => axios.post('/users/editpwd', {newPwd,id})

//9 API：获取账号（个人中心）信息
// newPwd：新密码
export const API_accountinfo = (id) => axios.get('/users/accountinfo', {params:{id}})

//10 API：上传头像
// newPwd：新密码
// export const API_accountinfo = (id) => axios.get('/users/accountinfo', {params:{id}})

//11 API：验证token
// newPwd：新密码
export const API_checktoken = (token) => axios.get('/users/checktoken', {params:{token}})


