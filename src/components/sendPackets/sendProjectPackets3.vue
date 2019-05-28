<template>
  <div class="sendProjectPackets">
    <!-- <button @click="clisks">点击</button> -->
    <div class="notFixed" ref="notFixed">
      <div class="sendPacketTop">
        <img src="../../assets/imgs/sendPacketTopBg.png" />
        <div class="top-mess">{{$t('sendProjectPacket.sendProjectPacket')}}</div>
      </div>
      <div class="detailBottom">
        <img src="../../assets/imgs/step3.png" class="step1"/>
        <p class="title">{{$t('sendProjectPacket.packDetail')}}</p>

        <p class="eachTitle">{{$t('sendProjectPacket.cashpoolSet')}}</p>
        <div class="eachType">
          <div class="eachEachLine">
            <span class="span1">{{$t('sendProjectPacket.currency')}}</span>
            <span class="span2">{{packetDetail.currency1}}</span>
          </div>
          <div class="eachEachLine">
            <span class="span1">{{$t('sendProjectPacket.currencyName')}}</span>
            <span class="span2">{{packetDetail.totalAmount}}</span>
          </div>
          <div class="eachEachLine">
            <span class="span1">{{$t('sendProjectPacket.getWay')}}</span>
            <span class="span2" v-if="!(packetDetail.isActived=='false'|| !packetDetail.isActived)">{{$t('sendProjectPacket.fixedAmount')}}</span>
            <span class="span2" v-if="(packetDetail.isActived=='false'|| !packetDetail.isActived)">{{$t('sendProjectPacket.randomAmount')}}</span>
          </div>
          <div class="eachEachLine">
            <span class="span1">{{$t('sendProjectPacket.getAmount')}}</span>
            <span class="span2" v-if="!(packetDetail.isActived=='false'|| !packetDetail.isActived)">{{packetDetail.eachPacket}} </span>
            <span class="span2" v-if="(packetDetail.isActived=='false'|| !packetDetail.isActived)">{{packetDetail.minNum}} ~ {{packetDetail.largestNum}}</span>
          </div>
          <div class="eachEachLine">
            <span class="span1">{{$t('sendProjectPacket.knowPeop')}}</span>
            <span class="span2">{{$t('sendProjectPacket.about')}} {{packetDetail.expectedNumber}} {{$t('sendProjectPacket.people')}}</span>
          </div>
        </div>

        <p class="eachTitle" v-show="!(packetDetail.isOpen=='false'|| !packetDetail.isOpen)">{{$t('sendProjectPacket.bigSettings')}}</p>
        <div class="eachType"  v-show="!(packetDetail.isOpen=='false'|| !packetDetail.isOpen)">
          <div class="eachEachLine">
            <span class="span1">{{$t('sendProjectPacket.currency')}}</span>
            <span class="span2">{{packetDetail.currency2}} </span>
          </div>
          <div class="eachEachLine">
            <span class="span1">{{$t('sendProjectPacket.currencyName')}}</span>
            <span class="span2">{{packetDetail.allCashBig}}</span>
          </div>
          <div class="eachEachLine">
            <span class="span1">{{$t('sendProjectPacket.getprizePeop')}}</span>
            <span class="span2">{{packetDetail.getCashMenber}}人</span>
          </div>
          <div class="eachEachLine">
            <span class="span1">{{$t('sendProjectPacket.prizeCash')}}</span>
            <span class="span2">{{packetDetail.winningAmount}}</span>
          </div>
          <div class="eachEachLine">
            <span class="span1">{{$t('sendProjectPacket.prizePercent')}}</span>
            <span class="span2">{{packetDetail.probabilityWinning}}</span>
          </div>
        </div>

        <p class="eachTitle">{{$t('sendProjectPacket.linkSetShow')}}</p>
        <div class="eachType">
          <p>
            <pre>{{packetDetail.linkFont}}</pre>
          </p>
          <div>
            <span>{{$t('sendProjectPacket.packsetLink')}}</span><span>{{getPackedUrl}}</span>
          </div>
        </div>

        <p class="eachTitle">{{$t('sendProjectPacket.imgShowForDe')}}</p>
        <div class="picBox" @click="openBigImg">
          <div class="picBoxTop" style="overflow:hidden;">
            <img v-if="!packetDetail.imgUrlAsync" src="../../assets/imgs/sendPaImg.jpg" class="bg"/>
            <div class="picBoxTopBg" v-if="packetDetail.imgUrlAsync" :style="{backgroundImage:'url('+packetDetail.imgUrl+')'}">
            </div>
            <!-- <img v-if="packetDetail.imgUrlAsync" :src="packetDetail.imgUrl" class="bg"/> -->
            <img src="../../assets/imgs/logo.png" class="logo" />
            <div class="propaganda"><!-- 推广宣传 -->
              {{packetDetail.propaganda}}
            </div>
          </div>
          <div class="picBoxBottom">

            <img src="../../assets/imgs/QRCodeBg.png" class="bg"/>
            <div class="randowMess"  v-if="(packetDetail.isActived=='false'|| !packetDetail.isActived)">
              <span>{{$t('sendProjectPacket.randomAmount')}}</span>
            </div>
            <div class="randowMess" v-if="!(packetDetail.isActived=='false'|| !packetDetail.isActived)">
              <p>{{$t('sendProjectPacket.theMoreGet')}}</p>
              <span>{{packetDetail.eachPacket}} {{packetDetail.currency1}}</span>
            </div>
            <div class="qrMe">{{$t('sendProjectPacket.saoGet')}}</div>
            <img src="../../assets/imgs/QRCode1.png" class="QRCode" />
            <div class="QRbtom">powered by AZEX</div>
            <div class="QRShowMess">{{$t('sendProjectPacket.QRCode')}}</div> <!-- 二维码上面显示的文字 -->
          </div>
        </div>

        <div class="linkTitle">{{$t('sendProjectPacket.telegramLink')}}</div>
        <input class="telegramInput" type="text" :placeholder="$t('sendProjectPacket.telegramLink')" v-model="packetDetail.link" disabled/>

        <div style="width:100%;height:30px;"></div>
        <div style="height:133px;width:335px;">&nbsp;</div>
      </div>
    </div>

    <div class="next fixed-center">
      <div class="bottomIputBox">
        <span>{{$t('sendProjectPacket.capitalPassword')}}</span>
        <input type="password" :class="{errorBorder:error}" :placeholder="$t('sendProjectPacket.enterPassword')" v-model="passwordCash"/>
        <p class="error" v-if="error">{{$t('sendProjectPacket.enterTruePassword')}}</p>
      </div>
      <button @click="toNext">{{$t('sendProjectPacket.submitTrue')}}</button>
    </div>

    <div class="shadow" v-if="bigImgShadowAsync">
      <div class="bigImg">
        <div class="bigImgTop">
          <!-- <img v-if="!packetDetail.imgUrlAsync" src="../../assets/imgs/sendPaImg.jpg" class="bg"/>
          <img v-if="packetDetail.imgUrlAsync" :src="packetDetail.imgUrl" class="bg"/> -->

          <img v-if="!packetDetail.imgUrlAsync" src="../../assets/imgs/sendPaImg.jpg" class="bg"/>
          <div class="picBoxTopBg" v-if="packetDetail.imgUrlAsync" :style="{backgroundImage:'url('+packetDetail.imgUrl+')'}">
          </div>
          <img src="../../assets/imgs/logo.png" class="logo" />
          <div class="propaganda"><!-- 推广宣传 -->
            {{packetDetail.propaganda}}
          </div>
        </div>
        <div class="bigImgBottom">
           <img src="../../assets/imgs/QRCodeBg.png" class="bg"/>
            <div class="randowMess"  v-if="(packetDetail.isActived=='false'|| !packetDetail.isActived)">
              <span>{{$t('sendProjectPacket.randomAmount')}}</span>
            </div>
            <div class="randowMess" v-if="!(packetDetail.isActived=='false'|| !packetDetail.isActived)">
              <p style="margin-bottom:3px;">{{$t('sendProjectPacket.theMoreGet')}}</p>
              <span>{{packetDetail.eachPacket}} {{packetDetail.currency1}}</span>
            </div>
            <div class="qrMe">{{$t('sendProjectPacket.saoGet')}}</div>
            <img src="../../assets/imgs/QRCode1.png" class="QRCode" />
            <div class="QRbtom">powered by AZEX</div>
        </div>
      </div>
      <div  class="closeImg"  @click="closeBigImg">
        <img src="../../assets/imgs/closeImg.png" />
      </div>
    </div>

    <verify-pop ref="phoneVerify" @success="createSuccess"></verify-pop>
    <load-send ref="loadSend" ></load-send>
    <creat-error ref="creatError" ></creat-error>
    <wait-for-creat ref="waitForCreat"></wait-for-creat>

  </div>
