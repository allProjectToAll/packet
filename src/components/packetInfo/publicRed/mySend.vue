<template>
  <div class="mysend">
    <!--Bscroll-->
    <scroll class="red" ref="SendScroll"
            :datas="sendData.dataList"
            :scrollbar="scrollbar"
            :pullDownRefresh="pullDownRefreshObj"
            :pullUpLoad="pullUpLoadObj"
            @pullingDown="onPullingDown"
            @pullingUp="onPullingUp">
      <div slot="scrollContent" class="Send">
        <!--1代表拼手气红包，2代表裂变红包-->
        <!--我发出的-->
        <ul class="wrap-ul" v-if="isCanview">
          <li v-for="item in sendData.dataList"
              @click.prevent.stop="skipRedInfo('send',item.envelopeType,item.id,{nickName:userInfo.nickName?userInfo.nickName:'',creatorId:userInfo.userId,headImageId:userInfo.headImageId})">
            <div v-if="item.envelopeType==2" class="red-wrap">
              <div class="topInfo">
                <div class="drawTip" v-show="item.hasTopPrice"></div>
                <p class="bigDraw">{{item.currency?item.currency.toLocaleUpperCase():''}}</p>
              </div>
              <div class="portrait">
                <div class="imgInfo">
                  <img :src="item.currency |currencyImgPath" alt="">
                </div>
              </div>
              <p class="message fission">{{$t('redInfo.hasTakePr')}}</p>
              <h3 class="money">{{item.distributedNum}}</h3>
            </div>
            <div v-else class="red-wrap">
              <div class="topInfo">
                <p>{{userInfo.nickName||userInfo.userId}}</p>
              </div>
              <div class="portrait">
                <div class="imgInfo">
                  <img :src="userHeadImg" alt="">
                </div>
              </div>
              <p class="greeting">{{item.title}}</p>
              <p class="message">{{$t('redInfo.hasTakePr')}}</p>
              <h3 class="money">{{item.distributedNum}}</h3>
            </div>
          </li>
          <div v-if="(sendData.dataList.length)%2==1"
               style=" width: 150px;height: 190px;margin-bottom: 25px;margin-left: 25px;"></div>
          <!--<p class="no-more-data" v-show="!isHasMore&&sendData.dataList.length">{{$t('packet.noMore')}}~</p>-->
        <!--  <loading v-show="isHasMore&&sendData.dataList.length" ></loading>-->
          <no-data v-show="!sendData.dataList.length"></no-data>
        </ul>
      </div>
    </scroll>
    <!--mintui-->
    <!--mint不能满足需求-->
    <!--<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <ul>
        <li style="height: 30px;color: white" v-for="n in 100">{{n.toString()}}</li>
      </ul>
      <p>{{testData}}</p>
    </mt-loadmore>-->
  </div>
</template>

<script>
  import Scroll from '../../common/scroll/scrolls'
  import NoData from '../../common/nodata/nodata'
  /*  import Loading from '../../common/loading/loading'*/
  import api from '../../../public/api'

  import {mapActions,mapGetters} from 'vuex'
  export default {
    name: "my-send",
    data(){
      return {
        isCanview:false,
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
        allLoaded:false,
        fonTsize:api.fonTsize,
        lodingNow:true,
        sendData: {
          pageIndex: 1,
          pageSize: 10,
          totalPage: 0,
          dataList: [],
        },
      }
    },
    created(){
      if(!this.userInfo){
        this.getUser().then(res=>{
          this.isCanview=true
          setTimeout(()=>{
            this.$refs.SendScroll.refresh()
          },30)
        })
      }else {
        this.isCanview=true
      }
      this.initSendData(this.sendData)
    },
    activated(){
      this.$refs.SendScroll.refresh()
    },
    mounted(){
      this.$nextTick(()=>{
       //this.$refs.SendScroll.refresh()
      })
    },
    computed:{
      isHasMore(){
        return this.sendData.pageIndex<=this.sendData.totalPage
      },
      userHeadImg() {
        if (this.userInfo.headImageId) {
          /*/User/HeadImage/{userId}/{headImageId}*/
          return `${api.getBaseUrl()}/Image/${this.userInfo.headImageId}`
        } else {
          return require('../../../assets/imgs/redInfo/az-icon-change_face@2x.png')
        }
      },
      pullDownRefreshObj: function () {
        return this.pullDownRefresh ? {
          threshold: parseInt(this.pullDownRefreshThreshold),
          stop: parseInt(this.pullDownRefreshStop),
          txt:this.pullDownRefreshTxt,
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
        if(this.sendData.dataList.length){
          return this.$t('packet.upMore')
        }else {
          return ''
        }
      },
      ...mapGetters(['userInfo','isLogin'])
    },
    methods:{
      initSendData(data) {
          api.post('/MyEnvelopes/GetSent', {pageIndex: data.pageIndex, pageSize: data.pageSize}).then(res => {
            let temp = res.data.value
            data.totalPage = temp.totalPage
            data.pageIndex = temp.currentPage + 1
            data.dataList = data.dataList.concat(temp.items)
            if(!temp.items.length){
              this.$refs.SendScroll.forceUpdate()
            }else {
              this.$refs.SendScroll.forceUpdate(true)
            }
            //console.log(res,'获取或者刷新发送的红包的数据')
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
      scrollToEnd(){
        //滚动到底部去加载更多
        if(!this.isHasMore||this.lodingNow){
          return
        }else {
          this.lodingNow=true
          this.initSendData(this.sendData)
        }

      },
      onPullingDown() {
        // 下拉更新
        setTimeout(()=>{
          api.post('/MyEnvelopes/GetSent', {"pageIndex": 1, "pageSize": 10}).then((res) => {
            let temp = res.data.value
            this.sendData.totalPage = temp.totalPage
            this.sendData.pageIndex = temp.currentPage+1
            this.sendData.dataList = temp.items
            if(!temp.items.length){
              this.$refs.SendScroll.forceUpdate()
            }else {
              this.$refs.SendScroll.forceUpdate()
            }
          }).catch(err => {
            console.log(err)
          })
        },1000)
      },
      onPullingUp() {
        setTimeout(()=>{
          this.initSendData(this.sendData)
        },1000)
      },
      ...mapActions(['getUser'])
      /*loadTop() {
        this.$refs.loadmore.onTopLoaded();
      },
      loadBottom() {
        this.allLoaded = true;// 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded();
      }*/
    },
    components:{
      Scroll,
      NoData
    }

  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  @import "~assets/style/public";
  .mysend{
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
