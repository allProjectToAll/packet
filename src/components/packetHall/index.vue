<template>
  <div class="packet-hall">
    <div class="bg-fixed">
    </div>
    <div class="container" ref="scrollWrap">
      <mt-loadmore :bottom-method="loadBottom" :topMethod="refreshPage" :bottom-all-loaded="allLoaded"
                   :bottom-distance="30"
                   :autoFill="false" ref="loadmore" :topPullText="$t('message.pullDownRefreshText')"
                   :topDropText="$t('message.dropRefreshText')"
                   :topLoadingText="$t('message.loadingText')"
                   :bottomPullText="$t('message.pullUpRefreshText')"
                   :bottomDropText="$t('message.dropRefreshText')"
                   :bottomLoadingText="$t('message.loadingText')">
        <div class="top-banner">
          <div class="my-packet-btn" v-if="isLogin" @click="$router.push({name:'receive'})">
            {{$t('packet.myRedPacket')}}
          </div>
          <img :src="`/static/imgs/${language}/azwep_banner@2x.png`|covImgPath" class="banner" alt="">
        </div>
        <fission-packet :packet="pa" v-for="pa in packets" :key="pa.id"></fission-packet>
        <p v-if="isWeb && !allLoaded && !loadBusy" class="loadmore-btn-web">
          <span class="btn" @click="loadBottom">{{$t('message.loadMoreBtnText')}}</span>
        </p>
        <p class="no-more-data" v-if="allLoaded&&!loadBusy">{{$t('packet.noMore')}}~</p>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
  import fissionPacket from './fissionPacket'
  import api from '../../public/api'
  import util from '../../public/util'

  export default {
    data() {
      return {
        packets: [],
        filter: {
          pageIndex: 0,
          pageSize: 10
        },
        isWeb: !util.browser.versions.mobile,
        allLoaded: false,
        loadBusy: false,
      }
    },
    computed: {
      isLogin() {
        return this.$store.state.user.isLogin
      },
      language() {
        return this.$store.state.user.language
      }
    },
    methods: {
      async getPackets() {
        this.loadBusy = true;
        await api.post('/DividedEnvelope/GetPageList', this.filter)
          .then((res) => {
            this.allLoaded = this.filter.pageIndex >= res.data.value.totalPage;
            this.packets = this.packets.concat(res.data.value.items);
            this.loadBusy = false;
          }).catch(() => {
            this.loadBusy = false;
          })
        return;
      },
      loadBottom() {
        if (this.loadBusy || this.allLoaded) {
          return;
        }
        this.filter.pageIndex++;
        this.getPackets().then(() => {
          this.onBottomLoaded();
        });
      },
      onBottomLoaded() {
        let $loadmore = this.$refs.loadmore;
        $loadmore.bottomStatus = 'pull';
        $loadmore.bottomDropped = false;
        this.$nextTick(() => {
          $loadmore.translate = 0
        });
        if (!$loadmore.bottomAllLoaded && !$loadmore.containerFilled) {
          $loadmore.fillContainer()
        }
      },
      refreshPage() {
        this.filter.pageIndex = 1;
        this.packets = [];
        this.getPackets().then(() => {
          this.$refs.loadmore.onTopLoaded();
        });
      }
    },
    components: {
      fissionPacket
    },
    created() {
      console.log('packetHall')
      this.loadBottom();
    }
  }
</script>

<style lang="scss" type="text/scss">
  .packet-hall {
    width: 100%;
    padding-bottom: 40px;
    .bg-fixed {
      background: linear-gradient(180deg, rgba(42, 4, 19, 1), rgba(106, 24, 23, 1));
    }
    .loadmore-btn-web {
      color: rgba(242, 197, 133, 1);
      text-align: center;
      font-size: 14px;
      margin-top: 20px;
      span {
        text-decoration: underline;
      }
    }
    .container {
      position: relative;
      z-index: 2;
      min-height: 100%;
      .top-banner {
        position: relative;
        .my-packet-btn {
          cursor: pointer;
          position: absolute;
          width: 80px;
          height: 32px;
          line-height: 32px;
          text-align: center;
          top: 20px;
          right: 0px;
          border-top-left-radius: 20px;
          border-bottom-left-radius: 20px;
          background-color: #F34E28;
          color: #FEE69D;
          font-size: 14px;
        }
      }
      .fission-packet {
        width: 150px;
        display: inline-block;
        margin-left: 27px;
        margin-top: 16px;
        /*margin-right:25px;*/
        &:nth-child(even) {
          margin-left: 20px;
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
</style>

