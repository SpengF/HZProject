<template>
  <div id="main">
    <!-- <headers></headers>
    <slider></slider>
    <router-view></router-view> -->
    <el-container>
    <el-header style="padding:0;">
      <headers></headers>
    </el-header>
    <div class="menuicon" @click="isCollapse=!isCollapse">
      <i class="el-icon-menu"></i>
    </div>
    <el-container>
      <el-aside width="auto" style="background-color: rgb(0, 155, 80);max-width: 248px">
        <!-- <button @click="turn">123</button> -->
        <slider  :is-collase="isCollapse"></slider>
      </el-aside>
      <el-container>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </el-container>
  </div>
</template>

<script>
import headers from './header'
import slider from './slider'
export default {
  // name:'index',
  data(){
    return {
      isCollapse:false
    }
  },
  components: {
    headers,
    slider
  },
  methods: {
  }
}
</script>

<style>
.el-main {
  background-color: #f2f2f2;
}
.el-header, .el-footer {
    text-align: center;
    line-height: 60px;
    padding: 0;
    border-bottom: 1px solid #ccc;
  }
  
  .el-aside {
    color: #333;
    text-align: center;
    line-height: 200px;
    border-right: 1px solid #ccc;
  }
  
  .el-main {
    color: #333;
    text-align: center;
  }
  
  body  .el-container {
    height: 100%;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .menuicon {
    position: absolute;
    width: 64px;
    background-color: black;
    height: 62px;
    color: #fff;
    font-size: 18px;
    text-align: center;
    line-height: 64px;
    cursor: pointer;
  }
  .myicon>.el-icon-location  {
    margin-right: 0;
  }
</style>
