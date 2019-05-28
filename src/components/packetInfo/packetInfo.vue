<template>
    <div class="redAll">
      <div class="redTop fixed-center">
          <router-link :to="{ name: 'receive' }" replace  tag="li"><a>{{$t('redInfo.myRecive')}}</a></router-link>
          <router-link :to="{ name: 'send' }" replace  tag="li"><a>{{$t('redInfo.mySend')}}</a></router-link>
        <!--<li @click.prevent.stop="test({ name: 'receive'})" :class="routerId=='receive'?'router-link-active':''" ><a>{{$t('redInfo.myRecive')}}</a></li>
        <li @click.prevent.stop="test({ name: 'send'})" :class="routerId=='send'?'router-link-active':''" ><a>{{$t('redInfo.mySend')}}</a></li>-->
      </div>
      <!--<div class="sendRedbag" @click.prevent.stop="senRed" v-if="!isWeChat"></div>-->

      <div class="sendRedbag" :style="{backgroundImage:`url(${$store.state.user.language=='cn'?require('../../assets/imgs/redInfo/azwep_icon_send_cn@3x.png'):require('../../assets/imgs/redInfo/azwep_icon_send_en@3x.png')})`}"  @click.prevent.stop="senRed"></div>
      <keep-alive>
        <router-view :userInfo="userInfo"></router-view>
      </keep-alive>
    </div>
</template>

<script>
  import Util from '../../public/util'
  import { MessageBox } from 'mint-ui';
  import {mapGetters,mapActions} from 'vuex'
  export default {
    name: "packetInfo",
    data(){
      return {
        userinfo:{},
        obsverScroll:false,
        isWeChat:Util.browser.versions.weixin
      }
    },
    created(){
      if(!this.userInfo){
        this.getUser().then(res=>{
        })
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.stopEvt()
      })
    },
    activated(){
      this.stopEvt()
    },
    deactivated(){
      this.unStopEvt()
    },
    destroyed(){
      this.unStopEvt()
    },
    methods:{
      senRed(){
        if(this.isWeChat){
          this.$router.push({name: 'appDonwload'});
          return
        }
        else if((Util.browserRedirect==1)||(navigator.userAgent.search(/AZEX/i)>-1)){
          //console.log(Util.browserRedirect)
          //在pc端或者在APP内部浏览器
          if(this.isLogin){
            this.$router.push({name:'sendPacketChoice'});
          }else {
            Util.sendAppMsg({
              func:'login'
            });
          }
        }else {
          this.$router.push({name: 'sendPacketChoice'});
        }
        this.$router.push({name: 'sendPacketChoice'});
      },
      stopEvt(){
        document.addEventListener('touchmove', function(evt) {
          evt.preventDefault()
        },{passive: false});
      },
      unStopEvt(){
        document.addEventListener('touchmove', function (e) {
          e.returnValue = true;
        }, false);
      },
      ...mapActions(['getUser'])
    },
    computed:{
      ...mapGetters(['userInfo','isLogin'])
    }
  }
</script>

<style type="text/scss" scoped lang="scss" rel="stylesheet/scss" >
 @import "~assets/style/public";
.redAll{
  position: fixed;
  z-index: 10;
  width:375px;
  top:0px;
  bottom: 0px;
  height:100%;
  overflow: hidden;
  background:linear-gradient(180deg,rgba(42,4,19,1),rgba(106,24,23,1));
  .sendRedbag{
    position: fixed;
    transform:translateX(calc(-50% + 135px));
    bottom: 36px;
    left: 50%;
    /*right: 23px;*/
    width: 70px;
    height: 70px;
    z-index: 999;
    @include bg-image("~assets/imgs/redInfo/azwep_icon_send_cn")
  }
  .redTop{
    height: 48px;
    display: flex;
    padding-top: 10px;
    padding-bottom: 10px;
    position: fixed;
    width: 375px;
    transform: translateX(-50%);
    top: 0px;
    left: 50%;
    z-index: 30;
    justify-content: space-around;
    align-items: center;
    //margin-top: 10px;
    li{
      text-align: center;
      line-height: 28px;
      height: 28px;
      &:nth-child(even){
        margin-right: 92px;
        &.router-link-active{
          margin-right: 77px;
        }
      }
      &:nth-child(odd){
        // margin-left: 66px;
        margin-left: 92px;
        &.router-link-active{
          margin-left: 78px;
        }
      }
      a{
        font-size:14px;
        font-family:PingFangSC_Medium;
        text-align: center;
        overflow: hidden;
        text-decoration: none;
        color:rgba(255,255,255,0.5);
        display: inline-block;
        line-height:28px;
      }
      &.router-link-active{
        width:84px;
        height:28px;
        background:linear-gradient(90deg,rgba(250,104,75,1),rgba(225,66,28,1));
        border-radius: 14px;
        a{
          color:rgba(255,255,255,1);
        }

      }
    }
  }
}
</style>
