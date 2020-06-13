import Vue from 'vue'
import vurrouter from 'vue-router'

import login from "../pages/Login"
import {API_checktoken} from '@/api/apis'

Vue.use(vurrouter);

const router = new vurrouter({
  routes: [
    {
      // 登录页
      path: '/',
      name: 'login',
      component: login
    },
    {
      // 首页
      path: '/index',
      name: 'index',
      component: () => import('../pages/Index'), 
      children: [
        {
          // 首页加载内容
          path: '/index/indexmsg',
          name: 'indexmsg',
          meta: {name:"super,normal"},
          component: () => import('../pages/index/Indexmsg'),
        },
        {
          // 个人中心
          path: '/index/user/my',
          name: 'my',
          meta: {name:"super,normal"},
          component: () => import('../pages/index/user/My'),
        },
        {
          // 订单管理
          path: '/index/Ordermanage',
          name: 'Ordermanage',
          meta: {name:"super,normal"},
          component: () => import('../pages/index/Ordermanage'),
        },
        {
          // 新增商品
          path: '/index/goods/goodsadd',
          name: 'goodsadd',
          meta: {name:"super"},
          component: () => import('../pages/index/goods/Goodsadd'),
        },
        {
          // 商品列表
          path: '/index/goods/goodslist',
          name: 'goodslist',
          meta: {name:"super"},
          component: () => import('../pages/index/goods/Goodslist'),
          // ,meta:['hhhhhh1']

        },
        {
          // 店铺管理1
          path: '/index/Shopmanage1',
          name: 'shopmanage1',
          meta: {name:"super,normal"},
          component: () => import('../pages/index/Shopmanage_1'),
        },
        {
          // 商品分类
          path: '/index/goods/goodsclass',
          name: 'goodsclass',
          meta: {name:"super"},
          component: () => import('../pages/index/goods/Goodsclass'),
        },
        {
          // 账号列表
          path: '/index/user/userlist',
          name: 'userlist',
          meta: {name:"super"},
          component: () => import('../pages/index/user/Userlist'),
        },
        {
          // 添加账号
          path: '/index/user/useradd',
          name: 'useradd',
          meta: {name:"super"},
          component: () => import('../pages/index/user/Useradd'),
        },
        {
          // 修改密码
          path: '/index/user/revisepwd',
          name: 'revisepwd',
          meta: {name:"super"},
          component: () => import('../pages/index/user/Revisepwd'),
        },
        {
          // 商品统计
          path: '/index/salescensus/Goodsall',
          name: 'Goodsall',
          meta: {name:"super"},
          component: () => import('../pages/index/salescensus/Goodsall')
        },
        {
          // 订单统计
          path: '/index/salescensus/Orderall',
          name: 'Orderall',
          meta: {name:"super"},
          component: () => import('../pages/index/salescensus/Orderall')
        }
      ]
    },
  ]
});

router.beforeEach((to,from,next) => {
  if(to.path != '/'){
    // 如果不是前往登录，开起token验证
    API_checktoken(localStorage.token).then(res =>{
      // console.log(res)
      // console.log(localStorage.token)
      if(res.data.code == 0){
        // 根据用户等级判断是否放行
        if(to.meta.name.includes(localStorage.role) == true){
          next()
        }else{
          this.$message({
            message: '你没有权限访问1',
            type: 'warning'
          });
          next(from.path)
        }
      }else{
        // 不放行
        next('/')

      }
    })
  }else next() //to.path=/
});

export default router