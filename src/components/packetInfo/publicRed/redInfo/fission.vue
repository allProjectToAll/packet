<template>
    <div class="fission" >
      <!--裂变红包-->
      <div class="fissionWrap" ref="fission">
       <div>
         <fission-head-bg :currency="currency" :FissionTakeInfo="FissionTakeInfo">
         </fission-head-bg>
         <!--<div class="fillBlok" :class="routerId=='receiveinfo'?'sortFill':''"></div>-->
       </div>
        <fission-info :infos="test" :MyTakeIt="MyTakeIt" :RouterId="routerId" :FissionTakeInfo="FissionTakeInfo" ref="fissionInfos"></fission-info>
        <draw-box :isView="true&&FissionTakeInfo.topPriceAsset?true:false" v-if="true&&FissionTakeInfo.topPriceAsset">
          <div v-if="isReceive" class="receiveBox">
            <i>{{MyTakeIt.topPrice?MyTakeIt.topPrice.volume>0?$t('redInfo.bigDraw'):$t('redInfo.noTkBigDraw'):$t('redInfo.noTkBigDraw')}}</i>
            <p v-if="MyTakeIt.topPrice">{{MyTakeIt.topPrice.volume}} {{MyTakeIt.topPrice.currency.toLocaleUpperCase()}}</p>
          </div>
          <div v-else class="sendBox">
            <ul>
              <li>
                <p>{{$t('redInfo.bdHasPr')}}</p>
                <h3>{{FissionTakeInfo.topPriceAsset.distributedNum}} / {{howBigPeople(FissionTakeInfo.topPriceAsset.volume,FissionTakeInfo.topPriceAsset.maxVolume,FissionTakeInfo.topPriceAsset.minVolume)}}</h3>
              </li>
              <li>
                <p>{{$t('redInfo.hasSdraw')}} ({{FissionTakeInfo.topPriceAsset.currency.toLocaleUpperCase()}})</p>
                <h3>{{FissionTakeInfo.topPriceAsset.distributed}} / {{FissionTakeInfo.topPriceAsset.volume}}</h3>
              </li>
            </ul>
          </div>
        </draw-box>
        <div class="generalize">
          <share-and-generalize :DataInfo="routerId=='receiveinfo'?shareInfo:generalizeInfo" :shareId="'AZEX_share'" ></share-and-generalize>
        </div>
        <fission-generalize :generLizeInfos="generLizeInfo2" ref="fg1"  :contentInfo="contentInfo" :classNames="'canvas1'" :wrapDom="'contents1'" v-if="!isReceive"></fission-generalize>
        <fission-generalize :generLizeInfos="generLizeInfo3" ref="fg2"  :classNames="'canvas2'" :wrapDom="'qr_code_wrap'" v-if="!isReceive"></fission-generalize>
        <div class="fenge"></div>
        <tips-componet :DataInfo="DataInfo"></tips-componet>
        <!--<tips-componet :DataInfo="AgentAward"></tips-componet>-->
      </div>
      <access-btn :linkhrefs="FissionTakeInfo.groupLink"></access-btn>
    </div>
</template>

