// pages/register/register.js
let load=require('../../utils/util.js')
let api=require('../../config/api.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      phoneNumber: '',
      names:'',
      gender: '01',
      selectedOptions:[],
      cardNature:'02',
      date:'',
      times:'0',
      desc:''
    },
  },
  onChangeGender(event) {
    this.setData({
      'form.gender': event.detail
    });
  },
  onChangePhoneNumber(event){
    this.setData({
      'form.phoneNumber': event.detail
    });
  },
  onChangeNames(event){
    this.setData({
      'form.names': event.detail
    });
  },
  register(){
    // if(!this.data.form.phoneNumber){
    if(!/^1[3-578]\d{9}$/.test(this.data.form.phoneNumber)){
      load.Notify({ 
        type: 'warning', 
        message: '请正确输入手机号',
        color: '#fff',
        duration:1000,
      })
      return;
    }
    if(!this.data.form.names){
      load.Notify({ 
        type: 'warning', 
        message: '请输入姓名',
        color: '#fff',
        duration:1000,
      })
      return;
    }
    // console.log(this.data.form)
    wx.request({
      method:'post',
      url: api.register,
      data:{datas:this.data.form},
      success:(res)=>{
        if(res.data.code==200){
          load.Notify({ 
            type: 'success', 
            message: '注册成功',
            color: '#fff',
            duration:1000,
            onClose:()=>{
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          })
        }else{
          load.Notify({ 
            type: 'warning', 
            message: '已经注册过，请直接选座',
            color: '#fff',
            duration:1000,
          })
        }
      }
    })
  },
  abolishDesk(){
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.setData({
      'form.phoneNumber': app.globalData.PhoneNum,
      'form.gender': '01',
      'form.names': '',
    });
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