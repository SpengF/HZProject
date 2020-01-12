let api=require('../../config/api.js')
let load=require('../../utils/util.js')
//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    refreshBtn:false,
    checkedResult: [],
    alldeskMsg:{},
  },
  //事件处理函数
  onChange(event){
    this.setData({
      checkedResult: event.detail
    });
  },
  openDesk(){
    let _this=this;
    wx.navigateTo({
      url: `/pages/openDesk/openDesk?checkedResult=${_this.data.checkedResult}`,
      // success(res){
      //   res.eventChannel.emit('sendDesk',{data:_this.data.checkedResult})
      // }  //此方法真机调试报错
    })
  },
  abolishDesk(){
    this.setData({
      checkedResult: []
    });
  },
  // showTips(e){    //上一个页面选择成功的页面
  //   wx.nextTick(()=>{
  //       load.Notify({ 
  //         type: 'success', 
  //         message: e,
  //         color: '#fff',
  //       })
  //     })
  // },
  refresh(){
    this.onShow()
  },
  onLoad(){
    app.userInfoReadyCallback=function(e){
      console.log('回调的'+e)
    }
  },
  onShow: function () {
    load.showLoad()
    let _this=this;
    wx.request({
      method:'post',
      url: api.selectdest,
      success: function(res) {
        _this.setData({
          refreshBtn:false
        })
        if(res.data.code==200){
          _this.setData({
            alldeskMsg:res.data.data
          })
          // Toast.clear()
          load.hideLoad()
        }
      },
      fail:function(){
        _this.setData({
          refreshBtn:true
        })
        load.fail('请检查网络是否正常');
      }
    })
  },
  getUserInfo: function(e) {
  },
})
