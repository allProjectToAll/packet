<template>
  <div class="ordinary" ref="oridinary">
    <!--普通红包-->
    <ordinary-head-bg :userNameImg="userInfos" :currentRed="currentRed" :myuserInfo="userInfos" :myTake="myTake" ref="packetTopDetail"></ordinary-head-bg>
    <div class="shareFriend" v-if="$route.params.type=='sendinfo'">
      <share-and-generalize :DataInfo="shareInfo"></share-and-generalize>
    </div>
    <div class="getDetails">
      <div class="fenge"></div>
      <div class="detailWrap">
        <h3 class="detailTitle">{{$t('redInfo.takeInfo')}}</h3>
        <div class="detailInfo">
          <p>{{$t('redInfo.hasTakeIt')}}<br>{{currentRed.distributedNum}}/{{currentRed.number}}</p>
          <h4>{{etoNumber(currentRed.distributed,8)}} / {{etoNumber(currentRed.volume,8)}} {{currentRed.currency?currentRed.currency.toLocaleUpperCase():''}}</h4>
        </div>
        <div class="bg-fenge"></div>
      </div>
      <packet-detail-list :TakeUserListNickName="TakeUserListNickName" :myTake="myTake" :userNameImg="userInfos" :myuserNameImg="myuserInfo"  :otherTake="takeRedUserList.items" ref="packetDetail"></packet-detail-list>
      <no-user-take-it v-if="!takeRedUserList.items.length"></no-user-take-it>
      <Loading v-show="(takeRedUserList.items.length<10?false:true)&&takeRedUserList.items.length" :isLoadingIcon="takeRedUserList.currentPage<=takeRedUserList.totalPage" :title="takeRedUserList.totalPage<takeRedUserList.currentPage?$t('redInfo.noMore'):$t('redInfo.nowLoading')"></Loading>
    </div>
   <!-- <div v-for="i in 20" style="height: 20px;">{{i.toString()}}</div>-->
  </div>
</template>

