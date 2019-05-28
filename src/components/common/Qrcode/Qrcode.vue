<template>
  <div class="query">
    <canvas :class="classNames"></canvas>
  </div>
</template>

<script>
  import QRCode from 'qrcode'
  import api from '../../../public/api'
  const HostName=window.location.origin
  export default {
    name: "qrcode",
    props:{
      classNames:{
        type:String,
        default:''
      },
      querydetail:{
        typer:String,
        default:''
      }
    },
    data(){
      return{
      }
    },
    created(){
    },
    methods:{
      //动态生成二维码
      useqrcode(val,index){
        //生成的二维码内容，可以添加变量
        var that=this
        this.QueryDetail=HostName+"/envelope/"+val;
        //console.log(this.QueryDetail,2222222222)
        var canvas = document.getElementsByClassName(this.classNames)[0]
        QRCode.toCanvas(canvas, this.QueryDetail,function (error,success) {
          if(success){
            that.$emit('renderCanvans',index)
          }
          if (error) {
            console.error(error)
          }
        })
      }
    }
  }
</script>

<style scoped type="text/scss" lang="scss" rel="stylesheet/scss">
  .query{

    .canvas1{
      width: 92px!important;
      height: 92px!important;
    }
    .canvas2{
      width: 186px!important;
      height:186px!important;
    }
  }

</style>
