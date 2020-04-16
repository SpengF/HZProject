const axios=require('axios')
import router from '../router'
import baseURL from './baseURL.js'
axios.defaults.baseURL=baseURL.baseURL
// axios.defaults.baseURL='http://localhost:9090/'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
import {Loading } from 'element-ui'
let loadingInstance;
axios.interceptors.request.use(   //请求拦截器
  config=>{
    loadingInstance=Loading.service({
      lock: true,
      text: '数据加载中，请稍后...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    let token =sessionStorage.getItem('token')
    if(token){
      config.headers.HZTOKEN = token;
    }
    return config;
  },
  err => {
    loadingInstance.close()
    return Promise.reject(err);
  }
)
axios.interceptors.response.use(
  res=>{  //响应拦截器
  loadingInstance.close();
    return res;
},
err => {
  loadingInstance.close()
  return Promise.reject(err);
})
export function fetchPost(url,param){
  return new Promise((resove,reject)=>{
    axios.post(url,param).then(res=>{
      resove(res)
    }).catch(err=>{
      reject(err)
    })
  })
}
export function fetchget(url,param){
  return new Promise((resove,reject)=>{
    axios.get(url,param).then(res=>{
      resove(res)
    }).catch(err=>{
      reject(err)
    })
  })
}