</template>

<script>
import api from "../../public/api";
import { Decimal } from "decimal.js";
// import phoneVerifyPop from "../common/phoneVerifyPop";
import util from '../../public/util.js'
import verifyPop from '../common/verifyPop'

import {Toast} from 'mint-ui';
import loadSend from '../common/loadSend'
import creatError from '../common/creatError'
import waitForCreat from '../common/waitForCreat'
export default {

  components:{
    verifyPop,
    loadSend,
    creatError,
    waitForCreat
  },
  data() {
    return {
      bigImgShadowAsync:false,
      error:false,
      passwordCash:"",
      getPackedUrl:util.ajax.defaults.baseURL +"/envelope/drawF/xxxxx",
      packetDetail:{
        currency1:"",
        totalAmount:"",//总金额
        isActived:"",//领取方式
        isOpen:"", //是否开启大奖
        eachPacket: "", //固定金额下单个红包的领取金额
        minNum:"", //最小金额
        largestNum: "", //最大金额
        expectedNumber: "", //预期人数
        currency2:"",
        allCashBig: "", //大奖的红包总金额
        getCashMenber: "", //大奖的红包的中奖人数
        winningAmount: "", //中奖金额
        probabilityWinning: "", //中奖概率

        linkFont:"",//链接文案
        propaganda:"",//宣传
        imgUrl:"",
        imgUrlAsync:"",
        imageId:"",//图片id
        link:"",//链接
      },
      oldPassword:"",
      tid:"",
    };
  },
  watch: {
    passwordCash(val,oldVal){
      if(/^[0-9]*$/.test(val)==false || val.toString().length>6){
        this.passwordCash = oldVal;
      }
    }
  },
  mounted(){

  },
  created() {
    let par={};
    if(this.$route.query.firstType.selectCurrency1){//点击下一步过来的
      par = this.$route.query;
    }else{//点击返回过来的
      par = this.$store.state.user.fission3;
    }
    if(!par.firstType){
      return;
    }
    console.log(par);
    // let par = this.$route.query;
    this.packetDetail={
        currency1:par.firstType.selectCurrency1,
        totalAmount:par.firstType.totalAmount,//总金额
        isActived:par.firstType.isActived,//领取方式
        isOpen:par.firstType.isOpen, //是否开启大奖
        eachPacket: par.firstType.eachPacket, //固定金额下单个红包的领取金额
        minNum:par.firstType.minNum, //最小金额
        largestNum: par.firstType.largestNum, //最大金额
        expectedNumber: par.firstType.expectedNumber, //预期人数
        currency2:par.firstType.selectCurrency2,
        allCashBig: par.firstType.allCashBig, //大奖的红包总金额
        getCashMenber: par.firstType.getCashMenber, //大奖的红包的中奖人数
        winningAmount: par.firstType.winningAmount, //中奖金额
        probabilityWinning: par.firstType.probabilityWinning, //中奖概率

        linkFont:par.secondType.linkFont,//链接文案
        propaganda:par.secondType.propaganda,//宣传
        imgUrl:par.secondType.imgsrc,
        imageId:par.secondType.imgId,
        imgUrlAsync:par.secondType.imgsrc==""?false:true,
        link:par.secondType.link,//链接
      }

  },
  methods: {
    clisks(){
      this.$refs.loadSend.open(true);
    },
    openBigImg(){
      this.bigImgShadowAsync = true;
    },
    closeBigImg(){
      this.bigImgShadowAsync = false;
    },
    toNext() {//确认资金密码
      if(this.passwordCash.toString().length==6){
        this.error = false;
        if(this.passwordCash == this.oldPassword){//如果没有改变密码，则不需要再一次验证密码的正确性
          this.submit(this.tid);
        }else{
          let par = {"tradePassword": this.passwordCash}
          api.post("/User/VerifyTradePassword",par).then((res)=>{
            this.oldPassword = this.passwordCash;
            this.error =false;
            this.tid = res.data.value.tid;
            this.submit(this.tid);
          }).catch((error) => {
            console.log(error)
            this.error =true;
          });
        }

      }else{
        this.error =true;
      }
    },
    createSuccess(id){//创建成功跳转路由
      this.clearMess();
      this.$refs.loadSend.open(true);//等待中
      let i=0;
      let Time = setInterval(()=>{
          i++;
        if(i==9){
          clearInterval(Time);
          this.$refs.loadSend.open(false);
          this.$refs.waitForCreat.open(true);//超过8秒继续等待中，跳转到我发布的红包
          return;
        }
        api.post("/DividedEnvelope/GetStatus",{"id": id}).then((res)=>{//判断红包状态
            console.log(res.data.value);
            if(res.data.value==1){//等待付款中(为了判断所有else失败)
            }else if(res.data.value==3){//成功
              clearInterval(Time);
              // 跳转红包详情页
              this.$router.replace({name:'fission',params:{type:"sendinfo",redId:id}})
            }else{//失败
              clearInterval(Time);
              this.$refs.creatError.open(true);
            }
        }).catch((error) => {
          console.log(error)
        });

      },1000)

    },
    clearMess(){//清除数据
      this.$store.commit('SET_FISSION1_PACKET',{});
      this.$store.commit('SET_FISSION2_PACKET',{});
      this.$store.commit('SET_FISSION3_PACKET',{});
    },
    submit(tid){//确定密码，短信验证完成之后提交信息

      let par={
            title: this.packetDetail.propaganda,//标题 宣传
            intro: this.packetDetail.propaganda,//简介  宣传
            imageId: this.packetDetail.imageId,//图片Id
            link: this.packetDetail.linkFont,//链接文本 链接文案
            groupLink: this.packetDetail.link,//群组链接
            currency: this.packetDetail.currency1.toLowerCase(),//币种
            minVolume: this.packetDetail.minNum?this.packetDetail.minNum:this.packetDetail.eachPacket,//最小数额，
            maxVolume: this.packetDetail.largestNum?this.packetDetail.largestNum:this.packetDetail.eachPacket,//最大数额
            volume: this.packetDetail.totalAmount,//数额 总额
            topPriceCurrency: this.packetDetail.currency2?this.packetDetail.currency2.toLowerCase():"",//大奖币种
            topPriceVolume: this.packetDetail.allCashBig,//大奖总数额
            topPriceNumber: this.packetDetail.getCashMenber,//大奖领取人数
            tid:tid,
            captcha:""
          }
          api.post("/DividedEnvelope/SendCreateCaptcha").then((res)=>{
            this.$refs.phoneVerify.open(
              {url:'/DividedEnvelope/Create',params:Object.assign({},par)},
              {url:'/DividedEnvelope/SendCreateCaptcha'});//验证码 (谷歌)(短信)(邮箱)
          }).catch((error) => {
            console.log(error)
          });

    }

  }
};
</script>

