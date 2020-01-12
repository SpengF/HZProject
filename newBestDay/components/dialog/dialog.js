// components/dialog/dialog.js
function getDateStr(AddDayCount) {   
  var dd = new Date();    
  dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期    
  var y = dd.getFullYear();    
  var m = dd.getMonth()+1;//获取当前月份的日期    
  var d = dd.getDate();    
  return y+'-'+(m<10?'0'+m:m)+'-'+d;
}
const myDate =[getDateStr(0),getDateStr(1),getDateStr(2),getDateStr(3),getDateStr(4)];
const myHour =['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
const myMin =['10','20','30','40','50','59'];
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    timeShow:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    columns: [
      {
        values:myDate,
        className:'column1',
        defaultIndex: 0 //默认展示第几位，可根据需求来定
      },
      {
        values:myHour,
        className:'column2',
        defaultIndex: 11
      },
      {
        values:myMin,
        className:'column3',
        defaultIndex: 2
      },
    ],
    dates:[myDate[0],myHour[11],myMin[2]]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _onChange(event){
      const { picker, value, index } = event.detail;
      this.data.dates=value;
    },
    dialogconfirm(){
      this.triggerEvent('change',this.data.dates)
    }
  }
})
