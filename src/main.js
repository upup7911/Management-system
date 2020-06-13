import Vue from 'vue'
import App from './App.vue'
// 导入router
import router from './router/router'
// 导入UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入全局样式
import './assets/styles/global.css'
// 引入字体
import './assets/fonts/iconfont.css'



// 安装 ElementUI
Vue.use(ElementUI);
Vue.config.productionTip = false
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
