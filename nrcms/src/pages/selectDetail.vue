<template>
  <div class="selectDetail">
    <el-form ref="form" :model="form" label-width="80px" :inline="true" :rules='rules'>
      <el-form-item label="手机号" prop='phoneNumber'>
        <el-input v-model="form.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="日期" prop='datetime'>
        <el-date-picker
          v-model="form.datetime"
          type="month"
          value-format="yyyy-MM"
          placeholder="选择月">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmitDesk('form')" v-if="!changeSelect">查询</el-button>
        <el-button type="primary" @click="onSubmitTimes('form')" v-if="changeSelect">查询</el-button>
        <el-button  @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="消费记录" name="first">
        <el-table
          ref="singleTable"
          :data="tableData"
          highlight-current-row
          style="width: 100%">
          <el-table-column
            label="序"
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            property="names"
            label="姓名"
            >
          </el-table-column>
          <el-table-column
            property="phone"
            label="手机号"
            sortable
            >
          </el-table-column>
          <el-table-column
            property="creat_time"
            label="使用开始时间">
          </el-table-column>
          <el-table-column
            property="end_time"
            label="使用结束时间">
          </el-table-column>
          <el-table-column
            property="all_times"
            label="上次余额">
          </el-table-column>
          <el-table-column
            property="time"
            label="本次消费">
          </el-table-column>
          <el-table-column
            property="balancetimes"
            label="余额">
          </el-table-column>
          <el-table-column
            property="content"
            label="备注">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="充值记录" name="second">
        <el-table
          ref="singleTable"
          :data="tableData2"
          highlight-current-row
          style="width: 100%">
          <el-table-column
            label="序"
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            property="names"
            label="姓名"
            >
          </el-table-column>
          <el-table-column
            property="phone"
            label="手机号"
            sortable
            >
          </el-table-column>
          <el-table-column
            property="creat_time"
            label="充值时间">
          </el-table-column>
          <el-table-column
            property="oldtimes"
            label="上次余额">
          </el-table-column>
          <el-table-column
            property="balancetimes"
            label="本次充值">
          </el-table-column>
          <el-table-column
            property="times"
            label="余额">
          </el-table-column>
          <el-table-column
            property="content"
            label="备注">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      changeSelect:false,
      activeName: 'first',
      tableData: [{
          names: '无数据',
          phone: '无数据',
          all_times: '无数据',
          time: '无数据',
          creat_time: '无数据',
          end_time: '无数据',
          balancetimes:'无数据',
          content:'无数据'
        }],
      tableData2: [{
        names: '无数据',
        phone: '无数据',
        times: '无数据',
        balancetimes:'无数据',
        oldtimes: '无数据',
        creat_time: '无数据',
        content:'无数据'
      }],
      form: {
        phoneNumber: '',
        datetime: '',
      },
      rules: {
        phoneNumber: [
          { required: true,pattern:/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/, message: '请正确输入手机号', trigger: 'blur'},
      ]},
    };
  },
  methods: {
    handleClick(tab, event) {
      this.changeSelect=!this.changeSelect;
    },
    onSubmitDesk(formName){
      console.log(1)
      let truephone=/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/.test(this.form.phoneNumber);
      if(truephone||this.form.datetime){
        this.$post('selectDeskMsg',{datas:this.form}).then(res=>{
          let {code,data}=res.data
          if(code===200){
            this.tableData=data;
          }else if(code==201){
            this.tableData=[{
              names: '无数据',
              phone: '无数据',
              all_times: '无数据',
              time: '无数据',
              creat_time: '无数据',
              end_time: '无数据',
              balancetimes:'无数据'
            }]
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
    onSubmitTimes(){
      let truephone=/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/.test(this.form.phoneNumber);
      if(truephone||this.form.datetime){
        this.$post('selectTimesMsg',{datas:this.form}).then(res=>{
          let {code,data}=res.data
          if(code===200){
            this.tableData2=data;
          }else if(code==201){
            this.tableData2=[{
              names: '无数据',
              phone: '无数据',
              times: '无数据',
              balancetimes:'无数据',
              oldtimes: '无数据',
              creat_time: '无数据',
              content:'无数据'
            }],
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
    resetForm(formName){
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style>
.selectDetail .el-form{
  text-align: left;
}
</style>
