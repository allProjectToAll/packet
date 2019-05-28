<template>
    <div class="fission-generalize">
      <div class="wraps">
        <h3 class="titles">{{generLizeInfos.title}}</h3>
        <p>{{$t('redInfo.shareInfo')}}</p>
        <div v-if="!generLizeInfos.isVisibe">
          <div v-show="hiddenCanvans" class="contents1" >
            <div  class="content-top" >
              <div v-if="imgData" class="imgHeader" :style="{backgroundImage:'url('+imageShow+')'}" ></div>
              <!--<img v-if="imgData" :src="imageShow"  style="width: 100%" alt="">-->
              <!-- &lt;!&ndash;<canvas v-if="imgData" ref="myCanvas" id="mycanvas" width="220" height="136"  style="border:none;background-color: transparent"></canvas>&ndash;&gt;
              <div v-if="imgData" style="width:220px;height: 136px;" id="wraaper"></div>-->
              <div v-else>
                <i class="ball1"></i>
                <i class="ball2"></i>
                <i class="ball3"></i>
              </div>
              <b class="login">
                <img src="../../../assets/imgs/redInfo/az-pt-logo-white-1.svg" alt="">
              </b>
              <!--<h3><span class="coin"></span><span>{{contentInfo.currency}}</span></h3>-->
              <div class="btm-box">
                <p>{{testData}}</p>
              </div>
            </div>
            <div class="content-btm">
              <h1 class="titleIcon">{{fixedMoney?`${randomPrice}${currency}`:$t('redInfo.randomMoney')}}</h1>
              <p>{{$t('redInfo.scan')}}</p>
              <div class="qr-code">
                <qrcode @renderCanvans="renderCanvans"  ref="qrcode1" :classNames="classNames"></qrcode>
              </div>
              <span>powered by AZEX</span>
            </div>
          </div>
          <div v-show="!hiddenCanvans" class="img1">
            <img  :src="hrefs"  alt="">
          </div>
        </div>
        <div v-else>
          <div v-show="hiddenCanvans" class="contests2" >
            <div class="qr_code_wrap">
              <qrcode @renderCanvans="renderCanvans" ref="qrcode2" :classNames="classNames"></qrcode>
            </div>
          </div>
          <div v-show="!hiddenCanvans" class="img2">
            <img :src="hrefs"  alt="">
          </div>
        </div>
      </div>
      <!--<div><img :src="hrefs" alt=""></div>-->
      <div class="savePhoto" v-if="!isPhone">
        <!--<a :href="hrefs" download target="_blank">{{$t('redInfo.savePto')}}</a>-->
        <a :href="hrefs" download target="_blank">{{$t('redInfo.savePto')}}</a>
      </div>
      <div class="savePhoto" v-if="isPhone" @click.prevent.stop="saveImg(isInApp)">
        <!--<a :href="hrefs" download target="_blank">{{$t('redInfo.savePto')}}</a>-->
        <a>{{$t('redInfo.savePto')}}</a>
      </div>
      <!--<div class="savePhoto" @click.prevent.stop="saveImg" v-else>
        &lt;!&ndash;<a :href="hrefs" download target="_blank">{{$t('redInfo.savePto')}}</a>&ndash;&gt;
        <a>{{$t('redInfo.savePto')}}</a>
      </div>-->
     <!-- <div style="width: 300px;height: 200px;overflow: hidden;background-color: #5f00d0" class="needTs" >
        <img width="300" height="200" src="http://192.168.125.231:8882/DividedEnvelope/Image/5b30bd704f3c591d644297d3"  @load="loadimg" alt="">
      </div>-->
    </div>
</template>

