<template>
  <div class="fission-packet" :class="{'opacity':packet.isDrawn,'off':packet.isExpired}" @click.prevent.stop="goDraw(packet.id)">
    <div class="packet-bg">
      <img src="../../../src/assets/imgs/azwep_red_bao_off@2x.png" v-if="packet.isExpired">
      <img src="../../../src/assets/imgs/azwep_red_bao@2x.png" v-else>
    </div>
    <div class="content">
      <div class="top-icons">
        <img class="big-awards" v-if="packet.hasTopPrice" :src="`/static/imgs/${language}/azwep_awards${packet.isExpired?'_off':''}@2x.png`|covImgPath" alt="">
        <div class="currency">{{packet.currency.toUpperCase()}}</div>
        <div class="cur-icon">
          <img class="icon-bg" :src="packet.currency|currencyImgPath" alt="">
        </div>
      </div>
      <div class="random-text" v-if="packet.minVolume!==packet.maxVolume">
        <img :src="`/static/imgs/${language}/random_money${packet.isExpired?'_off':''}@2x.png`|covImgPath" alt="">
      </div>
      <div class="fixed-text" v-else>
        <p>{{$t('packet.canDrawText')}}({{packet.currency.toUpperCase()}})</p>
        <p class="num Din-Medium">{{packet.maxVolume}}</p>
      </div>
      <div class="draw-btn">
        <img v-if="drawStatus === 4" :src="`/static/imgs/${language}/azwep_guoqi@2x.png`|covImgPath" />
        <img v-if="drawStatus === 2" :src="`/static/imgs/${language}/azwep_yilingqu@2x.png`|covImgPath" />
        <img v-if="drawStatus === 1||drawStatus === 3" :src="`/static/imgs/${language}/azwep_lingqu@2x.png`|covImgPath" class="btn" />
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {

      }
    },
    computed:{
      language(){
        return this.$store.state.user.language
      },
      drawStatus(){
        if(this.packet.isDrawn){
          // 已领取
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
    props:['packet'],
    methods: {
      goDraw(id){
        if(this.drawStatus === 2){
          this.$router.push({
            name: 'fission',
            params:{
              type: 'receiveinfo',
              redId: id,
            }
          })
        }else{
          this.$router.push({name:'packetDrawFission',params:{id:id}})
        }
      },
    },
    created() {
    },
  }
</script>

<style scoped lang="scss" type="text/scss">
  .fission-packet{
    position:relative;
    border-radius: 6px;
    overflow: hidden;
    height:190px;
    &.opacity:before{
      content:'';
      position: absolute;
      top:0;
      right:0;
      left:0;
      bottom:0;
      background-color: rgba(255,255,255,0.25);
      z-index:10;
    }
    img{
      display: block;
      margin:0 auto;
    }
    .packet-bg{

    }
    .content{
      width:100%;
      height:100%;
      position:absolute;
      top:0;
      z-index:2;
      .top-icons{
        height:72px;
        overflow: hidden;
        .big-awards{
          width:28px;
          left:10px;
          position:absolute;
          top:-1px;
        }
        .currency{
          text-align: center;
          font-size:18px;
          margin-top:8px;
          color:rgba(255,255,255,1);
        }
        .cur-icon{
          width: 48px;
          height: 48px;
          background-image:url('../../assets/imgs/packetDraw/azwep_bi_bg@2x.png');
          background-size: contain;
          position:absolute;
          left:50%;
          margin-left:-24px;
          overflow: hidden;
          text-align: center;
          .icon-bg{
            width:36px;
            height:36px;
            line-height:36px;
            border-radius: 50%;
            overflow: hidden;
            display: inline-block;
            margin-top:4px;
          }
        }
      }
      .fixed-text{
        height: 42px;
        margin:10px 0 25px;
        p{
          text-align: center;
          &.num{
            font-size:26px;
            color:rgba(242,197,133,1);
          }
          &:first-child{
            font-size:12px;
            color:rgba(242,197,133,0.5);
          }
        }
      }
      .random-text{
        height:77px;
        line-height:77px;
        text-align: center;
        img{
          width:120px;
          vertical-align: middle;
          display: inline-block;
        }
      }
      .draw-btn{
        width:96px;
        margin:0 auto;
      }
    }
    &.off{
      .content{
        .cur-icon{
          background-image:url('../../assets/imgs/packetDraw/azwep_bi_bg_off@2x.png');
          .icon-bg{
            background:rgba(153,153,153,1);
          }
        }
        .fixed-text{
          p{
            &.num{
              color:rgba(255,255,255,0.7);
            }
            &:first-child{
              color:rgba(255,255,255,0.5);
            }
          }
        }
        .draw-btn{
          width:96px;
          margin:0 auto;
        }
      }
    }
  }
</style>
