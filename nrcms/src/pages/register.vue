<template>
  <div class="register">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="手机号" prop='phoneNumber'>
        <el-input v-model.number="form.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop='names'>
        <el-input v-model="form.names"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop='gender'>
        <el-select v-model="form.gender" placeholder="选择性别">
          <el-option label="男" value="01"></el-option>
          <el-option label="女" value="02"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年级" prop='selectedOptions'>
        <el-cascader
          :options="options"
          v-model="form.selectedOptions"
        >
        </el-cascader>
      </el-form-item>
      <el-form-item label="卡片性质" prop='cardNature'>
        <el-radio-group v-model="form.cardNature" @change="changeRadio">
          <!-- <el-radio label="01">时间卡</el-radio> -->
          <el-radio label="02">储值卡</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="有效期" prop='date' v-if="form.cardNature==='01'">
        <div class="block">
          <el-date-picker
            v-model="form.date"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="金额" prop='times' v-if="form.cardNature==='02'">
        <el-input v-model.number="form.times" placeholder="请输入充值金额"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop='desc'>
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')" v-if='!Object.values(getUserArr).length'>立即创建</el-button>
        <el-button type="primary" @click="modification('form')" v-if='Object.values(getUserArr).length'>修改</el-button>
        <el-button  @click="resetForm('form')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          phoneNumber: '',
          names:'',
          gender: '',
          selectedOptions:[],
          cardNature:'02',
          date:'',
          times:'',
          desc:''
        },
        rules: {
          phoneNumber: [
            { required: true,pattern:/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/, message: '请正确输入手机号', trigger: 'blur'},
          ],
          names:[
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          gender: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          date: [
            { type: 'array', required: true, message: '请选择日期', trigger: 'change' }
          ],
          times: [
            { type: 'number', required: true, message: '请正确输入金额', trigger: 'blur' }
          ]
        },
        options: [{
          value: '01',
          label: '小学',
          children: [{
            value: '011',
            label: '一年级',
          }, {
            value: '012',
            label: '二年级',
          },{
            value: '013',
            label: '三年级',
          },{
            value: '014',
            label: '四年级',
          },{
            value: '015',
            label: '五年级',
          },{
            value: '016',
            label: '六年级',
          }]
        }, {
          value: '02',
          label: '初中',
          children: [{
            value: '021',
            label: '一年级',
          }, {
            value: '022',
            label: '二年级',
          }, {
            value: '023',
            label: '三年级',
          }]
        }, {
          value: '03',
          label: '高中',
          children: [{
            value: '031',
            label: '一年级',
          }, {
            value: '032',
            label: '二年级',
          }, {
            value: '033',
            label: '三年级',
          }]
        },{
          value: '04',
          label: '成人',
        }],
      }
    },
    mounted(){
      let haveMsg=Object.values(this.getUserArr)  //存储了数据
      if(haveMsg.length){
        let msg=this.getUserArr
        this.form.phoneNumber=msg.phone
        this.form.names=msg.names
        if(msg.level.length===3){
          this.form.selectedOptions=[msg.level.slice(0,2),msg.level]
        }else{
          this.form.selectedOptions=[msg.level]
        }
        if(msg.sex){
          this.form.gender=msg.sex
        }
        this.form.cardNature=msg.type
        if(msg.creatAnddue_time){
          this.form.date=msg.creatAnddue_time.split(',')
        }else{
          this.form.times=Number(msg.times)
        }
        this.form.desc=msg.content
        this.form.ID=msg.ID
      }
    },
    computed:{
      getUserArr(){
        return this.$store.getters.getUserArr
      }
    },
    methods: {
      changeRadio(e){
        this.form.date=''
        this.form.times=''
      },
      onSubmit() {
        console.log('submit!');
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$post('/register',{datas:this.form}).then(res=>{
              let {code,msg}=res.data
              if(code===200){
                this.$message({
                  message: '添加人员成功',
                  type: 'success'
                });
                this.resetForm('form')
              }else{
                this.$message({
                  message: msg,
                  type: 'error'
                });
              }
            })
          } else {
            this.$message({
              message: '请填写完整信息',
              type: 'error'
            });
            return false;
          }
        });
      },
      modification(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$post('/changeuser',{datas:this.form}).then(res=>{
              let {code,msg}=res.data
              if(code===200){
                this.$router.push({path:'/my'})
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                this.resetForm('form')
              }else{
                this.$message({
                  message: msg,
                  type: 'error'
                });
              }
            })
          } else {
            this.$message({
              message: '请填写完整信息',
              type: 'error'
            });
            return false;
          }
        });
      },
      resetForm(formName){
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style>
.register{
  text-align: left;
  width: 400px;
}
.register .el-select{
  width: 100%;
}
.register .el-date-editor {
  width: 100%;
}
</style>
