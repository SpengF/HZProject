// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue'
import router from './router'
import store from './store/store'
import App from './App'
import setrsaPassword from './plugins/md5'
Vue.config.productionTip = false

Vue.use(ElementUI)
import {fetchget,fetchPost} from './api'
Vue.prototype.$post=fetchPost
Vue.prototype.$get=fetchget
Vue.prototype.$setrsaPassword=setrsaPassword

router.beforeEach((to,from,next)=>{
    fetchPost('/checkToken').then(res=>{
      if(res.data.code && res.data.code == '8888'){  //token无效   //检验token是否过期
        router.push({path:'/logIn'})
        return res;
      }else{
        return res;
      }
    })
  next()
})
//import CSS
import '../static/main.css'
import './assets/mock'
import { format } from 'url';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})