<script>
  import html2canvas from 'html2canvas'
  import Qrcode from '../Qrcode/Qrcode'
  import api from '../../../public/api'
  import Util from '../../../public/util'
  import Canvas2Image from '../../../public/canvas2image'
  import { Toast } from 'mint-ui';
  //import Dom2Svg from '../../../public/dom2svg'
  export default {
    name: "fission-generalize",
    props:{
      classNames:{
        type:String,
        default:''
      },
      links:{
        type:String,
        default:''
      },
      generLizeInfos:{
        type:Object,
        default:()=>{
          return {}
        }
      },
      wrapDom:{
        type:String,
        default:''
      },
      contentInfo:{
        type:Object,
        default:()=>{
          return {}
        }
      }
    },
    data(){
      return{
        hrefs:'',
        testData:'',
        imgData:'',
        hiddenCanvans:true,
        tempIndex:0,
        fixedMoney:'',
        randomPrice:0,
        currency:'',
        currentImg:''
      }
    },
    created(){
      /*console.log(Dom2Svg.dom2svg,222222)*/
    },
    mounted(){
     /* this.$nextTick(()=>{
        var c=document.getElementById('mycanvas')
        console.log(this.currentImg)
        console.log(c)
        var ctx=c.getContext("2d");
        ctx.drawImage(this.currentImg,0,0,220,136);
      })*/
    /* this.$nextTick(()=>{
       this.setCanvas()
     })*/
    },
    methods:{
      setCanvas(imgSrc){
        var that=this
        var c= document.createElement('canvas');
        c.width=220;
        c.height=136;
        var ctx=c.getContext("2d");
        var img=new Image();
        img.setAttribute('crossOrigin', 'Anonymous');
        img.src=imgSrc+'?timer='+new Date().getTime();
        img.onload=function () {
          ctx.drawImage(img,0,0,220,136);
          var titles=document.querySelector("#wraaper")
          titles.appendChild(c)
          that.gotoDrawPhoto()
        }
      },
      saveImg(isApp) {
        var that = this
        if (isApp) {
          //发送信息给app端
          Util.sendAppMsg({func: 'save_img', data: that.hrefs.split(',')[1]})
        } else {
          //console.log(that.hrefs.split(',')[1])
          Toast({
            message: `${that.$t('redInfo.pressSaved')}`,
            position: 'bottom',
            duration: 1000
          });
        }
      },
      gotoDrawPhoto(){
        var that=this
        //html2canvas 方法
        console.log(this.imageShow,'eeeeeeeeeeeeeeeeeeee')
        html2canvas(document.querySelector(`.${that.wrapDom}`),{
          useCORS: true,
          async:true,
          proxy:that.imageShow
        }).then(function(canvas) {
          that.hrefs=canvas.toDataURL(canvas.toDataURL())
          that.hiddenCanvans=false
        });
        //dom2svg方法
       // Dom2Svg.dom=document.querySelector(`.${that.wrapDom}`)
      },
      renderCanvans(index,loadImg){
        var that=this
        if(index==1){
          that.testData=that.contentInfo.intro
          that.imgData=that.contentInfo.imageId
          /*console.log('imgData',that.imgData)*/
          that.randomPrice=that.contentInfo.randomPrice
          that.fixedMoney=that.contentInfo.fixedMoney
          that.currency=that.contentInfo.currency
          /*that.setCanvas(that.imageShow)*/
          that.gotoDrawPhoto()
        }else if(index==2){
          html2canvas(document.querySelector(`.${that.wrapDom}`),{
            useCORS: true,
            async:true,
            proxy:that.imageShow
          }).then(function(canvas) {
            that.hrefs=canvas.toDataURL(canvas.toDataURL())
            that.hiddenCanvans=false
            //console.log(that.hrefs)
          });
        }
      },
      renderQrcode(data){
        if(!this.generLizeInfos.isVisibe){
          this.$nextTick(()=>{
            this.$refs.qrcode1.useqrcode(data,1)
          })
        }else {
          this.$nextTick(()=>{
            this.$refs.qrcode2.useqrcode(data,2)
          })
        }
      }
    },
    computed:{
      imageShow(){
        if(this.imgData){
          return api.getBaseUrl()+'/Image/'+this.imgData
        }else {
          return require('../../../assets/imgs/redInfo/bFssbottom.png')
        }
      },
      isPhone(){
        return Util.browserRedirect==1?false:true
      },
      isInApp(){
        return navigator.userAgent.search(/AZEX/i)>-1?true:false
      }
    },
    watch:{
    },
    components:{
      Qrcode
    }
  }
</script>

<style type="text/scss" scoped lang="scss" rel="stylesheet/scss">
  @import "~assets/style/public";
