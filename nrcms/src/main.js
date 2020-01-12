// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue'
import router from './router'
import store from './store/store'
import App from './App'
Vue.config.productionTip = false

Vue.use(ElementUI)
import {fetchget,fetchPost} from './api'
Vue.prototype.$post=fetchPost
Vue.prototype.$get=fetchget

router.beforeEach((to,from,next)=>{
  next()
})
//import CSS
import '../static/main.css'
import './assets/mock'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})