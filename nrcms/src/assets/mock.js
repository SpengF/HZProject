// const Mock=require('mockjs');
import Mock from 'mockjs'
const Random=Mock.Random;
//获取侧边栏
let getMenu=req=>{
  let data=[];
  // let arrto=['/my','/news','/EN','/PE','/games']
  for(let i=0;i<10;i++){
    // let arr=Mock.mock({'to|1':arrto})
    let post={
      Title:Random.name(),
      sliderTitle:{smallTitle:[Random.name()],to:'/my'}
    }
    data.push(post)
  }
  return data;
}
Mock.mock('/getMenu',/post|get/i,getMenu)