const axios=require('axios')
// axios.defaults.baseURL='http://www.shipengfeivip.top:9090/'
axios.defaults.baseURL='http://localhost:9090/'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
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