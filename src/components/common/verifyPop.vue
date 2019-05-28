<template>
  <!-- <mt-popup v-model="popupVisible" position="bottom"> -->
  <div class="popupVisible fixed-center" v-if="popupVisible">
    <div class="shaowBg"></div>
    <div class="phone-verify">
      <div class="tops">
        <i class="close-icon" @click="popupVisible=false">
          <img src="../../assets/imgs/close.png" alt="">
        </i>
        <p class="pop-title">{{$t(`verifyCode.${this.type}PopTitle`)}}</p>
      </div>
      <div class="pop-body">
        <div :class="`send-tip ${type}`" v-if="type === 'google'">
          <p>{{$t('verifyCode.googleCodeSendTip1')}}</p>
          <p>
            <span>{{$t('verifyCode.googleCodeSendTip2')}}</span>
            <a target="_blank" :href="$t('verifyCode.googleWebSiteTip')">{{$t('verifyCode.googleWebSiteTip')}}</a>
            <span>{{$t('verifyCode.googleCodeSendTip3')}}</span>
          </p>
        </div>
        <p class="send-tip" v-else>{{$t('verifyCode.codeSendTip')}}{{number}}</p>
        <p class="label">
          <span>{{$t(`verifyCode.${this.type}CodeLabel`)}}</span>
          <mt-button class="resend-btn" :disabled="!!time.count" plain @click="resendCode">
            {{$t('verifyCode.resendBtnText')}} <span v-if="time.count>0">({{time.count}})</span>
          </mt-button>
        </p>
        <code-input :code="code" ref="codeInput" @change="changeCode"></code-input>
      </div>
    </div>
  </div>
  <!-- </mt-popup> -->
</template>

<script>
  import codeInput from './codeInput'
  import api from '../../public/api'

  export default {
    data() {
      return {
        popupVisible: false,
        time: {
          count: 0,
          timeInterval: undefined
        },
        type: 'phone',
        code: '',
        validate: {},
        resend: {},
        number: ''
      }
    },
    watch: {
      popupVisible(val) {
        if (!val && this.time.timeInterval) {
          clearInterval(this.time.timeInterval);
        }
      }
    },
    components: {
      codeInput
    },
    methods: {
      changeCode(code) {
        if (this.validate.url) {
          this.$emit('creating');
          api.post(this.validate.url, Object.assign(this.validate.params, {captcha: code}))
            .then((res) => {
              this.$emit('success', res.data.value);
              this.popupVisible = false;
            }, () => {
              this.code = '';
              this.$refs.codeInput.initFocusInput();
            });
        }
      },
      open(validatePara, resendPara) {
        this.time.count = 0;
        this.code = '';
        this.popupVisible = true;
        this.$nextTick(() => {
          this.$refs.codeInput.initFocusInput();
        })
        this.validate = Object.assign({
          url: '',
          params: {},
        }, validatePara);
        this.resend = Object.assign({
          url: '',
          params: {},
        }, resendPara);
        this.countDown();
      },
      countDown() {
        this.time.count = 60;
        this.time.timeInterval = setInterval(() => {
          if (this.time.count) {
            this.time.count--;
          } else {
            clearInterval(this.time.timeInterval);
          }
        }, 1000)
      },
      resendCode() {
        api.post(this.resend.url, this.resend.params)
          .then(() => {
            this.code = '';
            this.countDown();
            this.$refs.codeInput.initFocusInput();
          })
      },
      initInfo() {
        let userInfo = this.$store.state.user.info;
        if (userInfo.userOtpStatus === 1) {
          //绑定并且谷歌验证，进行谷歌验证
          this.type = 'google';
          return;
        }
        if (userInfo.phoneNumber) {
          //绑定手机，进行手机验证
          this.type = 'phone';
          this.number = userInfo.phoneNumber;
          return;
        }
        if (userInfo.email) {
          //绑定邮箱，进行邮箱验证
          this.type = 'email';
          this.number = userInfo.email;
          return;
        }
      }
    },
    created() {
      // 初始化信息
      if (!this.$store.state.user.info) {
        this.$store.dispatch('getUser').then(() => {
          this.initInfo();
        })
      } else {
        this.initInfo();
      }
    },
  }
</script>

<style scoped lang="scss" type="text/scss">
  .popupVisible {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    .shaowBg {
      width: 100%;
      height: 100%;
      background: #000000;
      opacity: 0.5;
    }
    .tops {
      width: 100%;
      height: 48px;
      i {
        float: right;
        img {
          width: 22px;
        }
      }
      p {
        float: left;
        font-size: 16px;
      }
    }
  }

  .phone-verify {
    position: absolute;
    width: calc(100% - 40px);
    height: 242px;
    background: white;
    padding: 20px;
    left: 0;
    bottom: 0;
    .pop-body {
      padding-bottom: 30px;
      .send-tip {
        margin: 30px 0;
        font-size: 16px;
        color: #333;
        &.google {
          p {
            font-size: 14px;
            a {
              color: #EEB350;
              text-decoration: none;
            }
          }
        }
      }
      .label {
        display: flex;
        font-size: 14px;
        justify-content: space-between;
        margin-bottom: 15px;
        color: rgba(51, 51, 51, 0.7);
        .mint-button {
          border-color: transparent;
          width: auto;
          box-sizing: border-box;
          font-size: 14px;
          height: 20px;
          color: rgba(51, 51, 51, 0.7);
          text-align: right;
          padding: 0;
          &:disabled {
            color: rgba(51, 51, 51, 0.4);
          }
        }
      }
    }
  }
</style>
