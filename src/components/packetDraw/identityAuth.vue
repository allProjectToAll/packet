<template>
  <div>
    <div class="input-info">
      <div class="pwd-div" v-if="validatedPhone">
        <div class="input-div" v-if="!isRegistered">
          <span class="input-label">{{$t('identityAuth.codeLabel')}}</span>
          <input type="text" :placeholder="$t('identityAuth.codeLabel')" :maxlength="6" v-model="bindData.code">
          <mt-button size="small" :disabled="endTime.timeDisabled" class="getMints1 router-btn"
                     @click="sendCode">
            {{$t('identityAuth.reget')}}<span v-if="endTime.phoneTimeSync">({{endTime.phoneTime}}s)</span>
          </mt-button>
        </div>
        <div class="input-div">
          <span class="input-label">{{$t('identityAuth.pwdLable')}}</span>
          <input :placeholder="isRegistered?$t('identityAuth.pwdLoginPlc'):$t('identityAuth.pwdRegisterPlc')" :type="pwdType"
                 v-model="bindData.password" />
          <span class="eye-icon" @click="togglePwdType">
              <img src="../../assets/imgs/packetDraw/azapp-icon-hide-pwd@2x.png" alt="" v-if="pwdType === 'password'">
              <img src="../../assets/imgs/packetDraw/azapp-icon-show-password@2x.png" alt="" v-else>
            </span>
        </div>
      </div>
      <div class="phone-div" v-else>
        <div class="input-div">
          <country @change="changeCountry" :parentCountry="bindData"></country>
        </div>
        <div class="input-div">
          <smart-capture ref="smartCapture" @success="captureSuc"></smart-capture>
        </div>
      </div>
    </div>
    <div class="draw-btn">
      <p v-if="type==1"><img :src="`/static/imgs/${language}/share-more@2x.png`|covImgPath" class="share-tip" alt=""></p>
      <p v-if="validatedPhone"><img :src="`/static/imgs/${language}/take-packet-btn@2x.png`|covImgPath" class="btn" alt=""
                                     @click="submit"></p>
      <p v-else><img :src="`/static/imgs/${language}/draw-packet-btn@2x.png`|covImgPath" class="btn" alt="" @click="beginSendCode"></p>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  import smartCapture from '../common/smartCapture'
  import country from '../common/country'
  import api from '../../public/api'

  export default {
    data() {
      return {
        bindData: {
          phoneNumber: '',
          phoneCode: '',
          password: '',
          code: '',
          rid: ''
        },
        phoneReg: /^\d{3,99}$/,
        endTime: {
          phoneTime: 60,
          phoneTimeSync: false,
          timeDisabled: false,
        },
        smartCaptureSuc: false,
        isRegistered: false,
        pwdType: 'password',
        captchaId: '',
        regetCodeNum: 0,
        validatedPhone:false
      }
    },
    components: {
      smartCapture,
      country
    },
    computed:{
      language(){
        return this.$store.state.user.language
      }
    },
    props:{
      type:Number // 1.裂变红包 2.拼手气红包
    },
    methods: {
      submit() {
        if (this.isRegistered && this.validatePwd()) {
          api.post('/User/Login', {
            "phoneNumber": this.bindData.phoneNumber,
            "phoneCode": parseInt(this.bindData.phoneCode),
            "password": this.bindData.password,
            "rid": this.bindData.rid,
          }).then((res) => {
            this.$store.commit('SET_TOKEN', res.data.value.token)
            this.$emit('success')
          })
        } else if(!this.isRegistered && this.validateCode() && this.validatePwd()){
          api.post('/User/RegisterWithPhone', {
            "phoneNumber": this.bindData.phoneNumber,
            "phoneCode": parseInt(this.bindData.phoneCode),
            "password": this.bindData.password,
            "captcha": this.bindData.code,
            "captchaId": this.captchaId
          }).then((res) => {
            this.$store.commit('SET_TOKEN', res.data.value.token)
            this.$emit('success')
          })
        }
      },
      validatePwd(){
        if(!this.bindData.password.trim()){
          Toast({
            message: this.$t('identityAuth.pwdReqiredMsg'),
            position: 'middle'
          });
          return false;
        }
        return true;
      },
      validateCode(){
        if(!this.bindData.code.trim()){
          Toast({
            message: this.$t('identityAuth.codeReqiredMsg'),
            position: 'middle'
          });
          return false;
        }
        return true;
      },
      validate() {
        if (!this.phoneReg.test(this.bindData.phoneNumber)) {
          Toast({
            message: this.$t('identityAuth.phoneReqiredMsg'),
            position: 'middle'
          });
          return false;
        }
        return true;
      },
      togglePwdType() {
        this.pwdType = (this.pwdType === 'password') ? 'text' : 'password';
      },
      initSmartCaptcha() {
        if(this.smartCaptureSuc === false){
          return;
        }
        this.smartCaptureSuc = false;
        if (this.bindData.rid) {
          this.bindData.rid = '';
        }
        this.$refs.smartCapture && this.$refs.smartCapture.init();
      },
      countDown() {
        this.endTime.phoneTimeSync = true;
        this.endTime.timeDisabled = true;
        this.endTime.phoneTime = 60;
        let interval = setInterval(() => {
          if (this.endTime.phoneTime > 0) {
            this.endTime.phoneTime = parseInt(this.endTime.phoneTime) - 1;
          } else {
            this.endTime.phoneTimeSync = false;
            this.endTime.timeDisabled = false;
            clearInterval(interval);
          }
        }, 1000)
      },
      sendCode() {
        if (this.regetCodeNum === 0) {
          this.captchaId = '';
          this.initSmartCaptcha();
          Toast({
            message: this.$t('identityAuth.regFailedMsg'),
            position: 'middle'
          });
          // this.$message({message:this.$t('bindDialog.scNotValid'),type:'error',showClose:true});
          return;
        }
        if (this.captchaId) {
          api.post('/Captcha/Resend', {
            captchaId: this.captchaId
          })
            .then((res) => {
              this.countDown();
              this.captchaId = res.data.value.captchaId;
              this.regetCodeNum--;
            });
        } else {
          api.post('/Captcha/Send', {
            phoneNumber: this.bindData.phoneNumber,
            phoneCode: parseInt(this.bindData.phoneCode),
            rid: this.bindData.rid
          })
            .then((res) => {
              this.countDown();
              this.captchaId = res.data.value.captchaId;
              this.regetCodeNum--;
            });
        }

      },
      beginSendCode() {
        if(!this.validate()){
          return;
        }
        api.post('/User/CheckPhone', {
          "phoneCode": parseInt(this.bindData.phoneCode),
          "phoneNumber": this.bindData.phoneNumber,
          "rid": this.bindData.rid
        }).then((res) => {
          if (res.data.value.countryInfos && res.data.value.countryInfos[0]) {
            this.isRegistered = true
          } else {
            this.sendCode()
          }
          this.validatedPhone = true;
        });
      },
      captureSuc(data) {
        this.smartCaptureSuc = true;
        this.regetCodeNum = 3;
        if (this.validate()) {
          let r = {
            "sessionId": data.sessionId,
            "sig": data.sig,
            "token": window.NVC_Opt.token,
            "scene": window.NVC_Opt.scene
          }
          api.post('/RobotValidator/Validate', r).then((res) => {//发送人机验证
            this.bindData.rid = res.data.value.rid;
          }, () => {
            this.initSmartCaptcha();
          });
        } else {
          this.initSmartCaptcha();
        }
      },
      changeCountry(data) {
        this.bindData.phoneCode = data.phoneCode;
        this.bindData.phoneNumber = data.phoneNumber;
      },
    },
    watch:{
      'bindData.phoneCode'(val){
        this.initSmartCaptcha();
        this.validatedPhone = false;
      },
      'bindData.phoneNumber'(val){
        this.initSmartCaptcha();
        this.validatedPhone = false;
      },
    },
    created() {
    },
  }
