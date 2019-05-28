<template>
  <div class="packet-draw-ordinary">
    <div class="packet-bg bg-fixed">
    </div>
    <div class="packet-top-bg">
      <img src="../../assets/imgs/packetDraw/big-packet-top-bg@2x.png" alt="">
    </div>
    <div class="packet-content" :class="{'needLogin':!isLogin&&!isAZEX}" v-if="packet.currency">
      <p class="packet-info">{{$t('packet.packetTip')}}</p>
      <p class="currency">{{packet.currency.toUpperCase()}}</p>
      <div class="circle-div">
        <div class="head-img-circle">
          <img :src="`${packet.userId}/${packet.headImageId}`|headImgPath" v-if="packet.headImageId" alt="">
          <img src="../../assets/imgs/redInfo/az-icon-change_face@2x.png" v-else>
        </div>
        <p class="packet-author">{{$t('draw.authorText').replace('0',packet.nickName||packet.userId)}}</p>
      </div>
      <div v-if="packet.drawStatus===1">
        <div class="packet-title">
          {{packet.title}}
        </div>
        <identity-auth class="identity-input" ref="identityInput" @success="checkCanDraw" :type="2" v-if="!isLogin&&!isAZEX"></identity-auth>
        <div class="draw-btn" v-else>
          <img :src="`/static/imgs/${language}/take-packet-btn@2x.png`|covImgPath" class="btn" alt="" @click="open">
        </div>
      </div>
      <div v-else class="over-tip">
        <div v-if="packet.drawStatus ===3">
          <img :src="`/static/imgs/${language}/draw-over-tip@2x.png`|covImgPath" style="width:240px">
          <p class="go-detail-text" @click="goDetail">{{$t('packet.bottomDetailBtnText')}}</p>
        </div>
        <img :src="`/static/imgs/${language}/expired-tip@2x.png`|covImgPath" style="width:144px;" v-if="packet.drawStatus ===4">
      </div>
    </div>
    <draw-suc ref="drawSuc"></draw-suc>
  </div>
</template>
<script>
  import identityAuth from './identityAuth'
  import drawSuc from './drawSucDialog'
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
        packet:{},
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
      async open() {
        if(!this.isLogin && this.isAZEX){
          util.sendAppMsg({
            func:'login'
          });
          return;
        }
        // 领取红包
        api.post('/NormalEnvelope/Draw',{
          id:this.$route.params.id,
        }).then((res)=>{
          util.sendAppMsg({
            func:'silent_join_telegram_group',
            link:this.packet.groupLink
          })
          let data = res.data.value;
          // 领取成功展示成功效果
          this.$refs.drawSuc.open({
            id:this.$route.params.id,
            type:'ordinary',
            normalPrice:{
              ...data
            }
          });
        },(res)=> {
          if (res.data && res.data.err.code === 2) {
            MessageBox({
              title: this.$t('message.confirmTip'),
              message: this.$t('draw.drawNeedBindPhone'),
              confirmButtonText: this.$t('draw.drawNeedBindPhoneConfirm'),
              cancelButtonText: this.$t('draw.drawNeedBindPhoneCancel'),
              showCancelButton: true
            }).then((action) => {
              if (action === 'confirm') {
                util.sendAppMsg({
                  func: 'bound_phone'
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
          name: 'ordinary',
          params:{
            type: 'receiveinfo',
            redId: this.$route.params.id,
          }
        })
      },
      getPacketInfo(){
        api.post('/NormalEnvelope/GetDrawInfo',{
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
  .packet-draw-ordinary{
    width:100%;
    height:100%;
    text-align: center;
    position: relative;
    .packet-bg.bg-fixed{
      background-image: url('../../assets/imgs/packetDraw/big-packet-bg@2x.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .packet-top-bg{
      position:absolute;
      top:0;
    }
    .packet-content{
      padding-top:30px;
      position:relative;
      z-index:1;
      top:0;
      .packet-info{
        font-size:14px;
        color:rgba(255,255,255,0.7);
        font-family: PingFangSC_Light;
      }
      .currency{
        font-size:26px;
        color:rgba(255,255,255,1);
        margin-top:10px;
      }
      .circle-div{
        margin-top:44px;
        .head-img-circle{
          width: 88px;
          height: 88px;
          margin:0 auto;
          background-image:url('../../assets/imgs/packetDraw/packet-pin-bg@2x.png');
          background-size: contain;
          overflow: hidden;
          text-align: center;
          img{
            width:66px;
            height:66px;
            display: inline-block;
            border-radius: 50%;
            margin-top:7px;
          }
        }
        .packet-author{
          font-size:14px;
          color:rgba(242,197,133,1);
        }
      }
      .packet-title{
        font-size:22px;
        color:rgba(242,197,133,1);
        width:336px;
        margin:0 auto;
        margin-top:80px;
      }
      .identity-input{
        margin-top:46px;
      }
      &.needLogin {
        .packet-title {
          margin-top: 30px;
        }
      }
      .draw-btn{
        margin-top:150px;
        text-align: center;
        img{
          width:180px;
        }
      }
      .over-tip{
        margin-top:100px;
        .go-detail-tip{
          font-size:16px;
          color:rgba(242,197,133,1);
          line-height:22px;
          margin-top:190px;
        }
      }
    }
  }
</style>
