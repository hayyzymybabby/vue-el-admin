import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/elements'
import * as filters from './common/utils/filters'
// 引入全局配置文件
import $conf from './common/config/config'
Vue.prototype.$conf = $conf

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