<style lang="scss" type="text/scss" scoped>
img{
   pointer-events: none;
}
.shadow{
  width:100%;
  height:100%;
  background:rgba(0,0,0,0.65);
  position:fixed;
  left:0;
  top:0;
  .bigImg{
    width:335px;
    height:500px;
    margin:20px;
    margin-top:24px;
    position:relative;
    .bigImgTop{
      width:100%;
      height:208px;
      position: relative;
      overflow:hidden;
      .picBoxTopBg{
        width:100%;
        height:100%;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
      }
      .bg{
        width:100%;
        min-height:208px;
      }
      .logo{
        position: absolute;
        width:88px;
        height:20px;
        left:15px;
        top:15px;
      }
      .propaganda{
        position:absolute;
        left:15px;
        bottom:20px;
        width:305px;
        font-size:14px;
        color:rgba(255,255,255,1);
        line-height:20px;
        text-align:center;
      }
    }
    .bigImgBottom{
      position:absolute;
      width:335px;
      height:291px;
      left:0;
      top:208px;
      .bg{
        width:100%;
        height:291px;
      }
      .randowMess{
        position: absolute;
        left:0;
        top:20px;
        width:335px;
        text-align:center;
        font-size:26px;
        font-weight:bolder;
        p{
          font-size:12px;
          color:rgba(136,136,136,1);
          font-weight:normal;
        }
      }
      .qrMe{
        position: absolute;
        left:0;
        top:75px;
        width:335px;
        text-align:center;
        color:rgba(136,136,136,1);
        font-size:12px;
      }
      .QRCode{
        position:absolute;
        left:93px;
        top:98px;
        width:150px;
        height:150px;

      }
      .QRbtom{
        position:absolute;
        width:100%;
        left:0;
        bottom:20px;
        color:rgba(178,178,178,1);
        font-size:12px;
        text-align:center;
      }
    }
  }


  .closeImg{
    position: absolute;
    left:168px;
    bottom:17px;
    cursor: pointer;
    width:40px;
    height:40px;
    img{
      width:40px;
    }
  }
}
.errorBorder{
  border:1px solid red;
}
.error{
  color:red;
  font-size:8px;
}
.sendProjectPackets {
  width: 100%;
  /*height: 100%;*/
  /*overflow: hidden;*/
  position: relative;
  .notFixed{
    position:relative;
    width:100%;
    /*height:100%;*/
    /*// overflow: auto;*/
    /*overflow-y: scroll;*/
  }
}
.sendPacketTop {
  width: 375px;
  height: 100px;
  position: relative;
  img {
    width: 100%;
  }
  .top-mess {
    position: absolute;
    width: 100%;
    left: 0;
    top: 30px;
    color: white;
    text-align: center;
    font-size:20px;
  }
}
.detailBottom {
  width: 375px;
  background: white;
  position: absolute;
  left: 0;
  top: 90px;
  border-radius: 12px 12px 0 0;
  .step1 {
    width: 320px;
    margin: 20px 0 0 27px;
  }
  .title {
    font-size: 18px;
    color: rgba(51, 51, 51, 1);
    margin: 30px 0 0 20px;
    font-weight: bold;
  }
}
.next {
  left: 0;
  bottom: 0;
  position: fixed;
  width: 375px;
  height: 133px;
  background: white;
  border-top: 1px solid #eee;
  box-shadow:0px -2px 4px #eee;
  button {
    width: 335px;
    height: 44px;
    background: linear-gradient(
      90deg,
      rgba(255, 142, 76, 1),
      rgba(253, 100, 51, 1)
    );
    border-radius: 4px;
    border: none;
    text-align: center;
    line-height: 44px;
    color: white;
    font-size: 16px;
    margin-left: 20px;
    margin-top: 18px;
    &:focus {
      outline: none;
    }
  }
}
.bottomIputBox{
  width:335px;
  height:44px;
  margin-left:20px;
  margin-top:15px;
  position:relative;
  font-size:14px;
  span{
    position:absolute;
    left:10px;
    top:12px;
  }
  input{
    width:335px;
    height:44px;
    background:rgba(246,246,246,1);
    border-radius:4px;
    text-indent: 130px;
  }
}
.eachTitle{
  height:22px;
  font-size:16px;
  color:rgba(136,136,136,1);
  margin-top:30px;
  margin-left:20px;
}
.eachType{
  width:335px;
  background:rgba(246,246,246,1);
  border-radius:6px;
  margin-left:20px;
  margin-top:10px;
  padding-top:10px;
  padding-bottom:10px;
  .eachEachLine{
    margin-left:20px;
    height:40px;
    line-height:40px;
    font-size:14px;
    .span1{
      width:80px;
      color:rgba(136,136,136,1);
      display:block;
      float:left;
      word-break: keep-all;
    }
    .span2{
      color:rgba(51,51,51,1);
      display:block;
      float:left;
    }
  }
  p{
    width:295px;
    word-break:break-all;
    font-size:14px;
    color:rgba(136,136,136,1);
    line-height:20px;
    padding:10px 20px 0 20px;
    pre{
      width:100%;
      white-space: pre-wrap; /*css-3*/
      white-space: -moz-pre-wrap; /*Mozilla,since1999*/
      white-space: -pre-wrap; /*Opera4-6*/
      white-space: -o-pre-wrap; /*Opera7*/
      word-wrap: break-word; /*InternetExplorer5.5+*/
    }
  }
  div{
    margin-left:20px;
    margin-right:20px;
    span{
      word-break:break-all;
      font-size:14px;
      color:rgba(136,136,136,1);
      line-height:20px;
    }
  }
}
.picBox{
  width:220px;
  height:327px;
  margin-left:78px;
  margin-top:10px;
  .picBoxTopBg{
    width:100%;
    height:100%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .picBoxTop{
    width:220px;
    height:136px;
    position: relative;
    // background:url(../../assets/imgs/sendPaImg.jpg) center center;
    .bg{
      // width:100%;
      position:absolute;
      left:50%;
      top:50%;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
    }
    .logo{
      width:50px;
      position:absolute;
      left:10px;
      top:10px;
    }
    .propaganda{
      width:200px;
      font-size:9px;
      color:rgba(255,255,255,1);
      line-height:13px;
      position:absolute;
      bottom: 13px;
      left:10px;
      text-align:center;
    }
  }
  .picBoxBottom{
    width:220px;
    height:191px;
    position: relative;
    .bg{
      width:220px;
    }
    .randowMess{
      position: absolute;
      left:0;
      top:16px;
      width:220px;

      span{
        width:100%;
        display:block;
        text-align:center;
        font-weight: bolder;
        font-size:20px;
      }
      p{
        width:100%;
        text-align:center;
        font-size:8px;
      }
    }
    .qrMe{
      width:220px;
      color:rgba(136,136,136,1);
      font-size:8px;
      text-align:center;
      position: absolute;
      left:0;
      top:55px;
    }
    .QRCode{
      width:92px;
      height:92px;
      position:absolute;
      left:64px;
      top:73px;
    }
    .QRbtom{
      position:absolute;
      width:220px;
      left:0;
      top:176px;
      text-align:center;
      color:rgba(178,178,178,1);
      font-size:8px;
    }
  }
}
.linkTitle{
  color:rgba(85,85,85,1);
  font-size:14px;
  margin-left:20px;
  margin-top:30px;
}
.telegramInput{
  width:335px;
  height:44px;
  background:rgba(246,246,246,1);
  border-radius:4px;
  margin-left:20px;
  margin-top:10px;
  text-indent: 15px;
}
.QRShowMess{
  font-size:8px;
  position:absolute;
  width:220px;
  left:0;
  bottom:66px;
  text-align:center;

}
</style>
