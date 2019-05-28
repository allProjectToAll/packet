<template>
  <div class="error" v-if="openAsync">
    <div class="bg"></div>
    <div class="errorBox">
      <img src="../../assets/imgs/warning.png" class="waringImg"/>
      <p class="Title">{{$t('errorDialog.setAssetPwd')}}</p>
      <div class="mess">
        {{$t('errorDialog.setAssetPwdTitle')}}
      </div>
      <div class="buttonBox">
        <button class="btn1" @click="cancle">{{$t('errorDialog.Cancel')}}</button>
        <button class="btn2" @click="confirme">{{$t('errorDialog.Confirm')}}</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        openAsync: false,
      }
    },
    computed: {},
    methods: {
      open() {
        this.openAsync = true;
      },
      cancle() {
        this.openAsync = false;
      },
      confirme() {
        this.openAsync = false;
        this.$emit("setPassword");
      }
    },
    created() {
    },
  }
</script>

<style scoped lang="scss" type="text/scss">
  .error {
    width: 100%;
    height: 100%;
    position: fixed;
    overflow: hidden;
    .bg {
      width: 100%;
      height: 100%;
      background: #000000;
      opacity: 0.5;
    }
    .errorBox {
      position: absolute;
      width: 275px;
      // height:238px;
      // padding-bottom: 24px;
      background: rgba(51, 53, 64, 1);
      border-radius: 4px;
      top: 151px;
      left: 50%;
      margin-left: -138px;
      overflow: hidden;
      .waringImg {
        width: 40px;
        margin: 28px 0 0 118px;
      }
      .Title {
        width: 100%;
        text-align: center;
        font-size: 16px;
        font-family: PingFang-SC-Medium;
        color: rgba(240, 241, 247, 1);
        line-height: 22px;
        margin-top: 24px;
      }
      .mess {
        width: 235px;
        // height:40px;
        font-size: 14px;
        font-family: PingFang-SC-Regular;
        color: rgba(129, 133, 150, 1);
        line-height: 20px;
        text-align: center;
        margin: 16px 0 0 20px;
      }
      .buttonBox {
        width: 275px;
        height: 44px;
        margin-top: 20px;
        border-top: 1px solid rgba(0, 0, 0, 0.3);
        button {
          float: left;
          display: block;
          width: 137px;
          line-height: 44px;
          text-align: center;
          font-size: 14px;
          color: rgba(224, 226, 237, 1);
          background: rgba(51, 53, 64, 1);
          border: none;
        }
        .btn1 {
          border-right: 1px solid rgba(0, 0, 0, 0.3);
        }
      }
    }
  }

</style>
