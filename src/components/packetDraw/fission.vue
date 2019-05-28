<template>
  <div class="packet-draw-fission">
    <div class="packet-bg bg-fixed">
  </div>
    <div class="packet-top-bg">
      <img src="../../assets/imgs/packetDraw/big-packet-top-bg@2x.png" alt="">
    </div>
    <div class="packet-content" :class="{'needLogin':!isLogin && !isAZEX}" v-if="packet.normalAsset">
      <div class="award-big" v-if="packet.topPriceAsset">
        <img :src="`/static/imgs/${language}/azwep-icon-award-big@2x.png`|covImgPath" alt="">
      </div>
      <p class="packet-info">{{packet.intro}}</p>
      <p class="currecny">{{packet.normalAsset.currency.toUpperCase()}}</p>
      <div class="circle-div">
        <div class="head-img-circle">
          <img class="icon-bg" :src="packet.normalAsset.currency|currencyImgPath" alt="">
        </div>
      </div>
      <div v-if="packet.drawStatus===1">
        <div class="packet-title">
          <div class="random-text" v-if="packet.normalAsset.maxVolume !== packet.normalAsset.minVolume">
            <img :src="`/static/imgs/${language}/random_money_draw@2x.png`|covImgPath" alt="">
          </div>
          <div v-else>
            <p class="cur-text">{{$t('packet.canDrawText')}} {{packet.normalAsset.currency.toUpperCase()}}</p>
            <p class="cur-num Din-Medium">{{packet.normalAsset.maxVolume}}</p>
          </div>
        </div>
        <identity-auth class="identity-input" @success="checkCanDraw" :type="1" v-if="!isLogin && !isAZEX"></identity-auth>
        <div class="draw-btn" v-else>
          <p><img :src="`/static/imgs/${language}/share-more@2x.png`|covImgPath" class="share-tip" alt=""></p>
          <p><img :src="`/static/imgs/${language}/take-packet-btn@2x.png`|covImgPath" class="btn" alt="" @click="open"></p>
        </div>
      </div>
      <div v-else class="over-tip">
        <img :src="`/static/imgs/${language}/draw-over-tip@2x.png`|covImgPath" alt="" v-if="packet.drawStatus ===3" style="width:240px">
        <img :src="`/static/imgs/${language}/expired-tip@2x.png`|covImgPath" alt="" v-if="packet.drawStatus ===4" style="width:144px">
      </div>
    </div>
    <draw-suc ref="drawSuc"></draw-suc>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  import drawSuc from './drawSucDialog'
  import identityAuth from './identityAuth'
  import api from '../../public/api'
  import util from '../../public/util'
  import { MessageBox } from 'mint-ui'

  export default {
    metaInfo () {
      return {
        meta: [
          {
            name: 'description',
            content: '恭喜发财！大吉大利！'
          },
          {
            property: 'og:description',
            content: '恭喜发财！大吉大利！'
          },
          {
            name: 'twitter:description',
            content: '恭喜发财！大吉大利！'
          },
          {
            property: 'og:title',
            content: '来自AZEX的红包'
          },
          {
            property: 'og:type',
            content: 'website'
          },
          {
            property: 'og:image',
            content: 'https://www.biyong.info/images/redpacket-open.png'
          },
          {
            property: 'og:image:width',
            content: '480'
          },
          {
            property: 'og:image:height',
            content: '640'
          },
          {
            name: 'twitter:card',
            content: 'summary_large_image'
          },

          {
            name: 'twitter:site',
            content: '@BiYong'
          },
          {
            name: 'twitter:title',
            content: '来自AZEX的红包'
          },
          {
            name: 'twitter:image',
            content: 'https://www.biyong.info/images/redpacket-open.png'
          }
        ]
      }
    },
    data() {
      return {
        packet:{

        },
        isAZEX:util.browser.versions.AZEX
      }
    },
    components: {
      drawSuc,
      identityAuth
    },
    computed:{
      isLogin(){
        return this.$store.state.user.isLogin
      },
      language(){
        return this.$store.state.user.language
      }
    },
    methods: {
      open() {
        if(!this.isLogin && this.isAZEX){
          util.sendAppMsg({
            func:'login'
          });
          return;
        }
        // 领取红包
        api.post('/DividedEnvelope/Draw',{
          id:this.$route.params.id,
          promoteId:this.$route.query.pid || 0, //一级推广人 id
        }).then((res)=>{
          // 领取成功展示成功效果
          util.sendAppMsg({
            func:'silent_join_telegram_group',
            link:this.packet.groupLink
          })
          this.$refs.drawSuc.open(Object.assign({
            id:this.$route.params.id,
            type:'fission'
          },res.data.value));
        },(res)=>{
          if(res.data && res.data.err.code === 2){
            MessageBox({
              title: this.$t('message.confirmTip'),
              message: this.$t('draw.drawNeedBindPhone'),
              confirmButtonText: this.$t('draw.drawNeedBindPhoneConfirm'),
              cancelButtonText: this.$t('draw.drawNeedBindPhoneCancel'),
              showCancelButton: true
            }).then((action)=>{
              if(action === 'confirm'){
                util.sendAppMsg({
                  func:'bound_phone'
                })
              }
            });
          }
        })
      },
      async checkCanDraw(){
        await this.getPacketInfo();
        if(this.packet.drawStatus !==2 ){
          this.open();
        }
      },
      goDetail(){
        this.$router.replace({
          name: 'fission',
          params:{
            type: 'receiveinfo',
            redId: this.$route.params.id
          }

        })
      },
      async getPacketInfo(){
        api.post('/DividedEnvelope/GetDrawInfo',{
          id:this.$route.params.id
        }).then((res)=>{
          this.packet = res.data.value;
          this.packet.drawStatus = this.getDrawStatus();
          if(this.packet.drawStatus === 2 ){
            this.goDetail();
          }
        })
      },
      getDrawStatus(){
        if(this.packet.isDrawn){
          return 2;
        }
        if(this.packet.status === 4){
          if(this.packet.isExpired){
            // 已经过期
            return 4;
          }else{
            return 3; //已经领完
          }
        }else{
          // 可以领取
          return 1
        }
      }
    },
    created() {
      this.getPacketInfo();
    },
  }
