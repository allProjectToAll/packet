<template>
  <div class="azex-app-download">
    <div class="bg bg-fixed">
    </div>
    <div class="wechat-open-tip bg-fixed" v-if="showWechatTip" @click="showWechatTip = false">
      <div class="derict">
        <img src="../assets/imgs/download/arrow@3x.png" alt="">
        <p>{{$t('appDownload.wechatTip')}}</p>
      </div>
    </div>
    <div class="container">
      <div class="top-logo">
        <img src="../assets/imgs/download/azex-logo@3x.png" alt="">
        <p>{{$t('appDownload.logoTitle')}}</p>
      </div>
      <div class="download ios">
        <p class="title">AZEX APP For iOS</p>
        <p class="btn">
          <mt-button @click="openLink('itms-services://?action=download-manifest&url=https://www.azex.io/manifest.plist')">
            <img src="../assets/imgs/download/ios@3x.png" alt="">
            {{$t('appDownload.downloadBtnIos')}}
          </mt-button>
        </p>
        <p class="not-trust-answer">
          <a href="">{{$t('appDownload.notTrustAnswer')}}</a>
        </p>
      </div>
      <div class="download android">
        <p class="title">AZEX APP For Android</p>
        <p class="btn">
          <mt-button @click="openLink('http://www.azex.io')">
            <img src="../assets/imgs/download/google-play@3x.png" alt="">
            Google play
          </mt-button>
          <mt-button @click="openLink('https://www.azex.io/apps/AZEX_1_0_0.apk')">
            <img src="../assets/imgs/download/android@3x.png" alt="">
            {{$t('appDownload.downloadBtnAndroid')}}
          </mt-button>
        </p>
      </div>
      <p class="copyright">
        <a href="http://www.azex.io" target="_blank">www.azex.io</a>
      </p>
    </div>
  </div>
</template>

<script>
  import util from '../public/util'
  import isStarApp from '../public/h5app'
  export default {
    data() {
      return {
        isWeChat:util.browser.versions.weixin,
        isMobile:util.browser.versions.mobile,
        showWechatTip:false
      }
    },
    methods: {
      openLink(url){
        if(this.isWeChat){
          this.showWechatTip = true;
        }else if(this.isMobile){
          isStarApp(url)
        }else{
          window.open(url,'_blank')
        }
      }
    },
    created() {
    },
  }
</script>

<style scoped lang="scss" type="text/scss">
  .azex-app-download{
    .bg{
      background-image: url("../assets/imgs/download/bg@3x.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .wechat-open-tip{
      background:rgba(0,0,0,0.6);
      width:100%;
      height:100%;
      z-index: 3;
      .derict{
        position: fixed;
        top:20px;
        right:20px;
        text-align: right;
        img{
          width:82px;
        }
        p{
          margin-top:13px;
          margin-right:40px;
          font-size:16px;
          color:rgba(242,182,97,1);
          line-height:22px;
        }
      }
    }
    .container{
      position:relative;
      z-index:2;
      text-align: center;
      .top-logo{
        margin:40px 0 78px;
        text-align: center;
        img{
          width:120px;
        }
        p{
          font-size:20px;
          margin-top:30px;
          color:rgba(242,182,97,1);
          line-height:28px;
        }
      }
      .download{
        .title{
          font-size:14px;
          color:rgba(255,255,255,1);
          line-height:20px;
          margin-bottom:20px;
        }
        .btn{
          width:315px;
          margin:0 auto;
          .mint-button{
            display: inline-block;
            height:44px;
            line-height:44px;
            border-radius:100px;
            background: transparent;
            color:rgba(242,182,97,1);
            font-size: 14px;
            box-sizing: border-box;
            cursor: pointer;
            border:1px solid #816032;
            &:hover{
              background:rgba(242,182,97,0.08);
            }
            img{
              width:16px;
              margin-right:4px;
              margin-top:-4px;
              vertical-align: middle;
            }
          }
        }
        &.ios{
          .mint-button{
            width:100%;
          }
          .not-trust-answer{
            margin-top:15px;
            a{
              font-size:12px;
              color:rgba(255,255,255,0.5);
              line-height:17px;
              text-decoration: underline;
              &:hover{
                color:#fff;
              }
            }
          }
        }
        &.android{
          margin-top:40px;
          .mint-button{
            width:150px;
            &:last-child{
              margin-left:9px;
            }
          }
        }
      }
      .copyright{
        margin-top:20px;
        line-height:17px;
        a{
          font-size:12px;
          color:rgba(255,255,255,0.3);
          &:hover{
            color:#F2B661;
          }
        }
      }
    }
  }
</style>