<script>
  import FissionHeadBg from '../../../common/fission/fission-head-bg'
  import fissionInfo from '../../../common/fissionInfo/fissionInfo'
  import ShareAndGeneralize from '../../../common/shareAndgeneralize/shareAndgeneralize'
  import TipsComponet from '../../../common/tipsComponet/tipsComponet'
  import AccessBtn from '../../../common/AccessBtn/AccessBtn'
  import DrawBox from '../../../common/drawBox/drawBox'
  import FissionGeneralize from '../../../common/fissionGeneralize/fissionGeneralize'
  import api from '../../../../public/api'
  import Until from '../../../../public/util'
  import {Decimal} from 'decimal.js'
  import hostName from '../../../../public/hostConfig'
  const HostName=`${hostName.HOSTNAME}${hostName.RouterBase}`
  export default {
    name: "fission",
    props:{
      userNameImg:{
        type:Object,
        default:()=>{
          return {}
        }
      }
    },
    data(){
      return{
        test:{
          name:'test111111111'
        },
        linkHrefs:'',
        linkTexts:'',
        shareInfo:{
          title:this.$t('redInfo.shareFr'),
          message:HostName,
          text:'',
        },
        generalizeInfo:{
          title:this.$t('redInfo.generalize1'),
          message:HostName,
          text:'',
        },
        generLizeInfo2:{
          title:this.$t('redInfo.generalize2'),
          isVisibe:false
        },
        generLizeInfo3:{
          title:this.$t('redInfo.generalize3'),
          isVisibe:true
        },
        DataInfo:{
          title:this.$t('redInfo.takeRules'),
          m:[this.$t('redInfo.m1'),this.$t('redInfo.m2')]
        },
        AgentAward:{
          title:this.$t('redInfo.agentAward'),
          m:[this.$t('redInfo.linkInfo')]
        },
        FissionTakeInfo:{},
        MyTakeIt:{},
        currency:'',
        contentInfo:{},
        CuserId:''
      }
    },
    created(){
      //console.log(hostName)
      this.init()
      this.howBigPeople(4,4,4)
      //console.log(this.contentInfo)
    },
    mounted(){
      this.$nextTick(()=>{

      })
     // Until.sendAppMsg({func:'share',link:'xxxx',text:''})
      //overscroll(this.$refs.fission)
    },
    methods:{
      init(){

       if(!this.$store.state.user.info){
         this.$store.dispatch('getUser').then(res=>{
           this.CuserId=res.userId
           this.getFissionInfo()
         })
       }else {
         this.CuserId=this.$store.state.user.info.userId
         this.getFissionInfo()
       }

      },
      getFissionInfo(){
        //获取裂变红包领取概况
        api.post('/DividedEnvelope/GetDrawInfo',{
          id: this.redId
        }).then(res=>{
          let temp=res.data.value
          this.FissionTakeInfo=temp
          console.log(this.FissionTakeInfo)
          if(this.isReceive){
            this.getUserFicssionTakeIt()
          }else {
            this.$refs.fissionInfos.render(true)
          }
          /*if(this.FissionTakeInfo.isDrawn){
            //必须写在前面
            this.getUserFicssionTakeIt()
          }*/
          this.currency=temp.normalAsset.currency
          /*console.log(this.userInfo,222222222,this.CuserId)*/
          let maxEqMin = (temp.normalAsset.maxVolume === temp.normalAsset.minVolume);
          this.linkHrefs=`${this.draw}/${this.redId}?pid=${this.CuserId}&c=${this.currency}&p=${!!temp.topPriceAsset}&v=${maxEqMin?temp.normalAsset.maxVolume:''}&t=${maxEqMin?2:1}`;
          this.linkTexts=temp.link
          this.shareInfo.message=`${this.shareInfo.message}${this.linkHrefs}`
          this.shareInfo.text=`${temp.link}`
          this.generalizeInfo.message=`${this.generalizeInfo.message}${this.linkHrefs}`
          this.generalizeInfo.text=`${temp.link}`
          this.contentInfo.intro=temp.intro
          this.contentInfo.imageId=temp.imageId
          this.contentInfo.randomPrice=temp.normalAsset.maxVolume
          this.contentInfo.fixedMoney=temp.normalAsset.maxVolume==temp.normalAsset.minVolume?true:false
          this.contentInfo.currency=this.currency.toLocaleUpperCase()
          if(this.redType&&!this.isReceive){
            this.$refs.fg1.renderQrcode(this.linkHrefs)
            this.$refs.fg2.renderQrcode(this.linkHrefs)
          }
          //alert(this.FissionTakeInfo.isDrawn)
          Until.sendAppMsg({func:'share',link:`${HostName}${this.linkHrefs}`,text:`${this.linkTexts}`,image:`${temp.imageId}`,title:`${temp.title}`})
          console.log(temp,'获取裂变红包领取概况')

        })
      },
      getUserFicssionTakeIt(){
        //获取用户对此红包的领取信息
        api.post('/DividedEnvelope/GetMyDrawInfo',{
          id: this.redId
        }).then(res=>{
          this.MyTakeIt=res.data.value
          console.log('render')
          this.$refs.fissionInfos.render(true)
          console.log(this.MyTakeIt,'获取用户对此裂变红包的领取情况')
        }).catch(err=>{
          if(err.data.err.coder==4){
            this.MyTakeIt={}
            this.$refs.fissionInfos.render(true)
          }
        })
        this.$refs.fissionInfos.render(true)
      },
      howBigPeople(a,b,c){
        let result=new Decimal(a).dividedBy((new Decimal(b).add(new Decimal(c))).dividedBy(2)).toNumber()
        return Math.ceil(result).toString()
      },
    },
    computed:{
      routerId(){
        return this.$route.params.type
      },
      redId(){
        return this.$route.params.redId
      },
      isReceive(){
        return this.$route.params.type=='receiveinfo'
      },
      userInfos(){
        //return this.$route.params.user
      },
      redType(){
        if(this.$route.name=='ordinary'){
          return 0
        }else {
          return 1
        }
      },
      draw(){
        if(this.redType){
          return 'drawF'
        }else {
          return 'drawO'
        }
      }
    },
    components:{
      FissionHeadBg,
      fissionInfo,
      ShareAndGeneralize,
      TipsComponet,
      AccessBtn,
      DrawBox,
      FissionGeneralize
    }
  }
</script>

<style type="text/scss" scoped lang="scss" rel="stylesheet/scss">
.fission{
  .fissionWrap{
   // position: fixed;
    width: 100%;
    //height: calc(100% - 74px);
    background: #fff;
    top: 0px;
    /*overflow-y: scroll;*/
    overflow-x: hidden;
    margin-bottom: 74px;
    .fillBlok{
      width: 375px;
      height: 176px;
      &.sortFill{
        height: 92px;
      }
    }
    .receiveBox{
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 100%;
      i{
        font-size:22px;
        font-style: normal;
        font-family:MFShangYa;
        color:rgba(255,255,255,1);
        line-height:27px
      }
      p{
        font-size:22px;
        font-family:DIN-Bold;
        color:rgba(255,255,255,1);
        line-height:27px;
      }
    }
    .sendBox{
      height: 100%;
      ul{
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: #fff;
        li{
          text-align: center;
          p{
            font-size:12px;
            color:rgba(255,255,255,0.7);
            line-height:17px;
            margin-bottom: 16px;
          }
          h3{
            font-size:26px;
            font-family:DIN-Bold;
            color:rgba(255,255,255,1);
            line-height:31px;
          }
        }
      }
    }
    .generalize{
      //height: 159px;
      padding: 20px;
      box-sizing: border-box;
    }
    .fenge{
      width:375px;
      height:10px;
      background:rgba(238,238,238,1);
    }
  }


}
</style>
