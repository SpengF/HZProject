// pages/mine/mine.js
let api=require('../../config/api.js')
let load=require('../../utils/util.js')
import Dialog from 'vant-weapp/dialog/dialog';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNum:'',
    activeName:'',
    user:{
      balance:999,
      seatArray:[1,2,3]
    }
  },
  onChange(event) {
    this.setData({
      activeName: event.detail
    });
  },
  onClose(event){
    const {instance}=event.detail
    Dialog.confirm({
      message: `确定取消预约座位${event.currentTarget.dataset.id}吗`
    }).then(() => {
      wx.request({
        method:'post',
        url: api.abolishOrder,
        data:{deskid:event.currentTarget.dataset.id,phoneNum:this.data.phoneNum},
        success:(res)=>{
          console.log(res)
          if(res.data.code==200){
            this.onShow()
            load.Notify({ 
              type: 'success', 
              message: '取消成功',
              color: '#fff',
              duration:1000,
            })
          }
        }
      })
      instance.close();
    }).catch(() => {
      instance.close();
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      phoneNum:app.globalData.PhoneNum
    })
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
    wx.request({
      method:'post',
      url:api.selectUser,
      data:{datas:{phoneNumber:app.globalData.PhoneNum}},
      success:(res)=>{
        if(res.data.code==200){
          this.setData({
            'user.balance':res.data.data[0].times,
            'user.seatArray':res.data.data[0].deskMsg,
          })
          console.log(res.data.data[0])
        }else{
          //没有这个人就去跳到注册页面
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