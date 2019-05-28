<template>
  <div class="send-packet-choice">
    <div class="bg-fixed">

    </div>
    <div class="card ordinary-card">
      <div class="title">
        {{$t('sendPacketChoice.ordinaryText')}}
      </div>
      <div class="icon">
        <img src="../../assets/imgs/packetChoice/azwep_icon_putong@2x.png" alt="">
      </div>
      <div class="intro">
        <p>
          <img src="../../assets/imgs/packetChoice/ordinary-packet-intro-icon1@2x.png" alt="">
          <span>
            {{$t('sendPacketChoice.ordinaryIntro1')}}
          </span>
        </p>
        <!--<p>-->
          <!--<img src="../../assets/imgs/packetChoice/ordinary-packet-intro-icon2@2x.png" alt="">-->
          <!--<span>-->
            <!--{{$t('sendPacketChoice.ordinaryIntro2')}}-->
          <!--</span>-->
        <!--</p>-->
      </div>
      <mt-button class="send-button" @click.prevent.stop="checkPassword(1)">
        {{$t('sendPacketChoice.ordinarySendText')}}
      </mt-button>
    </div>
    <div class="card fission-card">
      <div class="title">
        {{$t('sendPacketChoice.fissionText')}}
      </div>
      <div class="icon">
        <img src="../../assets/imgs/packetChoice/azwep_icon_liebian@2x.png" alt="">
      </div>
      <div class="intro">
        <p>
          <img src="../../assets/imgs/packetChoice/fission-packet-intro-icon1@2x.png" alt="">
          <span>
            {{$t('sendPacketChoice.fissionIntro1')}}
          </span>
        </p>
        <p>
          <img src="../../assets/imgs/packetChoice/fission-packet-intro-icon2@2x.png" alt="">
          <span>
            {{$t('sendPacketChoice.fissionIntro2')}}
          </span>
        </p>
        <!--<p>-->
          <!--<img src="../../assets/imgs/packetChoice/fission-packet-intro-icon3@2x.png" alt="">-->
          <!--<span>-->
            <!--{{$t('sendPacketChoice.fissionIntro3')}}-->
          <!--</span>-->
        <!--</p>-->
      </div>
      <mt-button class="send-button" @click.prevent.stop="checkPassword(2)">
        {{$t('sendPacketChoice.fissionSendText')}}
      </mt-button>
    </div>
    <error-dialog ref="errorDialog" class="dialog" @setPassword="setPassword"></error-dialog>
  </div>
</template>

<script>
import errorDialog from '../common/errorDialog'
import api from '../../public/api'
import util from '../../public/util.js'

  export default {
    components:{
      errorDialog
    },
    data() {
      return {}
    },
    computed:{
      language(){
        return this.$store.state.user.language
      }
    },
    methods: {
      checkPassword(index){//判断是否设置了资金密码
        api.post('/User/GetUserInfo').then((res)=>{
          if(res.data.value.isTradePasswordSetted){
            if(index==1){
              this.toOrdinary();
            }else if(index==2){
              this.toFission();
            }
          }else{
            this.$refs.errorDialog.open();
          }
        })
      },
      toOrdinary(){
        this.$router.push({name:'sendOrdinaryPacket'});
      },
      toFission(){
        this.$router.push({name:'sendFissionPacket'});
      },
      setPassword(){//判断是手机还是pc，跳转设置资金密码
        util.sendAppMsg({func:'SetTradePassword'});
      }
    },
    created() {
    },
  }
</script>

<style scoped lang="scss" type="text/scss">
  .send-packet-choice{
    position:relative;
    padding-top: 50px;
    box-sizing: border-box;
    .bg-fixed{
      background:linear-gradient(180deg,rgba(42,4,19,1),rgba(106,24,23,1));
    }
    .card{
      background-color: #fff;
      border-radius:6px;
      width:324px;
      margin:0 auto;
      position: relative;
      padding:0 20px 20px;
      box-sizing: border-box;
      .icon{
        position: absolute;
        left:20px;
        top:-18px;
        img{
          width:80px;
        }
      }
      .title{
        text-align: center;
        padding:16px 0;
        margin-bottom:14px;
        font-size:22px;
        color:rgba(253,100,51,1);
      }
      .intro{
        p{
          font-size:12px;
          color:#888;
          line-height:18px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          img{
            width:32px;
            height:32px;
            margin-right:12px;
            align-self: flex-start;
          }
        }
      }
      .send-button{
        width:284px;
        height:40px;
        border-radius: 4px;
        margin:0 auto;
        font-size:16px;
        color:#fff;
        font-family: PingFangSC_Light;
        margin-top:10px;
      }
      &.ordinary-card{
        .send-button{
          background:linear-gradient(90deg,rgba(255,177,0,1),rgba(255,147,9,1));
        }
      }
      &.fission-card{
        .send-button{
          background:linear-gradient(90deg,rgba(255,142,76,1),rgba(253,100,51,1));
        }
      }
    }
    .fission-card{
      margin-top:40px;
    }

  }
.dialog{
  width:100%;
  height:100%;
  position:fixed;
  left:0;
  top:0;
}
</style>
