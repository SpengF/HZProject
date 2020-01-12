import Toast from 'vant-weapp/toast/toast';
import Notify from 'vant-weapp/notify/notify';
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const showLoad =()=>{
  return Toast.loading({
    mask: true,
    message: '加载中...',
    duration: 0,       // 持续展示 toast
    forbidClick: true, // 禁用背景点击
  });
}
const hideLoad = ()=>{
  return Toast.clear();
}
const fail=(e)=>{
  return Toast.fail(e)
}
module.exports = {
  formatTime: formatTime,
  showLoad,
  hideLoad,
  fail,
  Notify
}