</script>

<style scoped lang="scss" type="text/scss">
  .input-info {
    height:108px;
    display: flex;
    justify-content: center;
    align-items: center;
    .input-div {
      margin-top: 30px;
      margin-left: auto;
      margin-right: auto;
      width: 316px;
      position: relative;
      &:first-child{
        margin-top: 0px;
      }
      input {
        outline: none;
        height: 44px;
        /*line-height: 44px;*/
        width: 100%;
        background: rgba(246, 246, 246, 1);
        border-radius: 4px;
        color: #555;
        border: 0;
        padding: 0 15px;
        box-sizing: border-box;
        font-family: 'PingFangSC_Light';
        font-size: 14px;
        color:#333;
      }
      .getMints1 {
        font-family: 'PingFangSC_Light';
        position: absolute;
        height: 20px;
        background-color: transparent;
        right: 15px;
        top: 12px;
        border: 0 none;
        box-shadow: none;
        font-size: 14px;
        color: rgba(238, 179, 80, 1);
        padding: 0;
        &:disabled{
          color: #B5B5B5;
        }
      }
    }
    .pwd-div {
      .input-label {
        position: absolute;
        left: 10px;
        top: 12px;
        font-size: 14px;
        font-family: 'PingFangSC_Light';
        color: rgba(85, 85, 85, 1);
      }
      .eye-icon {
        width: 24px;
        height: 24px;
        position: absolute;
        top: 10px;
        right: 15px;
      }
      input {
        padding-left: 80px;
      }
    }
  }
  .draw-btn {
    margin-top: 40px;
    text-align: center;
    img.share-tip {
      width: 132px;
      margin-bottom: 10px;
    }
    img.btn {
      width: 180px;
    }
  }
  .packet-draw-ordinary .draw-btn{
    margin-top: 40px;
  }
</style>
