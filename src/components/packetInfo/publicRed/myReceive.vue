<template>
    <div class="myreceive">
      <scroll class="red" ref="ReceiveScroll"
              :data="receiveData.dataList"
              :scrollbar="scrollbar"
              :pullDownRefresh="pullDownRefreshObj"
              :pullUpLoad="pullUpLoadObj"
              @pullingDown="onPullingDown"
              @pullingUp="onPullingUp">
        <div slot="scrollContent" class="Receive">
          <!--1代表拼手气红包，2代表裂变红包-->
          <!--EnvelopeType : (None,0)=[None] | (Common,1)=[拼手气红包] | (Divided,2)=[分裂红包]-->
          <!--我收到的-->
          <ul class="wrap-ul">
            <li v-for="item in receiveData.dataList"
                @click.prevent.stop="skipRedInfo('receive',item.envelopeType,item.envelopeId,{nickName:item.nickname,creatorId:item.creatorId,headImageId:item.headImageId})">
              <!--裂变-->
              <div v-if="item.envelopeType==2" class="red-wrap">
                <div class="topInfo">
                  <div class="drawTip" v-show="item.topPriceCurrency"></div>
                  <p class="bigDraw">{{item.currency?item.currency.toLocaleUpperCase():''}}</p>
                </div>
                <div class="portrait">
                  <div class="imgInfo">
                    <img :src="item.currency |currencyImgPath" alt="">
                  </div>
                </div>
                <p class="message">{{$t('redInfo.hasGet')}}({{item.currency?item.currency.toLocaleUpperCase():''}})</p>
                <h3 class="money" :style="fonTsize(item.volume.toString().length)">{{item.volume}}</h3>
                <div>
                  <div class="isDrawbig" v-show="(!item.topPriceVolume)&&(item.topPriceCurrency)"></div>
                  <div v-show="item.topPriceVolume&&item.topPriceCurrency" class="DrawBig">
                    <b></b>
                    <p>{{item.topPriceVolume}} <span>{{item.currency?item.currency.toLocaleUpperCase():''}}</span></p>
                  </div>
                </div>
              </div>
              <!--普通-->
              <div v-else class="red-wrap">
                <div class="topInfo">
                  <p>{{item.nickName||item.creatorId}}</p>
                </div>
                <div class="portrait">
                  <div class="imgInfo">
                    <img :src="sendUserImg(item.creatorId,item.headImageId)" alt="">
                  </div>
                </div>
                <p class="greeting">{{item.title}}</p>
                <p class="message">{{$t('redInfo.hasGet')}}({{item.currency?item.currency.toLocaleUpperCase():''}})</p>
                <h3 class="greetingMoney">{{item.volume}}</h3>
              </div>
            </li>
            <div v-if="(receiveData.dataList.length)%2==1"
                 style=" width: 150px;height: 190px;margin-bottom: 25px;margin-left: 25px;"></div>
            <!--<p class="no-more-data" v-show="!isHasMore&&receiveData.dataList.length">{{$t('packet.noMore')}}~</p>
            <loading v-show="isHasMore&&receiveData.dataList.length" ></loading>-->
            <no-data v-show="!receiveData.dataList.length"></no-data>
          </ul>
        </div>
      </scroll>
    </div>
</template>

