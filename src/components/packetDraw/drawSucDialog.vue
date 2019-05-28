<template>
  <div class="draw-suc bg-fixed" v-if="showDialog">
    <div class="light">
    </div>
    <div class="award-box-img">
    </div>
    <div class="award-box" :class="{'spec-award-box':!!packet.topPrice}">
      <p class="congratulation-text">{{$t('draw.drawSucText')}}</p>
      <p>
        <span class="num Din-Medium">{{packet.normalPrice.volume}}</span>
        <span class="currency">{{packet.normalPrice.currency.toUpperCase()}}</span>
      </p>
      <p class="spec-award" v-if="packet.topPrice">
          <span>
            <img :src="`/static/imgs/${language}/big-award-font@2x.png`|covImgPath" alt="">
          </span>
        <span class="num Din-Medium">{{packet.topPrice.volume}}</span>
        <span class="currency">{{packet.topPrice.currency.toUpperCase()}}</span>
      </p>
    </div>
    <div class="bottom-btn" :class="{'red-gra-btn':packet.type === 'fission'}">
      <div class="btn detail-btn" @click="goDetail">
        {{$t('draw.goDetailText')}}
      </div>
      <!--<div class="btn close-btn" @click="showDialog=false">-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        showDialog: false,
        packet: {}
      }
    },
    computed:{
      language(){
        return this.$store.state.user.language
      }
    },
    methods: {
      open(data = {}) {
        this.packet = data;
        this.showDialog = true;
      },
      goDetail() {
        this.$router.replace({
          name: this.packet.type,
          params:{
            type: 'receiveinfo',
            redId:this.packet.id
          }
        })
      }
    },
    created() {
    },
  }
</script>

<style scoped lang="scss" type="text/scss">
  @keyframes transOpacity {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes transFontOpacity {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes transBack {
    from {
      background-color: rgba(0, 0, 0, 0);
    }
    to {
      background-color: rgba(0, 0, 0, 0.65);
    }
  }
  @keyframes transScaleAndOpacity {
    from {
      transform:scale(0.8)
    }
    to {
      transform:scale(1)
    }
  }
  .draw-suc {
    &.bg-fixed{
      background: rgba(0, 0, 0, 0.65);
    }
    z-index: 100;
    animation:transBack 0.8s;
    .light {
      background-image: url('../../assets/imgs/packetDraw/award-light@2x.png');
      background-size: contain;
      width: 100%;
      height: 208px;
      position: absolute;
      top: 180px;
      animation:transScaleAndOpacity 0.8s;
      z-index:1;
    }
    .award-box-img{
      position: absolute;
      left:28px;
      top:58px;
      width: 320px;
      height: 330px;
      background-image: url('../../assets/imgs/packetDraw/get-award-bg@2x.png');
      background-size: 100% 100%;
      animation:transScaleAndOpacity 0.8s;
      z-index:2;
    }
    .award-box {
      position: relative;
      z-index: 3;
      width: 320px;
      height: 330px;
      margin: 0 auto;
      color: rgba(254, 230, 157, 1);
      box-sizing: border-box;
      margin-top: 58px;
      padding-top:200px;
      animation:transOpacity 0.8s;
      .congratulation-text {
        font-size: 16px;
        margin-bottom: 8px;
        font-family: PingFangSC_Light;
      }
      .num {
        font-size: 26px;
      }
      .currency {
        font-size: 16px;
      }
      &.spec-award-box {
        padding-top: 160px;
        .spec-award {
          margin-top: 18px;
          .num {
            display: inline-block;
            margin: 0 4px;
          }
          img {
            width: 40px;
          }
        }
      }
    }

    .bottom-btn {
      margin-top: 68px;
      animation:transOpacity 0.8s;
      .detail-btn {
        width: 180px;
        height: 44px;
        line-height: 44px;
        border-radius: 27px;
        color: #fff;
        margin: 0 auto;
        background: linear-gradient(90deg, rgba(255, 177, 0, 1), rgba(255, 147, 9, 1));
      }
      .close-btn {
        width: 40px;
        height: 40px;
        margin: 0 auto;
        margin-top: 40px;
        background-image: url("../../assets/imgs/packetDraw/dialog-close@2x.png");
        background-size: 100% 100%;
      }
      &.red-gra-btn {
        .btn{
          background: linear-gradient(90deg, rgba(255, 142, 76, 1), rgba(253, 100, 51, 1));
        }
      }
    }
  }
</style>
