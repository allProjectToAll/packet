<template>
    <div class="access-btn">
      <div class="confirmBtn"><i></i><a @click="joinGroup(linkhrefs)" >{{$t('redInfo.groupLink')}}</a></div>
    </div>
</template>

<script>
  import Util from '../../../public/util'
  import { MessageBox } from 'mint-ui';
  export default {
    name: "access-btn",
    props:{
      linkhrefs:{
        type:String,
        default:''
      }
    },
    data(){
      return{

      }
    },
    computed:{
      isInApp(){
        //在app里
        return navigator.userAgent.search(/AZEX/i)>-1?true:false
      },
      isPhone(){
        //在移动端
        return Util.browserRedirect==1?false:true
      },
      isPC(){

      }
    },
    methods:{
      joinGroup(param){
        //如果在app中打开telegram
        if(this.isInApp){
          Util.sendAppMsg({
            func:'join_telegram_group',
            link:param
          })
        }else if(!this.isPhone){
          this.$router.push({name:'appDonwload'})
        }
      },
    }
  }
</script>

<style type="text/scss" scoped lang="scss" rel="stylesheet/scss">
  @import "~assets/style/public";
.access-btn{
  position: fixed;
  bottom: 0px;
  width: 375px;
  background:rgba(255,255,255,1);
  box-shadow:0px -1px 0px rgba(238,238,238,1);
  .confirmBtn{
    width:335px;
    height:44px;
    background:linear-gradient(90deg,rgba(75,207,223,1),rgba(38,164,189,1));
    border-radius:4px;
    margin: 15px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    i{
      width: 19px;
      height: 16px;
      @include bg-image("~assets/imgs/redInfo/azapp_icon_telegram_small_2")
    }
    a{
      font-size:16px;
      text-decoration: none;
      margin-left: 10px;
      font-family:PingFangSC_Medium;
      color:rgba(255,255,255,1);
      line-height:16px;
    }
  }
}
</style>
