// pages/openDesk/openDesk.js
let load=require('../../utils/util.js')
let api=require('../../config/api.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkedResult:[],
    timeShow:false,
    timeShow2:false,
    user:{
      phoneNum:'',
      useStartTime:'',
      useEndTime:''
    },
    showUser:{
      useStartTime:'',
      useEndTime:''
    }
  },
  phoneNumInput(e){
    console.log(app.globalData)
    this.setData({
      'user.phoneNum':e.detail
    })
  },
  chooseTime(){
    this.setData({
      timeShow:true
    })
  },
  chooseTime2(){
    this.setData({
      timeShow2:true
    })
  },
  getTime(e){
    if(this.data.user.useEndTime){
      let startTime=e.detail.join(',').replace(/-|,|:/g,'')
      let endTime=this.data.user.useEndTime.join(',').replace(/-|,|:/g,'')
      if(endTime<startTime||endTime==startTime){
        // load.fail('结束时间不能小于开始时间');
        load.Notify({ 
          type: 'primary', 
          message: '结束时间不能小于开始时间',
          color: '#fff',
          duration:2000,
        })
        return
      }
    }
    let useStartTime=`${e.detail[0]}日${e.detail[1]}:${e.detail[2]}`
    this.setData({
      'user.useStartTime':e.detail,
      'showUser.useStartTime':useStartTime
    })
  },
  getTime2(e){
    if(!this.data.user.useStartTime){
      // load.fail('请先填写开始时间');
      load.Notify({ 
        type: 'primary', 
        message: '请先填写开始时间',
        color: '#fff',
        duration:2000,
      })
      return;
    }
    let startTime=this.data.user.useStartTime.join(',').replace(/-|,|:/g,'')
    let endTime=e.detail.join(',').replace(/-|,|:/g,'')
    if(endTime>startTime||endTime==startTime){
      let useEndTime=`${e.detail[0]}日${e.detail[1]}:${e.detail[2]}`
      this.setData({
        'user.useEndTime':e.detail,
        'showUser.useEndTime':useEndTime
      })
    }else{
      // load.fail('结束时间不能小于开始时间');
      load.Notify({ 
        type: 'primary', 
        message: '结束时间不能小于开始时间',
        color: '#fff',
        duration:2000,
      })
    }
  },
  back(){
    wx.navigateBack()
  },
  openDeskSure:function(){
    let _this=this;
    let feeMoney=_this.data.checkedResult.split(',').length*500
    console.log(feeMoney)
    let pages=getCurrentPages()
    let beforepage=pages[pages.length-2]
    if(!this.data.user.phoneNum){
      load.Notify({ 
        type: 'primary', 
        message: '请输入手机号',
        color: '#fff',
        duration:1000,
      })
      return
    }
    if(!this.data.user.useStartTime || !this.data.user.useEndTime){
      load.Notify({ 
        type: 'primary', 
        message: '请选择时间',
        color: '#fff',
        duration:1000,
      })
      return
    }
    load.showLoad()
    //先检查有没有注册
    wx.request({
      method:'post',
      url: api.checkRegister,
      data:{user:_this.data.user},
      success:function(res){
        if(res.data.code===200){

          // wx.request({
          //   method:'post',
          //   url: api.openDeskSure,
          //   data:{checkedResult:_this.data.checkedResult,user:_this.data.user,total_pay:feeMoney},
          //   success:function(res2){
          //     console.log(res2,99999)
          //     load.hideLoad()
          //     if(res2.data.code==200){
          //       load.Notify({ 
          //         type: 'success', 
          //         message: '预定成功',
          //         color: '#fff',
          //         duration:1000,
          //         onClose:()=>{
          //           wx.switchTab({url:'/pages/mine/mine'})
          //         }
          //       })
          //       beforepage.abolishDesk()
          //     }
          //   }
          // })

          //如果用户已经注册过
          wx.request({
            method:'get',
            url: api.getWechatPaySign,
            data:{
              openId:app.globalData.openid,
              total_pay:feeMoney,
              user:_this.data.user
            },
            success:(res)=>{
              let datas=res.data.data
              wx.requestPayment({
                timeStamp: datas.timeStamp,
                nonceStr: datas.nonceStr,
                package: datas.packages,
                signType: datas.signType,
                paySign: datas.paySign,
                success (res) {
                  //如果支付成功
                  wx.request({
                    method:'post',
                    url: api.openDeskSure,
                    data:{checkedResult:_this.data.checkedResult,user:_this.data.user,total_pay:feeMoney},
                    success:function(res2){
                      console.log(res2,99999)
                      load.hideLoad()
                      if(res2.data.code==200){
                        load.Notify({ 
                          type: 'success', 
                          message: '预定成功',
                          color: '#fff',
                          duration:1000,
                          onClose:()=>{
                            wx.switchTab({url:'/pages/mine/mine'})
                          }
                        })
                        beforepage.abolishDesk()
                      }
                    }
                  })
                },
                fail (res) { 
                  load.hideLoad()
                  console.log(222,res)
                }
              })
            }
          })
        }else{
          load.Notify({ 
            type: 'warning', 
            message: '未注册用户,请先注册',
            color: '#fff',
            duration:1000,
            onClose:()=>{
              wx.navigateTo({url:'/pages/register/register'})
            }
          })
        }
      }
    })
    // wx.request({
    //   method:'post',
    //   url: api.openDeskSure,
    //   data:{checkedResult:this.data.checkedResult,user:this.data.user},
    //   success:function(res){
    //     load.hideLoad()
    //     if(res.data.code==200){
    //       load.Notify({ 
    //         type: 'success', 
    //         message: '预定成功',
    //         color: '#fff',
    //         duration:1000,
    //         onClose:()=>{
    //           wx.switchTab({url:'/pages/mine/mine'})
    //         }
    //       })
    //       beforepage.abolishDesk()
    //     }else{
    //       // load.fail(res.data.msg);
    //       console.log(999)
    //       load.Notify({ 
    //         type: 'warning', 
    //         message: '未注册用户,请先注册',
    //         color: '#fff',
    //         duration:1000,
    //         onClose:()=>{
    //           console.log(111)
    //           wx.navigateTo({url:'/pages/register/register'})
    //         }
    //       })
    //     }
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options){
    this.setData({
      checkedResult:options.checkedResult,
      'user.phoneNum':app.globalData.PhoneNum
    })
    // const eventChannel=this.getOpenerEventChannel()
    // eventChannel.on('sendDesk',(res)=>{
    //   this.setData({
    //     checkedResult:res.data
    //   })
    // })
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