<template>
    <div class="wrap">
      <div class="ordinary-head-bg">
        <div class="left-bg"></div>
        <div class="right-bg"></div>
      </div>
      <div class="conte-wrap">
        <div class="redInfos" v-if="isCanView">
          <div class="userHead" :class="currentRed.headImageId?'':'nouserHead'">
            <img  :src="userNameImg.userImg" alt="" style="border-radius: 50%">
          </div>
          <p class="userNmae">{{$store.state.user.language=='en'?$t('redInfo.s_red'):''}}{{userNameImg.name}}{{$store.state.user.language=='cn'?$t('redInfo.s_red'):''}}</p>
         <!-- <p class="redTip" v-else>红包总金额</p>-->
          <h3 class="redMoney" v-if="$route.params.type=='receiveinfo'">{{myTake.volume?myTake.volume:''}}<span>{{myTake.currency?myTake.currency.toLocaleUpperCase():''}}</span></h3>
          <p class="redTip" v-if="$route.params.type=='receiveinfo'">{{$t('redInfo.hasStoreAst')}}</p>

          <h3 class="redMoney" v-if="$route.params.type=='sendinfo'&&Object.keys(myTake).length">{{myTake.volume?myTake.volume:''}}<span>{{myTake.currency?myTake.currency.toLocaleUpperCase():''}}</span></h3>
          <p class="redTip" v-if="$route.params.type=='sendinfo'&&Object.keys(myTake).length">{{$t('redInfo.hasStoreAst')}}</p>
          <h5 class="redLeave">{{currentRed.title}}</h5>
        </div>
      </div>
    </div>
</template>

<script>

  export default {
    name: "ordinary-head-bg",
    props:{
      userNameImg:{
        type:Object,
        default:()=>{
          return {}
        }
      },
      currentRed:{
        type:Object,
        default:()=>{
          return {}
        }
      },
      myTake:{
        type:Object,
        default:()=>{
          return {}
        }
      },
      myuserInfo:{
        type:Object,
        default:()=>{
          return {}
        }
      }
    },
    data(){
      return{
        hasUserinfo:true,
        isCanView:false
      }
    },
    created(){

    },
    methods:{
      refresh(data){
        this.isCanView=data
      }
    },
    mounted(){
      console.log(this.userNameImg,this.myTake)
    },
   computed:{
     redId(){
       return this.$route.params.redId
     }
   }
  }
</script>

<style type="text/scss" scoped lang="scss" rel="stylesheet/scss">
  @import "~assets/style/public";
  .wrap{
    .ordinary-head-bg{
      width:375px;
      height:282px;
      background:linear-gradient(180deg,rgba(42,4,19,1),rgba(106,24,23,1));
      position: relative;
      .left-bg{
        width:139px; height:196px;
        position: absolute;
        left: 0px;
        background:linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0));
        border-radius: 36px 100px 100px 46px;
        top: 8px;
      }
      .right-bg{
        width:104px;
        height:140px;
        position: absolute;
        right: 0px;
        top: 30px;
        background:linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0));
        border-radius: 86px 25px 10px 50px;
      }
    }
     .conte-wrap{
       height: 80px;
       background: white;
       position: relative;
       .redInfos{
         width: 355px;
         height: 313px;
         position: absolute;
         top: -242px;
         left: 50%;
         transform: translateX(-50%);
         @include bg-image("~assets/imgs/redInfo/ordinary_bg");
         .userHead{
           width: 56px;
           height: 56px;
           margin: 30px auto 0px;
           //@include bg-image("~assets/imgs/redInfo/az-icon-change_face");
           &.nouserHead{
             //border: 1px dashed #888888;
           }
           img{
             width: 56px;
             height: 56px;
           }
         }
         .userNmae{
           margin-top: 10px;
           font-size:14px;
           font-family:PingFangSC_Bold;
           text-align: center;
           color:rgba(166,111,33,1);
           line-height:14px;
         }
         .redTip{
           text-align: center;
           margin-top: 20px;
           font-size:12px;
           font-family:PingFangSC_Medium;
           color:rgba(181,132,55,1);
           line-height:12px;
         }
         .redMoney{
           margin-top: 10px;
           font-size:26px;
           font-family:DIN-Bold;
           color:rgba(90,55,5,1);
           text-align: center;
           line-height:26px;
           span{
             font-size:12px;
             font-family:DIN-Bold;
             color:rgba(181,132,55,1);
             line-height:14px;
             margin-left: 5px;
           }
         }
         .redLeave{
           font-size: 18px;
           font-family: PingFangSC_Regular;
           color: #fee69d;
           text-align: center;
           line-height: 22px;
           position: absolute;
           word-break: break-all;
           width: 300px;
           left: 50%;
           transform: translateX(-50%);
           height: 44px;
           bottom: 26px;
           /*display: -webkit-box;*/
           /* autoprefixer: off*/
           -webkit-box-orient: vertical;
           /* autoprefixer: on*/
           -webkit-line-clamp: 2;
           overflow: hidden;
         }
       }
    }
  }

</style>
