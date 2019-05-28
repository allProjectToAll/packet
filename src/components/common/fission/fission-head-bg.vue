<template>
    <div class="fissionHead">
      <div v-if="FissionTakeInfo.imageId" class="fissionHeadwrapper" :style="{backgroundImage:'url('+imageIdUrL+')'}">
        <!--<img  :src="imageIdUrL" alt="" >-->
      </div>
       <div v-else>
         <i class="ball1"></i>
         <i class="ball2"></i>
         <i class="ball3"></i>
       </div>
      <div class="contentArea">
        <h1 style="height: 33px">
          <!-- <b></b>
           <span>{{currency.toLocaleUpperCase()}}</span>-->
        </h1>
        <p>{{FissionTakeInfo.intro}}</p>
      </div>
      <slot></slot>
    </div>
</template>

<script>
  import api from '../../../public/api'
  export default {
    name: "fission-head-bg",
    props:{
      currency:{
        type:String,
        default:''
      },
      FissionTakeInfo:{
        type:Object,
        default:()=>{
          return{}
        }
      },
    },
    computed:{
      imageIdUrL(){
        return `${api.getBaseUrl()}/Image/${this.FissionTakeInfo.imageId}`
      }
    }
  }
</script>
<style scoped type="text/scss" lang="scss" rel="stylesheet/scss">
  @import "~assets/style/public";
.fissionHead{
  position: relative;
  width:375px;
  height:233px;
  background:linear-gradient(135deg,rgba(39,130,116,1),rgba(57,146,158,1),rgba(34,65,125,1));
  .fissionHeadwrapper{
    width: 375px;
    height: 233px;
    overflow: hidden;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    img{
      width: 100%;
    }
  }
  i{
    position: absolute;
    background:linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0));
    border-radius: 50%;
    &.ball1{
      width:196px;
      height:196px;
      left: -34px;
    }
    &.ball2{
      width:139px;
      height:139px;
      right: -55px;
      top: 22px;
    }
    &.ball3{
      width:90px;
      height:90px;
      right: 0px;
      bottom:21px;
    }
  }
  .contentArea{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 56px;
    h1{
      display: flex;
      justify-content: center;
      align-items: center;
      b{
        width: 24px;
        height: 32px;
        display: inline-block;
        @include bg-image("~assets/imgs/redInfo/azapp_icon_btc");
        margin-right: 20px;
      }
      span{
        font-size:23px;
        font-family:PingFangSC_Light;
        color:rgba(255,255,255,1);
        line-height:33px;
      }
    }
    p{
      text-align: center;
      width: 315px;
      margin-top: 38px;
      height: 48px;
      font-size:14px;
      word-wrap: break-word;
      display: -webkit-box;
      /* autoprefixer: off*/
      -webkit-box-orient: vertical;
      /* autoprefixer: on*/
      -webkit-line-clamp: 2;
      overflow: hidden;
      font-family:PingFangSC_Regular;
      color:rgba(255,255,255,1);
      line-height:24px;
    }
  }

}
</style>