</script>

<style scoped lang="scss" type="text/scss">
  .packet-draw-fission {
    width: 100%;
    height: 100%;
    text-align: center;
    position: relative;
    .packet-bg.bg-fixed{
      background-image: url('../../assets/imgs/packetDraw/big-packet-bg@2x.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .packet-top-bg {
      position: absolute;
      top: 0;
    }
    .packet-content {
      padding-top: 30px;
      position: relative;
      z-index: 1;
      top: 0;
      .award-big {
        position: absolute;
        top: -3px;
        left: 10px;
        width: 46px;
      }
      .packet-info {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.7);
        width: 234px;
        height:44px;
        line-height: 24px;
        margin: 0 auto;
        text-overflow: ellipsis;
        overflow: hidden;
        /* autoprefixer: off*/
        -webkit-box-orient: vertical;
        /* autoprefixer: on*/
        -webkit-line-clamp: 2; /** 显示的行数 **/
        display: -webkit-box;
      }
      .currecny {
        font-size: 26px;
        color: rgba(255, 255, 255, 1);
        margin-top: 10px;
      }
      .circle-div {
        margin-top: 26px;
        .head-img-circle {
          width: 88px;
          height: 88px;
          margin: 0 auto;
          background-image: url('../../assets/imgs/packetDraw/packet-pin-bg@2x.png');
          background-size: contain;
          overflow: hidden;
          text-align: center;
          .icon-bg {
            width: 66px;
            height: 66px;
            line-height: 66px;
            display: inline-block;
            border-radius: 50%;
            margin-top:7px;
            i{
              font-size:48px;
              color:#fff;
            }
          }
        }
        .packet-author {
          font-size: 14px;
          font-family: PingFangSC_Light;
          color: rgba(242, 197, 133, 1);
        }
      }
      .over-tip{
        margin-top:100px;
      }
      .packet-title {
        margin-top: 76px;
        .cur-text {
          font-size: 14px;
          color: rgba(242, 197, 133, 0.7);
        }
        .cur-num {
          font-size: 36px;
          color: rgba(242, 197, 133, 1);
          margin-top: 10px;
        }
        .random-text{
          img{
            width:96px;
          }
        }
      }
      .identity-input{
        margin-top:26px;
      }
      .draw-btn {
        margin-top: 110px;
        text-align: center;
        img.share-tip {
          width: 132px;
          margin-bottom: 10px;
        }
        img.btn {
          width: 180px;
        }
      }
      &.needLogin {
        .packet-title {
          margin-top: 20px;
        }
      }
    }
  }
</style>