<script>
  import OrdinaryHeadBg from '../../../common/ordinary/ordinary-head-bg'
  import PacketDetailList from '../../../common/packet-detail-list/packet-detail-list'
  import ShareAndGeneralize from '../../../common/shareAndgeneralize/shareAndgeneralize'
  import Packet from '../../../../public/scroll'
  import Loading from '../../../../components/common/loading/loading'
  import NoUserTakeIt from '../../../../components/common/NoUserTakeIt'
  import api from '../../../../public/api'
  import hostName from '../../../../public/hostConfig'
  const HostName=`${hostName.HOSTNAME}${hostName.RouterBase}`
  export default {
    name: "ordinary",
    data(){
      return{
        shareInfo:{
          title:this.$t('redInfo.shareFr'),
          message:HostName,
        },
        currentRed:{},
        TakeUserListNickName:{},
        tempTakeItlist:[],
        etoNumber:api.etoNumber(),
        takeRedUserList:{
          currentPage:1,
          items:[],
          pageSize:10,
          totalItems:0,
          totalPage:0
        },
        scroll:'',
        LoadingShowIcon:true,
        myTake:{},
        userInfos:{},
        myuserInfo:{},
        CuserId:''
      }
    },
    props:{
      userNameImg:{
        type:Object,
        default:()=>{
          return {}
        }
      }
    },
    methods:{
      init(){
        //根据红包ID获取用户信息
        /*this.getUserNickName(['56806'])*/
        if(!this.$store.state.user.info){
          this.$store.dispatch('getUser').then(res=>{
            this.CuserId=res.userId
            this.getRedInfo(this.redId)
            this.getRedTakeIt(this.redId)
          })
        }else {
          this.CuserId=this.$store.state.user.info.userId
          this.getRedInfo(this.redId)
          this.getRedTakeIt(this.redId)
        }
      },
      getRedInfo(redId){
        //获取普通红包领取概况
        api.post('/NormalEnvelope/GetDrawInfo',{id:redId}).then(res=>{
          this.currentRed=res.data.value
          let temp=res.data.value
          console.log(this.currentRed,'获取普通红包领取概况')
          let tempLink=`${this.draw}/${this.redId}?pid=${this.CuserId}&c=${temp.currency}&p=${temp.isDrawn}&v=&t=${0}`;
          this.myuserInfo=this.getUserInfo(this.$store.state.user.info.headImageId,this.$store.state.user.info.nickName,this.$store.state.user.info.userId)
          if(this.routerType){
            //我接受的
            this.userInfos=this.getUserInfo(this.currentRed.headImageId,this.currentRed.nickName,this.currentRed.userId)
          }else {
            this.userInfos=this.myuserInfo
          }
          console.log(this.userInfos,'用户信息',this.$store.state.user.info)
          this.$refs.packetTopDetail.refresh(true)
          this.shareInfo.message=`${this.shareInfo.message}${tempLink}`
          if(this.currentRed.isDrawn){
            //用户是否领取过？
            this.getUserTakeIt(this.redId)
          }
        })
      },
      getRedTakeIt(redId,updata=0){
        //获取普通红包领取用户列表
          api.post('/NormalEnvelope/GetDrawerPageList',{"pageIndex": this.takeRedUserList.currentPage,"pageSize": 10,"id": redId}).then(res=>{
            let tremp=res.data.value
            this.tempTakeItlist=tremp.items
            let concateNickName=[]
            for(let j in tremp.items){
              concateNickName.push(tremp.items[j].userId)
            }
            if(updata){
                this.takeRedUserList.items=this.takeRedUserList.items.concat(this.takeRedUserList.items.concat(this.takeRedUserList.items))
                console.log(this.takeRedUserList.items)
                this.getUserNickName(concateNickName)
            }else {
              this.takeRedUserList.items=tremp.items
             /* console.log(this.takeRedUserList.items)*/
              this.getUserNickName(concateNickName)
              this.takeRedUserList.totalItems=tremp.totalItems
              this.takeRedUserList.totalPage=tremp.totalPage
            }
            this.takeRedUserList.currentPage=tremp.currentPage+1
            console.log(this.takeRedUserList,'获取普通红包领取用户列表')
          })
      },
      getUserNickName(listId){
         //console.log(listId)
         if(listId.length<1){
           return
         }else {
           api.post('/User/GetUserPublicInfos',{"ids":listId}).then(res=>{
             let tempNick=res.data.value
             console.log(tempNick)
             for(let k in tempNick){
               this.TakeUserListNickName[tempNick[k].id]=this.getUserInfo(tempNick[k].headImageId,tempNick[k].nickName,tempNick[k].id)
             }
             //console.log(this.TakeUserListNickName,'nickNaME')
             this.$refs.packetDetail.refresh(true)
           })
         }
      },
      bindScroll(){
        this.scroll=new Packet.Scroll(document.body||document.documentElement,190,0)
        this.scroll.bindScrollBottom(this.getBindBtmData,this.RemeberRecord,this.tempcallback3)
      },
      getBindBtmData(){
         //alert('滚动到底部，红包详情页')
        //console.log(this.takeRedUserList.totalPage,this.takeRedUserList.currentPage)
        //this.getRedTakeIt(this.redId,1) //测试
        if(this.takeRedUserList.totalPage>=this.takeRedUserList.currentPage){
          //执行数据加载
          this.getRedTakeIt(this.redId,1)
        }else {
          this.LoadingShowIcon=false;
          //this.scroll.unbindSrcollBottom()
        }

      },
      RemeberRecord(data){

      },
      tempcallback3(data){

      },
      getUserTakeIt(redId){
        //获取用户对该红包领取情况排名
        api.post('/NormalEnvelope/GetMyDrawInfo',{
          "id": redId
        }).then(res=>{
          let temrp=res.data.value
          this.myTake=temrp
          /*alert(this.myTake.userOrder)
          console.log(this.myTake,222222222222)*/
        }).catch(err=>{
         if(err.data.err.code==4){
           this.myTake={}
           //console.log(this.myTake)
         }
        })
      },
      getUserInfo(a,b,c){
        let userImg=''
        if(a){
          userImg=`${api.getBaseUrl()}/Image/${a}`
        }else {
          userImg=require('../../../../assets/imgs/redInfo/az-icon-change_face@2x.png')
        }
        return {
          name:b||c,
          userImg:userImg,
        }
      }
    },
    created(){
      this.init()
      /*console.log(this.userInfos,333333333333)*/
      this.$nextTick(()=>{
        this.bindScroll()
      })

    },
    mounted(){
      //console.log(this.userNameImg,'xxxxxxxxx')

    },
    computed:{
      redId(){
        return this.$route.params.redId
      },
      routerType(){
        if(this.$route.type=='sendinfo'){
          //0是发送
          return 0
        }else {
          //1是接受
          return 1
        }

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
    destroyed(){
      this.scroll.unbindSrcollBottom()
    },
    components:{
      OrdinaryHeadBg,
      PacketDetailList,
      ShareAndGeneralize,
      NoUserTakeIt,
      Loading
    }
  }
</script>

<style type="text/scss" scoped lang="scss" rel="stylesheet/scss">
.ordinary{
 /* position: fixed;
  height: 100%;*/
  width: 100%;
  background: #fff;
  /*overflow-y: scroll;
  top: 0px;*/
  .getDetails{
    .fenge{
      height: 10px;
      background:rgba(238,238,238,1);
    }
    .detailWrap{
      height: 115px;
      box-sizing:border-box;
      padding: 20px;
      .detailTitle{
        font-size: 18px;
        font-family: PingFangSC_Bold;
        color: #333333;
        line-height: 25px
      }
      .detailInfo{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        p{
          font-size:12px;
          font-family:PingFangSC_Medium;
          color:rgba(136,136,136,1);
          line-height:17px;
        }
        h4{
          height:20px;
          font-size:14px;
          font-family:PingFangSC_Bold;
          color:rgba(51,51,51,1);
          line-height:20px
        }
      }
      .bg-fenge{
        margin-top: 16px;
        height:1px;
        width:335px;
        background:linear-gradient(-90deg,rgba(136,136,136,0),rgba(136,136,136,0.5),rgba(136,136,136,0));
      }
    }
  }
  .shareFriend{
    /*height: 159px;*/
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>