<script>
  import Scroll from '../../common/scroll/scrolls'
  import NoData from '../../common/nodata/nodata'
  /* import Loading from '../../common/loading/loading'*/
  import api from '../../../public/api'


  export default {
    name: "my-receive",
    props:{
      userInfo:{
        type:Object,
        default:()=>{
          return {}
        }
      }
    },
    data(){
      return {
        scrollbar: false,
        scrollbarFade: true,
        pullDownRefresh: true,
        pullDownRefreshThreshold: 90,
        pullDownRefreshStop: 60,
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadNoMoreTxt: `${this.$t('packet.noMore')}~`,
        pullDownRefreshTxt: `${this.$t('packet.refreshSuc')}`,
        pullDownReleaseRefreshTxt:`${this.$t('packet.ReleaseRefreshTxt')}`,
        fonTsize:api.fonTsize,
        lodingNow:true,
        receiveData: {
          pageIndex: 1,
          pageSize: 10,
          totalPage: 0,
          dataList: [],
        },
      }
    },
    created(){
     this.initReceiveData(this.receiveData)
    },
    activated(){
      this.$refs.ReceiveScroll.refresh()
    },
    mounted(){
      this.$nextTick(()=>{
        this.$refs.ReceiveScroll.refresh()
      })
    },
    computed:{
      testData(){
        return this.userInfo.nickName
      },
      isHasMore(){
        return this.receiveData.pageIndex<=this.receiveData.totalPage
      },
      pullDownRefreshObj: function () {
        return this.pullDownRefresh ? {
          threshold: parseInt(this.pullDownRefreshThreshold),
          stop: parseInt(this.pullDownRefreshStop),
          txt: this.pullDownRefreshTxt,
          textRe:this.pullDownReleaseRefreshTxt
        } : false
      },
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      },
      pullUpLoadMoreTxt:function () {
        if(this.receiveData.dataList.length){
          return this.$t('packet.upMore')
        }else {
          return ''
        }
      }
    },
    methods:{
      initReceiveData(data) {
          api.post('/MyEnvelopes/GetDrawn', {"pageIndex": data.pageIndex, "pageSize": data.pageSize}).then((res) => {
            let temp = res.data.value
            data.totalPage = temp.totalPage
            data.pageIndex = temp.currentPage+1
            data.dataList = data.dataList.concat(temp.items)
            //console.log(data.dataList,length)
            this.lodingNow=false
            if(!temp.items.length){
              this.$refs.ReceiveScroll.forceUpdate()
            }
            console.log(res,'获取或者刷新接受到红包的数据')
          }).catch(err => {
            console.log(err)
          })
        },
      skipRedInfo(id, index, redId, user) {
        if (index == 1) {
          //1代表普通，2代表裂变
          //id 'receive'|'send'
          //redId 红包ID
          this.$router.push({name: 'ordinary', params: {type: id + 'info', redId: redId, user: user}})
        } else if (index == 2) {
          this.$router.push({name: 'fission', params: {type: id + 'info', redId: redId, user: user}})
        }
      },
      sendUserImg(sendUserId, headImgId) {
        if (headImgId) {
          return `${api.getBaseUrl()}/Image/${headImgId}`
        } else {
          return require('../../../assets/imgs/redInfo/az-icon-change_face@2x.png')
        }
      },
      onPullingUp() {
        // 上拉更新
        setTimeout(()=>{
          this.initReceiveData(this.receiveData)
        },1000)
      },
       onPullingDown() {
         // 下拉更新
        setTimeout(()=>{
          api.post('/MyEnvelopes/GetDrawn', {"pageIndex": 1, "pageSize": 10}).then((res) => {
            let temp = res.data.value
            this.receiveData.totalPage = temp.totalPage
            this.receiveData.pageIndex = temp.currentPage+1
            this.receiveData.dataList = temp.items
            if(!temp.items.length){
              this.$refs.ReceiveScroll.forceUpdate()
            }
            //console.log(res,'获取或者刷新接受到红包的数据')
          }).catch(err => {
            console.log(err)
          })
        },1000)
      },
      scrollToEnd(){
        //滚动到底部去加载更多
        if(!this.isHasMore||this.lodingNow){
            return
        }else {
          this.lodingNow=true
          this.initReceiveData(this.receiveData)
        }

      }
    },
    watch:{

    },
    components:{
      Scroll,
      NoData
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  @import "~assets/style/public";
  .myreceive{
    position: fixed;
    width: 375px;
    bottom: 0px;
    top: 66px;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    .red{
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      .wrap-ul {
        /*display: flex;*/
        display: box; /* OLD - Android 4.4- */
        display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6 */
        display: -moz-box; /* OLD - Firefox 19- (buggy but mostly works) */
        display: -ms-flexbox; /* TWEENER - IE 10 */
        display: -webkit-flex; /* NEW - Chrome */
        display: flex; /* NEW, Spec - Opera 12.1, Firefox 20+ */
        justify-content: space-around;
        -webkit-box-pack: center;
        /* 12版 */
        -webkit-justify-content: center;
        -moz-justify-content: center;
        -ms-justify-content: center;
        -o-justify-content: center;
        -webkit-box-lines: multiple;
        /* 12版 */
        -webkit-flex-wrap: wrap;
        -moz-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        -o-flex-wrap: wrap;
        flex-wrap: wrap;
        li {
          width: 150px;
          height: 190px;
          margin-bottom: 25px;
          &:nth-child(even) {
            margin-left: 25px;
          }
          @include bg-image("~assets/imgs/redInfo/azwep_red_bao");
          .red-wrap {
            .topInfo {
              position: relative;
              .drawTip {
                width: 34px;
                height: 38px;
                position: absolute;
                left: 6px;
                top: -9px;
                @include bg-image("~assets/imgs/redInfo/azwep_Awards_cn_1");
              }
              p {
                font-family: DIN-Medium;
                width: 72px;
                height: 11px;
                @include no-wrap();
                color: rgba(255, 255, 255, 1);
                margin: 12px auto 12px auto;
                line-height: 11px;
                text-align: center;
                font-size: 11px;
                &.bigDraw {
                  width: 64px;
                  height: 18px;
                  margin: 8px auto 9px auto;
                  text-align: center;
                  @include no-wrap();
                  font-size: 18px;
                  line-height: 18px;
                }
              }
            }
            .portrait {
              width: 48px;
              height: 48px;
              margin: 0 auto;
              padding-top: 2px;
              @include bg-image("~assets/imgs/redInfo/azwep_bi_bg");
              .imgInfo {
                width: 36px;
                height: 36px;
                margin: 2px auto;
                overflow: hidden;
                border-radius: 50%;
                text-align: center;
                img {
                  border-radius: 50%;
                  width: 36px;
                  height: 36px;
                }
                i {
                  line-height: 36px;
                  font-size: 24px;
                  color: #fff;
                }
              }
            }
            .message {
              font-size: 11px;
              font-family: PingFangSC_Medium;
              color: rgba(242, 197, 133, 0.5);
              line-height: 14px;
              text-align: center;
              margin-top: 6px;
              @include no-wrap();
              &.fission {
                margin-top: 32px;
              }
            }
            .money {
              width: 120px;
              height: 26px;
              font-size: 26px;
              font-family: DIN-Medium;
              font-weight: normal;
              color: rgba(242, 197, 133, 1);
              line-height: 26px;
              margin: 6px auto 0px;
              text-align: center;
              @include no-wrap();
            }
            .isDrawbig {
              width: 64px;
              height: 16px;
              margin: 20px auto 0px;
              @include bg-image("~assets/imgs/redInfo/azwep_icon_draw")
            }
            .DrawBig {
              display: flex;
              justify-content: center;
              align-items: center;
              b {
                width: 32px;
                height: 16px;
                @include bg-image("~assets/imgs/redInfo/wep_icon_bd_cn")
              }
              p {
                font-size: 18px;
                font-family: DIN-Medium;
                color: rgba(242, 197, 133, 1);
                line-height: 18px;
                span {
                  font-size: 16px;
                  line-height: 16px;
                }
              }

            }
            .greeting {
              font-size: 12px;
              text-align: center;
              font-family: PingFangSC_Medium;
              color: rgba(242, 197, 133, 1);
              line-height: 14px;
              height: 14px;
              margin-top: 6px;
              margin-bottom: 20px;
              @include no-wrap()
            }
            .greetingMoney {
              font-size: 18px;
              font-family: DIN-Medium;
              color: rgba(242, 197, 133, 1);
              line-height: 18px;
              margin-top: 10px;
              text-align: center;
              @include no-wrap()
            }
          }
        }
        .no-more-data {
          font-size: 14px;
          padding: 30px 0;
          color: rgba(242, 197, 133, 1);
          line-height: 20px;
          text-align: center;
        }
      }
    }
  }
</style>
