<template>
  <div class="logIn">
    <el-form :model="user" status-icon ref="user" label-width="100px" class="demo-ruleForm loginForm">
      <el-form-item label="账号" prop="names">
        <el-input v-model.number="user.names"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="user.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="resetForm('user')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data(){
    return {
      user:{
        names:'',
        password:''
      }
    }
  },
  methods: {
    submitForm() {
      if(!this.user.names || !this.user.password){
        this.$message({
          message: '填写用户名或者密码',
          type: 'error'
        });
        return;
      }
      let password=this.$setrsaPassword(this.user.password)
      this.$post('/login',{username:this.user.names,password:password}).then(res=>{
        if(res.data.code==200){
          let token=res.data.data.token
          sessionStorage.setItem('token',token)
          this.$router.push({path:'/'})
        }else{
          this.$message({
          message: '用户名密码错误',
          type: 'error'
        });
        }
      })
    },
    resetForm(formName){
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style>
.loginForm{
  width: 20%;
  border: 1px solid black;
  padding: 30px;
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translateX(-50%)
}
</style>
