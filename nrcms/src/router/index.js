import Vue from 'vue'
import Router from 'vue-router'

import index from '@/pages/index'
import my from '@/pages/my'
import logIn from '@/pages/logIn'
import register from '@/pages/register'
import selectDetail from '@/pages/selectDetail'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: to => {
        return '/my'
      },
      children: [
        {
          path: '/my',
          name: 'my',
          component: my
        },{
          path:'/register',
          name:'register',
          component:register
        },
        {
          path: '/selectDetail',
          name: 'selectDetail',
          component: selectDetail
        },{
          path:'/register',
          name:'register',
          component:register
        }
      ]
    },
    {
      path: '/logIn',
      name: 'logIn',
      component: logIn,
    }
  ] 
})