.fission-generalize{
  padding: 20px;
  .wraps{
    .titles{
      font-size:18px;
      font-family:PingFangSC_Bold;
      color:rgba(51,51,51,1);
      line-height:25px;
    }
    P{
      font-size:14px;
      font-family:PingFangSC_Regular;
      color:rgba(181,181,181,1);
      line-height:20px;
      margin-top: 10px;
    }
    .contents1{
      width: 220px;
      margin: 10px auto 30px;
      .content-top{
        height:136px;
        background:linear-gradient(135deg,rgba(39,130,116,1),rgba(57,146,158,1),rgba(34,65,125,1));
        position: relative;
        width: 220px;
        overflow: hidden;
        .imgHeader{
          width: 220px;
          height:136px;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
        }
        i{
          position:absolute;
          border-radius: 50%;
          background:linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0));
          &.ball1{
            height:115px;
            width: 115px;
            left: -24px;
          }
          &.ball2{
            width:82px;
            height:82px;
            right: -30px;
            top: 13px;
          }
          &.ball3{
            width:53px;
            height:53px;
            right: -1px;
            bottom: 13px;
          }
        }
        .login{
          position: absolute;
          width: 58px;
          height: 13px;
          left: 10px;
          top: 10px;
          //@include bg-image("~assets/imgs/redInfo/logo");
        }
        h3{
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 33px;
          width: 100%;
          span{
            font-size:14px;
            font-family:PingFangSC_Light;
            color:rgba(255,255,255,0.3);
            line-height:19px;
            &.coin{
              width: 14px;
              height: 19px;
              @include bg-image("~assets/imgs/redInfo/azapp_icon_btc");
              margin-right: 12px;
            }
          }
        }
        .btm-box{
          position: absolute;
          width: 100%;
          height: 52px;
          bottom: 0px;
          @include bg-image("~assets/imgs/redInfo/linear_change");
          p{
            padding: 13px 10px;
            margin: 0;
            font-size:9px;
            font-family:PingFangSC_Regular;
            text-align: center;
            color:rgba(255,255,255,1);
            line-height:13px;
          }
        }
      }
      .content-btm{
        width: 220px;
        padding-top: 16px;
        box-sizing: border-box;
        height: 202px;
        @include bg-image("~assets/imgs/redInfo/qr_code");
        background-size: cover;
        .titleIcon{
          //width: 69px;
          //height: 17px;
          font-family: MFShangYa;
          font-size: 17px;
          width: 100%;
          text-align: center;
          @include no-wrap();
          margin-bottom: 18px;
          color: #333333;
          font-weight: 500;
          /*@include bg-image("~assets/imgs/redInfo/random_money");*/
          margin: 0px auto 19px;
        }
        p{
          font-size:8px;
          margin: 0px;
          font-family:PingFangSC_Medium;
          color:rgba(136,136,136,1);
          line-height:7px;
          text-align: center;
        }
        .qr-code{
          width: 92px;
          height: 92px;
          margin: 14px auto 11px;
          background: transparent;
          overflow: hidden;
        }
        span{
          font-size:8px;
          display:block;
          text-align: center;
          margin: 0 auto;
          color:rgba(178,178,178,1);
          line-height:8px;
        }
      }
    }
    .img1{
      width: 220px;
      margin: 10px auto 30px;
    }
    .contests2{
      .qr_code_wrap{
        width:186px;
        height:186px;
        background:rgba(242,242,242,1);
        border-radius:4px;
        margin: 27px auto 38px;
      }
    }
    .img2{
      width:186px;
      height:186px;
      background:rgba(242,242,242,1);
      border-radius:4px;
      margin: 27px auto 38px;
    }
  }
  .savePhoto{
    width:130px;
    height:40px;
    background:linear-gradient(90deg,rgba(230,186,126,1),rgba(213,160,79,1));
    border-radius:50px;
    margin: 0 auto;
    text-align: center;
    a{
      font-size:14px;
      font-family:MicrosoftYaHei;
      text-decoration: none;
      color:rgba(255,255,255,1);
      line-height:40px;
    }
  }
}
</style>
