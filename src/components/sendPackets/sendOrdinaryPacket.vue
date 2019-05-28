<template>
  <div class="send-ordinary-packet">
    <div class="scroll-div">
      <div class="send-packet-top">
        <img src="../../assets/imgs/ordinaryPacket/send-ordinary-packet-top-bg@2x.png"/>
        <div class="top-mess">{{$t('sendOrdinary.topTitle')}}</div>
      </div>
      <div class="detail-form">
        <img src="../../assets/imgs/ordinaryPacket/step1@2x.png" class="step1"/>
        <p class="title">{{$t('sendOrdinary.detailTitle')}}</p>
        <div class="not-drawn-tip">
          {{$t('sendOrdinary.notDrawnTip')}}
        </div>
        <div class="input-div">
          <div class="label">
            {{$t('sendOrdinary.currencyLabel')}}
          </div>
          <div class="input-box">
            <span class="caret-icon" @click="openCurrencySelector"><img src="../../assets/imgs/down.png" alt=""></span>
            <!--<input type="text" class="input-text" v-model="packet.currency" @focus="openCurrencySelector"-->
            <!--:class="{'border-red':error.currency}" placeholder="请选择币种"/>-->
            <div class="input-text" :class="{'border-red':error.currency}" @click="openCurrencySelector">
              <span v-if="packet.currency">{{packet.currency}}</span>
              <span v-else style="color:#b2b2b2;">{{$t('sendOrdinary.currencyPlc')}}</span>
            </div>
            <p class="error">{{error.currency}}</p>
          </div>
        </div>
        <div class="input-div">
          <div class="label">
            {{$t('sendOrdinary.totalAmountLabel')}}
            <span class="right-label">{{$t('sendOrdinary.availableAmountLabel')}}: {{currency.availableCurrency}}</span>
          </div>
          <div class="input-box">
            <input type="number" class="input-text" v-model="packet.volume" :class="{'border-red':error.volume}"
                   :placeholder="$t('sendOrdinary.totalAmountPlc')"/>
            <p class="error">{{error.volume}}</p>
          </div>
        </div>
        <div class="input-div">
          <div class="label">
            {{$t('sendOrdinary.drawNumLabel')}}
          </div>
          <div class="input-box">
            <input type="number" pattern="[0-9]*" class="input-text" v-model="packet.number" :class="{'border-red':error.number}"
                   :placeholder="$t('sendOrdinary.drawNumPlc')"/>
            <p class="error">{{error.number}}</p>
          </div>
        </div>
        <div class="input-div">
          <div class="label">
            {{$t('sendOrdinary.titleLabel')}}
          </div>
          <div class="input-box">
            <input type="text" class="input-text" v-model="packet.title" :class="{'border-red':error.title}"
                   :placeholder="$t('sendOrdinary.titlePlc')" maxlength="30" />
            <p>
              <span class="error">{{error.title}}</span>
              <span class="bottom-tip">{{$t('sendOrdinary.titlelengthTip')}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="next fixed-center">
      <button @click="toNext">{{$t('message.nextStep')}}</button>
    </div>
    <select-dialog ref="currencySelector" @change="changeCurrency"></select-dialog>
  </div>
</template>

<script>
  import {Decimal} from 'decimal.js'
  import {Toast} from 'mint-ui'
  import selectDialog from '../common/selectDialog'
  import util from '../../public/util'

  export default {
    components: {
      selectDialog
    },
    data() {
      return {
        packet: {
          currency: '', //币种
          volume: '', //总金额
          number: '',
          title: '',
          captcha: '',
          tid: '',
        },
        currency:{
          availableCurrency: "0",//可用金额
          minTotalAmount: 0,//总金额不得小于
          withdrawPrecision: 0,//当前币种精度位数
          showPrecision:0
        },
        error: {
          currency: '', //币种
          volume: '', //总金额
          number: '',
          title: '',
        },
      }
    },
    methods: {
      openCurrencySelector() {//选择币种点击
        let par = {
          popupVisible: true,
          backFn: "change",
          selectCurrency: this.packet.currency,
        }
        this.$refs.currencySelector.init(par);
      },
      changeCurrency(data) {
        if(this.packet.currency !== data.id.toUpperCase()){
          this.packet.currency = data.id.toUpperCase();
          this.currency.availableCurrency = data.canUserCurrency;
          this.currency.minTotalAmount = data.currencyLastMoney;
          this.currency.withdrawPrecision = data.accuracy;
          this.currency.showPrecision = data.showPrecision;
        }
      },
      isNumber(val){
        return /^[0-9]+\.?[0-9]+$|^[0-9]$/.test(val)
      },
      validate() {
        let validated = true;
        if (!this.packet.currency) {
          this.error.currency = this.$t('sendOrdinary.currencyPlc');
          validated = false;
        } else {
          this.error.currency = '';
        }
        if (!this.packet.volume) {
          this.error.volume = this.$t('sendOrdinary.totalAmountPlc');
          validated = false;
        } else if (!this.isNumber(this.packet.volume)) {
          this.error.volume = this.$t('sendOrdinary.totalValidateErr');
          validated = false;
        } else if (this.packet.volume > this.currency.availableCurrency) {
          this.error.volume = this.$t('sendOrdinary.totalLessAvailable');
          validated = false;
        } else if (this.packet.volume < this.currency.minTotalAmount) {
          this.error.volume = this.$t('sendOrdinary.totalNumGrate') + this.currency.minTotalAmount;
          validated = false;
        } else if (this.packet.volume.indexOf('.') < this.packet.volume.length - this.currency.withdrawPrecision - 1) {
          this.error.volume = this.$t('sendOrdinary.totalDotNumLess').replace('0', this.currency.withdrawPrecision);
          validated = false;
        } else {
          this.error.volume = '';
        }
        if (!this.packet.number) {
          this.error.number = this.$t('sendOrdinary.drawNumPlc');
          validated = false;
        } else if (!this.isNumber(this.packet.number) || this.packet.number < 1 || this.packet.number > 1000) {
          this.error.number = this.$t('sendOrdinary.drawNumRange');
          validated = false;
        } else {
          this.error.number = '';
        }
        if(this.packet.title &&this.packet.title.length > 30) {
          this.error.title = this.$t('sendOrdinary.titleValidateErr');
          validated = false;
        } else {
          this.error.title = '';
        }
        if(validated && util.toFixed(new Decimal(this.packet.volume).div(this.packet.number).toString(),this.currency.showPrecision) == 0){
          validated = false;
          Toast({
            message:this.$t('sendOrdinary.moneyPerTiny'),
            position:'middle'
          })
        }
        return validated;
      },
      toNext() {
        if (this.validate()) {
          this.packet.title = this.packet.title || this.$t('sendOrdinary.titlePlc');
          this.$store.commit('SET_ORDINARY_PACKET', {packet:this.packet,currency:this.currency});
          this.$router.push({name: 'previewOrdinaryPacket'})
        }
      }
    },
    created() {
      Object.assign(this.packet, this.$store.state.user.ordinaryPacket.packet,{appCallback:this.$route.query.callback});
      Object.assign(this.currency, this.$store.state.user.ordinaryPacket.currency);
      this.$store.dispatch('getUser')
    }
  }

</script>

<style lang="scss" type="text/scss" scoped>
  .send-ordinary-packet {
    width: 100%;
    position: relative;
    height: 100%;
    box-sizing: border-box;
    .scroll-div{
      position: relative;
      .send-packet-top {
        width: 100%;
        height: 100px;
        position: relative;
        img {
          width: 100%;
        }
        .top-mess {
          position: absolute;
          width: 100%;
          left: 0;
          top: 30px;
          color: white;
          text-align: center;
          font-size:20px;
        }
      }
      .detail-form {
        width: 100%;
        background: white;
        border-radius: 12px 12px 0 0;
        position: absolute;
        overflow: hidden;
        top: 90px;
        padding:0 20px 90px;
        box-sizing: border-box;
        .step1 {
          width: 220px;
          margin: 20px auto;
          display: block;
        }
        .title {
          font-size: 18px;
          color: rgba(51, 51, 51, 1);
          margin-top: 30px;
          font-weight: 600;
        }
        .not-drawn-tip{
          font-size:14px;
          color:rgba(242,197,133,1);
          line-height:20px;
          margin:20px 0;
          /*font-weight: 200;*/
        }
        .input-div {
          width: 336px;
          margin: 0 auto;
          margin-top: 20px;
          .label {
            color: #555;
            margin-bottom: 10px;
            font-size: 14px;
            .right-label {
              float: right;
              color: #B5B5B5;
            }
          }
          .input-box { //44px
            position: relative;
            .error {
              font-size: 12px;
              color: #FD6433;
              float: left;
            }
            .bottom-tip{
              float:right;
              font-size:14px;
              margin-top:8px;
              color:rgba(181,181,181,1);
            }
            .caret-icon {
              position: absolute;
              width: 12px;
              top: 12px;
              right: 15px;
            }
            .input-text {
              width: 100%;
              height: 44px;
              background: #f6f6f6;
              border-radius: 4px;
              padding: 0 15px;
              box-sizing: border-box;
              &:focus {
                /*border: 1px solid #ccc;*/
                outline: none;
                border:0 none;
              }
              &.border-red {
                border: 1px solid #FD6433;
              }
            }
            div.input-text{
              /*color:#b5b5b5;*/
              font-size:14px;
              line-height: 44px;
            }
          }
        }
      }
    }
    .next {
      // padding-bottom:0;
      left: 0;
      bottom: 0;
      position: fixed;
      width: 100%;
      height: 74px;
      background: white;
      box-sizing: border-box;
      box-shadow: 0px -2px 4px 0px rgba(51,51,51,0.2);
      padding: 15px 20px;
      text-align: center;
      button {
        width: 335px;
        height: 44px;
        background: linear-gradient(90deg, rgba(255, 177, 0, 1), rgba(255, 147, 9, 1));
        border-radius: 4px;
        border: none;
        text-align: center;
        line-height: 44px;
        color: white;
        font-size: 16px;
        &:focus {
          outline: none;
        }
      }
    }
  }

</style>

