<template>
  <div class="loadSend" v-if="asyncs">
      <div class="shaowBg"></div>
      <div class="box">
          <img src="../../assets/imgs/loadSend.png" />
          <p class="title">{{$t('dialogPacket.isCreating')}}</p>
          <p class="backCash">{{$t('dialogPacket.backCash')}}</p>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      asyncs:false,
    };
  },
  watch: {
    
  },
  created() {
    
  },
  methods: {
    open(asyncs){
        this.asyncs = asyncs;
    }
   

  }
};
</script>

<style lang="scss" type="text/scss" scoped>
.loadSend {
    width:100%;
    height:100%;
    position: fixed;
    left:0;
    top:0;
    .shaowBg{
        width:100%;
        height:100%;
        background:#000000;
        opacity:0.5;
    }
    .box{
        width:275px;
        // height:191px;
        padding-bottom: 24px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        position: absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
        -webkit-transform:translate(-50%,-50%);
        img{
            width:40px;
            margin:28px 0 0 118px;
        }
        .title{
            width:100%;
            height:22px;
            font-size:16px;
            font-family:PingFang-SC-Medium;
            color:rgba(85,90,102,1);
            line-height:22px;
            text-align:center;
            margin-top:19px;
        }
        .backCash{
            width:235px;
            height:40px;
            font-size:14px;
            font-family:PingFang-SC-Medium;
            color:rgba(129,136,150,1);
            line-height:20px;
            margin:15px 0 0 20px;
            text-align:center;
        }
    }
}
</style>
