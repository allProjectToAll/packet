<template>
  <div class="send-ordinary-packet">
    <div class="scroll-div">
      <div class="send-packet-top">
        <img src="../../assets/imgs/ordinaryPacket/send-ordinary-packet-top-bg@2x.png"/>
        <div class="top-mess">{{$t('sendOrdinary.topTitle')}}</div>
      </div>
      <div class="detail-form">
        <img src="../../assets/imgs/ordinaryPacket/step2@2x.png" class="step1"/>
        <p class="title">{{$t('sendOrdinary.packetDetail')}}</p>
        <div class="info-preview">
          <div class="packet-info">
            <p>
              <span class="label">{{$t('sendOrdinary.currencyLabel')}}</span>
              <span class="val">{{packet.currency}}</span>
            </p>
            <p>
              <span class="label">{{$t('sendOrdinary.totalAmountLabel')}}</span>
              <span class="val">{{packet.volume}}</span>
            </p>
            <p>
              <span class="label">{{$t('sendOrdinary.drawNumLabel')}}</span>
              <span class="val">{{packet.number}}</span>
            </p>
          </div>
          <div class="top-title">
            <img src="../../assets/imgs/ordinaryPacket/combined-shape@2x.png" alt="">
            <p class="packet-title">{{packet.title}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="next fixed-center">
      <div class="input-div">
        <span class="label">
          {{$t('sendOrdinary.assetPwdLabel')}}
        </span>
        <input type="password" v-model="tradePwd" :placeholder="$t('sendOrdinary.assetPwdLengthErr')" :maxlength="6">
      </div>
      <mt-button @click="submit">{{$t('sendOrdinary.confirmSubmit')}}</mt-button>
    </div>
    <verify-pop ref="phoneVerify" @success="createSuccess"></verify-pop>
  </div>
</template>

<script>
  import api from '../../public/api'
  import util from '../../public/util'
  import {Toast} from 'mint-ui'
  import verifyPop from '../common/verifyPop'
  export default {
    data() {
      return {
        packet: {
          currency:'', //币种
          volume:'', //总金额
          number:'',
          title:'',
          captcha:'',
          tid:'',
        },
        tradePwd:''
      }
    },
    computed: {},
    components:{
      verifyPop
    },
    watch:{
      'tradePwd'(){
        this.packet.tid = '';
      }
    },
    methods: {
      async submit() {
        let tradePwdValid = await this.validateTrade();
        if(tradePwdValid){
          this.sendCode();
        }
      },
      async validateTrade(){
        if(this.packet.tid.trim()){
          return true;
        }
        if(!this.tradePwd.trim()){
          Toast({
            message:this.$t('sendOrdinary.assetPwdPlc'),
            position:'middle'
          })
          return false;
        }
        if(this.tradePwd.length !== 6){
          Toast({
            message:this.$t('sendOrdinary.assetPwdLengthErr'),
            position:'middle'
          })
          return false;
        }
        let result;
        await api.post('/User/VerifyTradePassword',{
          tradePassword: this.tradePwd.trim()
        }).then((res)=>{
          this.packet.tid = res.data.value.tid;
          result = true;
        },()=>{
          result = false;
        })
        return result;
      },
      sendCode(){
        api.post('/NormalEnvelope/SendCreateCaptcha')
          .then(()=>{
            // open 验证码 popup
            this.$refs.phoneVerify.open(
              {url:'/NormalEnvelope/Create',params:Object.assign({},this.packet,{currency:this.packet.currency.toLowerCase()})},
              {url:'/NormalEnvelope/SendCreateCaptcha'});
          })
      },
      async createSuccess(id){
        this.$store.commit('SET_ORDINARY_PACKET',{});
        console.log(this.packet.appCallback);
        if(this.packet.appCallback){
          util.sendAppMsg({func:this.packet.appCallback,link:`${window.location.origin}/envelope/drawO/${id}?c=${this.packet.currency}&t=0`})
        }else{
          this.$router.replace({name:'ordinary',params:{type:'sendinfo',redId:id}});
        }
      }
    },
    created(){
      Object.assign(this.packet,this.$store.state.user.ordinaryPacket.packet);
    }
  }

</script>

<style lang="scss" type="text/scss" scoped>
  .send-ordinary-packet {
    width: 100%;
    position: relative;
    height: 100%;
  }
  .scroll-div {
    position: relative;
  }
  .send-packet-top {
    width: 100%;
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
    }
  }

  .detail-form {
    width: 100%;
    background: white;
    border-radius: 12px 12px 0 0;
    position: relative;
    overflow: hidden;
    top: -10px;
    padding:0 20px;
    padding-bottom:120px;
    box-sizing: border-box;
    .step1 {
      width: 220px;
      margin:30px auto;
      display: block;
    }
    .title {
      font-size: 18px;
      color: rgba(51, 51, 51, 1);
      margin-top:30px;
      /*font-weight: bold;*/
      font-family: PingFangSC_Bold;
    }
    .info-preview{
      margin-top:30px;
      .top-title{
        text-align: center;
        margin:24px auto;
        img{
          width:295px;
        }
        .packet-title{
          font-size:18px;
          line-height: 20px;
          font-family:PingFangSC_Regular;
          color:rgba(253,100,51,1);
          margin:20px 0;
          text-align: center;
        }
      }
      .packet-info{
        height:140px;
        background:rgba(246,246,246,1);
        border-radius:6px;
        padding:20px 20px 0;
        box-sizing: border-box;
        p{
          line-height: 19px;
          margin-bottom:20px;
          .label{
            font-size:14px;
            color:rgba(136,136,136,1);
            display: inline-block;
            width:80px;
          }
          .val{
            font-size:14px;
            color:rgba(51,51,51,1);
          }
        }
      }
    }
  }

  .next {
    // padding-bottom:0;
    left: 0;
    bottom: 0;
    position: fixed;
    width: 100%;
    height: 134px;
    background: white;
    box-sizing: border-box;
    box-shadow: 0px -2px 4px 0px rgba(51,51,51,0.2);
    padding:15px 20px;
    .input-div{
      margin-bottom:15px;
      position: relative;
      font-size: 14px;
      input{
        height:44px;
        background:rgba(246,246,246,1);
        border-radius:4px;
        padding-left:130px;
        font-size: 14px;
        width:100%;
        box-sizing: border-box;
      }
      .label{
        position: absolute;
        left:10px;
        top:12px;
        color:#555;
        line-height: 20px;
      }
    }
    .mint-button {
      width: 335px;
      height: 44px;
      background:linear-gradient(90deg,rgba(255,177,0,1),rgba(255,147,9,1));
      border-radius:4px;
      border: none;
      text-align: center;
      line-height: 44px;
      color: white;
      font-size: 16px;
      &:focus {
        outline: none;
      }
    }
  }

</style>

