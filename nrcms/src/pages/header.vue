<template>
  <div class="headers">
    <div class="headers1">
      <img src="../../static/HZ.jpg" alt="" @click="showAllStu">
    </div>
    <div class="headers2">Do yourself</div>
    <div class="headers3">个人信息</div>
  <!-- 左侧弹出 -->
      <el-drawer
        title="所有人员"
        :visible.sync="drawer"
        direction="ltr"
        :before-close="handleClose">
        <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-tabs @tab-click="handleClick" v-model="active">
          <el-tab-pane label="全部学生" name="first"></el-tab-pane>
          <el-tab-pane label="余额排序" name="second"></el-tab-pane>
        </el-tabs>
        <el-collapse accordion>
          <el-collapse-item v-for="(item,i) in allusersMsg" :key="i" style="padding-left:15px;">
            <template slot="title">
              {{item.names}}<i class="header-icon el-icon-caret-right">{{item.phone}}</i> 余额:{{item.times}}
            </template>
            <div>实际充值总额:<span class="usersspan">{{item.truetimes}}</span></div>
            <div>性别:<span class="usersspan">{{item.sex==='01'?'男':'女'}}</span></div>
            <div v-if='item.Clevel'>年级:<span class="usersspan">{{item.Clevel}}</span></div>
            <div>办卡类型:<span class="usersspan">{{item.type==='01'?'时间卡':'储蓄卡'}}</span></div>
            <div>{{item.type==='01'?'有效期':'余额'}}:<span class="usersspan">{{item.times===''?item.creatAnddue_time.replace(',','到'):item.times}}</span></div>
            <div v-if="item.content">备注:<span class="usersspan">{{item.content}}</span></div>
            <!-- <div style="padding-top:15px">
              <el-button type="success" size='small' @click='seatUp(item)'>开桌</el-button>
              <el-button type="primary" size='small' @click='modification(item)'>修改</el-button>
            </div> -->
          </el-collapse-item>
        </el-collapse>
        </el-scrollbar>
      </el-drawer>
  </div>
</template>

<script>
export default {
  data(){
    return {
      active:'first',
      allusersMsg:[],
      drawer:false,
    }
  },
  methods:{
    showAllStu(){
      this.drawer=true;
      let tab={name:'first'}
      this.handleClick(tab)
    },
    handleClose(done){
      done()
    },
    handleClick(tab) {
      if(tab.name=='first'){
        this.allUser({order:false})
      }else if(tab.name=='second'){
        this.allUser({order:true})
      }
    },
    allUser(e){  //查询所有学生
      this.$post('selectAllUser',{datas:e}).then((res)=>{
        this.allusersMsg=res.data
      })
    }
  }
}
</script>

<style>
.el-drawer.ltr{
  width: 17% !important;
}
  .headers {
    display: flex;
    padding: 0;
  }
  .headers3 {
    flex: 1;
  }
  .headers1{
    width: 200px;
    padding-left: 60px;
    box-sizing: border-box;
    position: relative;
    background-color: #ededed;
    line-height: 0;
  }
  .headers1 img{
    width: 58px;
    cursor: pointer;
  }
  .headers1:after {
    content: '';
    display: block;
    width: 2px;
    height: 40px;
    background-color: #e4dfdf;
    position: absolute;
    right: 0;
    top: 10px;
}
  .headers2 {
    -webkit-box-flex: 3;
    flex: 3;
    text-align: left;
    padding-left: 100px;
    font-size: 20px;
    font-family: serif;
    color: #ad008c;
  }
</style>
