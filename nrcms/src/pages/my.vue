<template>
  <div class="my">
    <el-form ref="form" :model="form" label-width="80px" :inline="true" :rules='rules'>
      <el-form-item label="手机号" prop='phoneNumber'>
        <el-input v-model="form.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop='names'>
        <el-input v-model="form.names"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">查询</el-button>
        <el-button  @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-alert
      v-if="tips"
      style="text-align:left;background-color:#93ff57;color:#000;margin-bottom: 10px;"
      :title="'此为'+(showMoney.user.type==='02'?'储蓄卡':'时间卡')+'用户'+showMoney.user.names+'。'+'手机号为:'+showMoney.user.phone"
      type="success"
      description='可以点击重置按钮,重置当前状态'
      :closable="false">
    </el-alert>
    <div class="brightRoom clearfix" :class="tips?'green':''">
      <p class="roomText">大厅独立桌</p>
      <span v-for="item in alldeskMsg.Ldesk" :key="item.ID+'brightRoom'" class="room" :class="item.stat==2?'reserve':''">
        <Card @callBack='CardcallBack' @reset="resetForm('form')" :endText="item.orderTime?('用户'+item.phone+'预定座位，时间'+item.orderTime):'座位使用完毕'" :showMoney='showMoney' :content='item.content' :title="'独立区'+(item.number)+'座'" :propendTime='item.expiration_time' :dataId="item.ID" :phone="item.phone"></Card>
      </span>
    </div>
    <div class="darkRoom clearfix" :class="tips?'green':''">
      <p class="roomText">闭关修炼区</p>
      <span v-for="item in alldeskMsg.Ddesk" :key="item.ID+'darkRoom'" class="room" :class="item.stat==2?'reserve':''">
        <Card @callBack='CardcallBack' @reset="resetForm('form')" :endText="item.orderTime?('用户'+item.phone+'预定座位，时间'+item.orderTime):'座位使用完毕'" :showMoney='showMoney' :content='item.content' :title="'闭关区'+(item.number+12)+'座'" :propendTime='item.expiration_time' :dataId="item.ID" :phone="item.phone"></Card>
      </span>
    </div>
    <div class="hallRoom clearfix" :class="tips?'green':''">
      <p class="roomText">大厅分享区</p>
      <span v-for="item in alldeskMsg.Hdesk" :key="item.ID+'hallRoom'" class="room" :class="item.stat==2?'reserve':''">
        <Card @callBack='CardcallBack' @reset="resetForm('form')" :endText="item.orderTime?('用户'+item.phone+'预定座位，时间'+item.orderTime):'座位使用完毕'" :showMoney='showMoney' :content='item.content' :title="'分享区'+(item.number+24)+'座'" :propendTime='item.expiration_time' :dataId="item.ID" :phone="item.phone"></Card>
      </span>
    </div>
        <!-- 左侧弹出 -->
      <el-drawer
        title="个人信息"
        :visible.sync="drawer"
        direction="rtl"
        :before-close="handleClose">
        <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-collapse accordion>
          <el-collapse-item v-for="(item,i) in allusersMsg" :key="i" style="padding-left:15px;">
            <template slot="title">
              {{item.names}}<i class="header-icon el-icon-caret-right">{{item.phone}}</i>
            </template>
            <div>性别:<span class="usersspan">{{item.sex==='01'?'男':'女'}}</span></div>
            <div v-if='item.Clevel'>年级:<span class="usersspan">{{item.Clevel}}</span></div>
            <div>办卡类型:<span class="usersspan">{{item.type==='01'?'时间卡':'储蓄卡'}}</span></div>
            <div>{{item.type==='01'?'有效期':'余额'}}:<span class="usersspan">{{item.times===''?item.creatAnddue_time.replace(',','到'):item.times}}</span></div>
            <div v-if="item.content">备注:<span class="usersspan">{{item.content}}</span></div>
            <div style="padding-top:15px">
              <el-button type="success" size='small' @click='seatUp(item)'>开桌</el-button>
              <el-button type="primary" size='small' @click='modification(item)'>修改</el-button>
            </div>
          </el-collapse-item>
        </el-collapse>
        </el-scrollbar>
      </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from '@/components/Card.vue'
