// miniprogram/pages/main/main.js
const app = getApp()
let api=require('../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data:{
    // btnMsg:'开始使用',
    isauthorization:true,
    flafUserAndPhone:false,
    phonebtnMsg:'开始使用'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setEnableDebug({
      enableDebug: true
    })
  },
  bindgetuserinfo(e){
    if(e.detail.errMsg==="getUserInfo:ok"&&app.globalData.openid){
      this.setData({
        flafUserAndPhone:false
      })
      wx.switchTab({
        url: '/pages/index/index',
      })
    }else{
      this.setData({
        btnMsg:'重新授权',
        isauthorization:false
      })
    }
  },
  getPhoneNumber(e){
    if(e.detail.errMsg==="getPhoneNumber:ok"){
      wx.request({
        method:'post',
        url: api.getPhoneNum,
        data:{encryptedData:e.detail.encryptedData,iv:e.detail.iv},
        success(res){
          app.globalData.PhoneNum=res.data.data
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      })
    }else{
      this.setData({
        phonebtnMsg:'重新获取手机号',
        isauthorization:false
      })
    }
  },
})