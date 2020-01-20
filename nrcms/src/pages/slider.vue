<template>
  <div class="slider">
  <vuescroll :ops="ops">
      <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" :collapse="isCollase" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened collapse-transition router >
      <el-menu-item index="/my">
        <i class="el-icon-setting"></i>
        <span slot="title">教室座位</span>
      </el-menu-item>
      <el-menu-item index="/selectDetail">
        <i class="el-icon-setting"></i>
        <span slot="title">信息查询</span>
      </el-menu-item>
      <el-menu-item index="/register">
        <i class="el-icon-setting"></i>
        <span slot="title">会员注册</span>
      </el-menu-item>
    </el-menu>
  </vuescroll>
  </div>
</template>

<script>
import vuescroll from 'vuescroll'
export default {
  components: {
    vuescroll
  },
  props:{
    isCollase:{
      type:Boolean,
      default:true
    }
  },
  created(){
    this.activeIndex=this.$route.path
  },
  data(){
    return {
      ops: {
        bar: {
          disable: true,
        }
      },
      activeIndex:'/my'
    }
  },
  watch:{
    '$route'(e){
      this.activeIndex=e.path
    }
  },
  mounted(){
  },
  methods: {
  }
}
</script>

<style >
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    height: 1800px;
  }
  .el-menu--collapse{
    height: 1800px;
  }
  .slider {
    height: 100%;
  }
  .sliderIcon {
    position: absolute;
    left: 0;
    width: 64px;
    z-index: 10000;
    background-color: rgb(50, 65, 87);
  }
  .sliderIcon .el-icon-location {
    margin: 0;
  }
  .sliderNav {
    position: absolute;
    left: 64px;
    top: 0;
    width: 100px;
  }
</style>