export default {
  data(){
    return {
      showMoney:{
        money:false,
        user:{}
      },
      tips:false, //提示
      drawer:false,
      form: {
        phoneNumber: '',
        names: '',
      },
      rules: {
        phoneNumber: [
          { required: true,pattern:/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/, message: '请正确输入手机号', trigger: 'blur'},
      ]},
      alldeskMsg:'',
      allusersMsg:[],
    }
  },
  watch:{
    'showMoney.user.type'(e){
      if(e==='02'){
        this.showMoney.money=true
      }else{
        this.showMoney.money=false
      }
    }
  },
  components:{
    Card
  },
  created(){
    this.selectdesk()
  },
  methods:{
    CardcallBack(){
      this.selectdesk()
      console.log('quxiao')
    },
    selectdesk(){
      this.$post('/selectdesk').then((e)=>{
        let {code,data,msg}=e.data
        if(code===200){
          this.alldeskMsg=data;
        }else{
          throw Error(msg)   //此处所有请求回来状态需要统一进行处理
        }
      })
      this.$store.commit('setUserArr',{})
    },
    onSubmit(formName){
      let truephone=/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/.test(this.form.phoneNumber);
      if(truephone||this.form.names){
        this.$post('selectUser',{datas:this.form}).then(res=>{
          let {code,data}=res.data
          if(code===200){
            this.allusersMsg=data;
            this.drawer=true;
          }else{
            this.$message({
              message: '没有匹配数据',
              type: 'error'
            });
          }
        })
      }else{
      this.$message({
        message: '请正确输入查询条件',
        type: 'error'
      });
      }
    },
    handleClose(done){
      done()
    },
    resetForm(formName){
      this.tips=false;
      this.showMoney.user={}
      this.$refs[formName].resetFields();
    },
    modification(e){
      this.$store.commit('setUserArr',e)
      this.$router.push({path:'/register'})
    },
    seatUp(e){
      this.tips=true;  //显示提示
      this.drawer=false;  //隐藏侧边栏
      this.showMoney.user=e
    }
  },
  computed:{
    ...mapGetters(
      {
        count:'getCount',
      },
    )
  },
}
</script>

<style>
.reserve{
  background-color: #efe92d;
  border-radius: 5px;
}
.green{
  border: 3px solid rgb(147, 255, 87);
}
.el-alert--success.is-light .el-alert__description{
  color: #000;
}
.el-collapse-item__content{
  font-size: 14px;
}
.usersspan{
  padding-left: 10px;
}
.el-drawer__body,.el-scrollbar{
  height: 100%;
}
.el-icon-caret-right{
  padding:0 10px;
}
.el-scrollbar__wrap{overflow-x: hidden;}
.my .el-form{
  text-align: left;
  background-color: #f3fefd;
  padding: 10px 0;
  margin-bottom: 10px;
  border-radius: 10px;
}
.my .el-form .el-form-item{
  margin-bottom: 0;
}
.brightRoom,.darkRoom,.hallRoom{
  padding: 10px;
}
.brightRoom{
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 10px;
}
.darkRoom{
  background-color: #cbcbcb;
  border-radius: 10px;
  margin-bottom: 10px;
}
.hallRoom{
  background-color: #e4e4fb;
  border-radius: 10px;
  margin-bottom: 50px;
}
.roomText{
  text-align: left;
  font-size: 18px;
}
.room{
  float: left;
  padding: 5px;
  height: 130px;
  font-size: 14px;
  text-align: left;
  width: 20%;
  box-sizing: border-box;
}
</style>
