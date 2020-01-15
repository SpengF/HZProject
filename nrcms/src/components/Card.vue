<template>
<div class="" :val='CtenMins'>
  <el-tooltip class="item" effect="dark" :content="textarea" placement="bottom" :disabled="textarea?false:true">
    <el-card class="box-card" :class=" Czeros?'': CtenMins?'el-card-willdown':'el-card-up'" :val='Czeros'>
      <div slot="header" class="clearfix">
        <span>{{title}}</span>
        <!-- <el-button style="float: right; padding: 3px 0;margin-left:10px" type="text">查看详情</el-button> -->
        <el-button style="float: right; padding: 3px 0;margin-left:10px" type="text" @click='seatUp()' v-if="endText=='座位使用完毕'?true:false">开座</el-button>
        <el-popover
          placement="top"
          width="160"
          v-model="visible">
          <p>关闭当前座位吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="seatDown">确定</el-button>
          </div>
          <el-button slot="reference" style="float: right; padding: 3px 0" type="text" v-if="endText=='座位使用完毕'?true:false">闭座</el-button>
          <el-button slot="reference" style="float: right; padding: 3px 0" type="text" v-if="endText=='座位使用完毕'?false:true">取消预定</el-button>
        </el-popover>
      </div>
      <Times :endTime='endTime' :callback="callback" :endText="endText" @tenMin='tenMin' @zero='zero'></Times>
    </el-card>
  </el-tooltip>
  
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="30%"
    >
    <span>
      <div class="block">
        <span class="demonstration">结束时间</span>
        <el-date-picker
          v-model="DateTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <el-time-picker
        class="HHAndmm"
        v-model="HourTime"
        value-format="HH:mm"
        format="HH:mm"
        placeholder="选择时分">
      </el-time-picker>
      <el-input placeholder="消费金额" v-model.number="money" v-if="showMoney.money" class="myinput"></el-input>
      <el-input
          class="myinput"
          type="textarea"
          placeholder="备注"
          v-model="textarea"
          show-word-limit
        >
        </el-input>
    </span>
    <span slot="footer" class="dialog-footer">
      <el-button  plain @click="dialogVisible = false" >取 消</el-button>
      <el-button plain @click="sureUpseat(dataId)">开座</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import Times from './time.vue'
import formDate from '../assets/util.js'
import qs from 'qs'
export default {
  props:['title','propendTime','dataId','content','showMoney','endText','phone'],
  data(){
    return {
      visible:false,
      tenMins:false,
      zeros:true,
      endTime:this.propendTime,
      dialogVisible:false,
      DateTime:'',
      HourTime:'',
      money:'',
      textarea:this.content,
    }
  },
  components:{
    Times
  },
  created(){
    this.getNowTime()
  },
  computed:{
    CtenMins(){
      return this.tenMins;
    },
    Czeros(){
      return this.zeros;
    }
  },
  methods:{
    callback(){
      this.textarea=''
      let obj={
        isminus:this.showMoney.money,
      }
      this.$post('/sureUpseat',{Id:this.dataId,endTime:'0',remark:'',money:obj,stat:0}).then(res=>{
        console.log(res) //开成功需要把money清空
      })
      this.$alert(this.title+formDate(this.endTime)+'结束了', '提示', {
        confirmButtonText: '确定'
      });
    },
    seatDown(){
      console.log(this.endText,this.dataId)
      this.visible = false;
      if(this.endText=='座位使用完毕'){
        //不是预定的座位取消
        this.zeros=true;
        this.endTime='0'
        this.textarea=''
        let obj={
          isminus:this.showMoney.money,
        }
        this.$post('/sureUpseat',{Id:this.dataId,endTime:'0',remark:'',money:obj,stat:0}).then(res=>{
          console.log(res)
        })
      }else{
        this.$post('/abolishOrder',{deskid:this.dataId,phoneNum:this.phone}).then(res=>{
          if(res.data.code==200){
            this.$message({
              message: '取消成功',
              type: 'success'
            });
            this.$emit('callBack')
          }
        })
      }
    },
    seatUp(){
      this.HourTime=''
      this.money=''
      this.dialogVisible=true;
    },
    tenMin(e){
      this.tenMins=e;
    },
    zero(e){
      this.zeros=e;
    },
    sureUpseat(id){
      if(this.HourTime==''){
        this.$message({
          message:'请选择时间',
          type :'error'
        })
        return;
      }
      let obj={}
      if(this.showMoney.money){
        if(this.money==''){
        this.$message({
          message:'请填写金额',
          type :'error'
        })
        return;
      }
        obj={
          isminus:this.showMoney.money,    //是否需要更改用户金额
          minus:this.money,               //此次花费金额
          allmoney:this.showMoney.user.times, //用户储蓄卡总金额
          ID:this.showMoney.user.ID  //用户ID
        }  //此信息为更改用户储值卡金额的信息
      }else{
        obj={
          isminus:this.showMoney.money,
        }
      }
      this.dialogVisible=false;
      let allTime=this.DateTime+' '+this.HourTime
      this.endTime =Date.parse(new Date(allTime))/1000+''
      //dosomeing 需要将结束时间传给后台
      this.$post('/sureUpseat',{Id:id,endTime:this.endTime,remark:this.textarea,money:obj,stat:1}).then(res=>{
        if(res.data.code===200){
          this.$emit('reset')
        }
      })
    },
    getNowTime() {
      var now = new Date();
      var year = now.getFullYear(); //得到年份
      var month = now.getMonth(); //得到月份
      var date = now.getDate(); //得到日期
      month = month + 1;
      month = month.toString().padStart(2, "0");
      date = date.toString().padStart(2, "0");
      var defaultDate = `${year}-${month}-${date}`;
      this.DateTime=defaultDate
    }
  }
}
</script>

<style>
  .HHAndmm{
    margin-left: 60px;
    padding-top: 10px;
  }
  .myinput {
      display: inline-block;
      width: 80%;
      vertical-align: bottom;
      padding-left: 60px;
      padding-top: 10px;
  }
  .el-dialog__body{
    text-align: left;
  }
  .el-card-up {
      border: 2px solid #00ff1a;
  }
  .el-card-willdown {
      border: 2px solid #fd7575;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
  .el-card__header{
    padding: 18px 14px;
    border-bottom: 1px solid #e6ebf5;
    box-sizing: border-box;
    text-align: left;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .el-dialog__header{
    text-align: left;
  }
</style>
