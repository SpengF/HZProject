// pages/consume/consume.js
let api=require('../../config/api.js')
let load=require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordList:[],
    nowtime:'',
    show: false,
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
  },
  tapshow(){
    this.setData({ show: true });
  },
  showPopup() {
    this.setData({ show: true });
  },
  onInput(event) {
    this.setData({
      currentDate: event.detail
    });
  },
  confirm(e){
    let time=e.detail.toString().slice(0,10)
    let {year,month}=this.gettimes(time)
    this.setData({nowtime:year+'-'+month})
    this.selectRecord(this.data.nowtime)
    this.onClose()
  },
  cancel(){
    this.onClose()
  },
  onClose() {
    this.setData({ show: false });
  },
  checkConsume(e){
    let item=JSON.stringify(e.currentTarget.dataset.record)
    wx.navigateTo({
      url: `/pages/record/record?detail=${item}`,
    })
  },
  gettimes(el){
    let e=Number(el+'000')
    let date = new Date(e);
    let Y = date.getFullYear() ;
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    let D = date.getDate();
    let h = date.getHours() + ':';
    let m = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();
    return {
      alltime:Y+'-'+M+'-'+D+'日'+h+m,
      year:Y,
      month:M,
      day:D
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let time=new Date().getTime().toString().slice(0,10);
    let {year,month}=this.gettimes(time)
    this.setData({nowtime:year+'-'+month}) //这里修改nowtime为当前时间
    this.selectRecord(this.data.nowtime)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // let time=new Date().getTime().toString().slice(0,10);
    // let {year,month}=this.gettimes(time)
    // this.setData({nowtime:year+'-'+month}) //这里修改nowtime为当前时间
    // this.selectRecord(this.data.nowtime)
  },
  selectRecord(even){
    wx.request({
      method:'post',
      url:api.selectDeskMsg,
      data:{datas:{phoneNumber:app.globalData.PhoneNum,datetime:even}},
      success:(res)=>{
        if(res.data.code==200){
          this.setData({recordList:res.data.data})
        }else{
          this.setData({recordList:[{
            names:'无记录',
            phone:'无记录',
            creat_time:'无记录',
            end_time:'无记录',
            all_times:'无记录',
            time:'无记录',
            balancetimes:'无记录',
            content:'无记录',
          }]})
          load.Notify({ 
            type: 'warning', 
            message: '当前月无记录',
            color: '#fff',
            duration:2000,
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})