<template>
  <div class="fission-info">
    <div class="fissionTopInfo" >
      <ul v-if="isCanViews">
        <li>
          <p>{{RouterId=='receiveinfo'?`${$t('redInfo.allGet')}${MyTakeIt.normalPrice?MyTakeIt.normalPrice.currency.toLocaleUpperCase():''}`:$t('redInfo.allJoinPrN')}}</p>
          <!--<p>总参与人数</p>-->
          <h1 v-if="RouterId=='receiveinfo'" :style="fonTsize((MyTakeIt.normalPrice?add(MyTakeIt.normalPrice.volume,MyTakeIt.promoterGet):0).toString().length)">{{MyTakeIt.normalPrice?add(MyTakeIt.normalPrice.volume,MyTakeIt.promoterGet):0}}</h1>
          <h1 v-else :style="fonTsize((FissionTakeInfo.normalAsset?FissionTakeInfo.normalAsset.distributedNum:0).toString().length)">{{FissionTakeInfo.normalAsset?FissionTakeInfo.normalAsset.distributedNum:0}}</h1>
        </li>
        <li>
          <p>{{$t('redInfo.inviteCon')}}</p>
          <h1 :style="fonTsize((RouterId=='receiveinfo'?MyTakeIt.m1?MyTakeIt.m1:0:FissionTakeInfo.m1?FissionTakeInfo.m1:0).toString().length)">{{RouterId=='receiveinfo'?MyTakeIt.m1?MyTakeIt.m1:0:FissionTakeInfo.m1}}</h1>
        </li>
        <li>
          <p>{{$t('redInfo.invitePrN')}}</p>
          <h1 :style="fonTsize((RouterId=='receiveinfo'?MyTakeIt.m1?MyTakeIt.m2:0:FissionTakeInfo.m2?FissionTakeInfo.m2:0).toString().length)">{{RouterId=='receiveinfo'?MyTakeIt.m1?MyTakeIt.m2:0:FissionTakeInfo.m2}}</h1>
        </li>
      </ul>
    </div>
    <div class="fissionBtoInfo" v-if="RouterId=='sendinfo'&&FissionTakeInfo.normalAsset">
      <ul>
        <li>
          <p>{{$t('redInfo.surplus')}}({{FissionTakeInfo.normalAsset?FissionTakeInfo.normalAsset.currency.toLocaleUpperCase():''}})</p>
          <h1 :style="fonTsize(surplus(FissionTakeInfo.normalAsset.volume,FissionTakeInfo.normalAsset.distributed).toString().length)">{{surplus(FissionTakeInfo.normalAsset.volume,FissionTakeInfo.normalAsset.distributed)}}</h1>
        </li>
        <li>
          <p>{{$t('redInfo.allCount')}}({{FissionTakeInfo.normalAsset?FissionTakeInfo.normalAsset.currency.toLocaleUpperCase():''}})</p>
          <h1 :style="fonTsize((FissionTakeInfo.normalAsset.volume?FissionTakeInfo.normalAsset.volume:0).toString().length)">{{FissionTakeInfo.normalAsset.volume}}</h1>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {Decimal} from 'decimal.js'
  export default {
    name: "fissionInfo",
    data(){
      return{
        isCanViews:false
      }
    },
    props:{
      infos:{
        type:Object,
        default:()=>{
          return{name:'test'}
        }
      },
      RouterId:{
        type:String,
        default:''
      },
      FissionTakeInfo:{
        type:Object,
        default:()=>{
          return{}
        }
      },
      MyTakeIt:{
        type:Object,
        default:()=>{
          return{}
        }
      }
    },
    created(){
      console.log(this.RouterId)
      /*console.log(isCanViews)*/
    },
    methods:{
      render(val){
        this.isCanViews=val
      },
      surplus(a,b){
        return new Decimal(a).minus(new Decimal(b)).toString()
      },
      add(a,b){
       return new Decimal(a).plus(b).toString()
      },
      fonTsize(length){
        //console.log(length)
        if(length<6){
          return {fontSize:'26px'}
        }else if(length>=6&&length<=10){
          return {fontSize:'18px'}
        }else{
          return {fontSize:'12px'}
        }
      }
    }
  }
</script>

<style type="text/scss" scoped lang="scss" rel="stylesheet/scss">
@import "~assets/style/public";
.fission-info{
  padding: 24px 0px;
  box-sizing: border-box;
  /*<!--position: absolute;-->*/
  /*<!--width: 335px;-->*/
  /*<!--background: #fff;-->*/
  /*<!--left: 50%;-->*/
  /*<!--transform: translateX(-50%);-->*/
  /*<!--top: 196px;-->*/
  margin:0 auto;
  width: 335px;
  position:relative;
  top:-40px;
  z-index:20;
  margin-bottom:-20px;
  box-shadow: 0px 5px 15px 0px rgba(0,0,0,0.1);
  border-radius: 6px;
  background: #fff;
  .fissionTopInfo{
    /*height: 63px;*/
    /*overflow: hidden;*/
    ul{
      display: flex;
      justify-content: space-around;
      li{
        text-align: center;
        p{
          font-size:12px;
          font-family:PingFangSC_Regular;
          color:rgba(181,181,181,1);
          line-height:17px;
        }
        h1{
          font-size:26px;
          width: 88px;
          margin:16px auto 0;
          @include no-wrap();
          font-family:DIN-Bold;
          color:rgba(51,51,51,1);
          line-height:31px;
        }
      }
    }
  }
  .fissionBtoInfo{
    margin-top: 20px;
    /*height: 63px;*/
    /*overflow: hidden;*/
    ul{
      display: flex;
      justify-content: space-around;
      li{
        text-align: center;
        p{
          font-size:12px;
          font-family:PingFangSC_Regular;
          color:rgba(181,181,181,1);
          line-height:17px;
        }
        h1{
          font-size:26px;
          margin:16px auto 0;
          width: 88px;
          @include no-wrap();
          font-family:DIN-Bold;
          color:rgba(51,51,51,1);
          line-height:31px;
        }
      }
    }
  }
}
</style>
