<template>
    <span :endTime="endTime" :callback="callback" :endText="endText">
        <slot>
            {{content}}
        </slot>
    </span>
</template>
<script>
    export default {
        data(){
          return {
            content: '',
            timer:null
          }
        },
        props:{
            endTime:{
                type: String,
                default :'' 
            },
            endText:{
              type : String,
              default:'已结束'
            },
            callback : {
                type : Function,
                default :''
            }
        },
        watch:{
          'endTime'(){
            if(this.endTime==='0'){
              clearInterval(this.timer)
              this.content = this.endText;
            }else{
              clearInterval(this.timer)
              this.countdowm(this.endTime)
            }
          }
        },
        mounted () {
          this.countdowm(this.endTime)
        },
        methods: {
          countdowm(timestamp){
            let self = this;
            this.timer = setInterval(()=>{
                let nowTime = new Date();
                let endTime = new Date(timestamp * 1000);
                let t = endTime.getTime() - nowTime.getTime();
                if(t>0){
                    self.$emit('zero',false)
                    let day = Math.floor(t/86400000);
                    let hour=Math.floor((t/3600000)%24);
                    let min=Math.floor((t/60000)%60);
                    let sec=Math.floor((t/1000)%60);
                    hour = hour < 10 ? "0" + hour : hour;
                    min = min < 10 ? "0" + min : min;
                    sec = sec < 10 ? "0" + sec : sec;
                    let format = '';
                    if(day > 0){
                      format =  `${day}天${hour}小时${min}分${sec}秒`;
                    }
                    if(day <= 0 && hour > 0 ){
                      format = `${hour}小时${min}分${sec}秒`;
                    }
                    if(day <= 0 && hour <= 0){
                      format =`${min}分${sec}秒`;
                    }
                    if(day <= 0 && hour <= 0 && min<10){
                      self.$emit('tenMin',true)
                    }else{
                      self.$emit('tenMin',false)
                    }
                    self.content = format;
                    }else{
                      self.$emit('zero',true)
                      self.content = self.endText;
                      clearInterval(this.timer);
                      if(timestamp!=0){
                        self._callback();
                      }
                    }
                },1000);
              },
              _callback(){
              if(this.callback && this.callback instanceof Function){
                    this.callback(...this);
                }
            }
        }
    }
</script>