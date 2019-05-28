<template>
  <div class="sendProjectPackets">
    <div class="notFixed" ref="notFixed">
      <div class="sendPacketTop">
        <img src="../../assets/imgs/sendPacketTopBg.png" />
        <div class="top-mess">{{$t('sendProjectPacket.sendProjectPacket')}}</div>
      </div>
      <div class="detailBottom">
        <img src="../../assets/imgs/step1.png" class="step1"/>
        <p class="title">{{$t('sendProjectPacket.packetSet')}}</p>

        <p class="overdue">{{$t('sendProjectPacket.overDue')}}</p>

        <div class="label">
          <span class="currency">{{$t('sendProjectPacket.currency')}}</span>
          <span class="contactUs">
            <a href="https://support.azex.io/hc/zh-cn/articles/360005418274-%E8%81%94%E7%B3%BB%E6%88%91%E4%BB%AC" target="_blank">
              {{$t('sendProjectPacket.contactUs')}}
            </a>
          </span>
        </div>

        <div class="inputBox">
          <!-- <select-input class="select-input1" @selectFn1="getCurrency1" :currencys="select1"></select-input> -->

          <!-- <input type="text"  class="inputText" v-model="selectCurrency1" @focus="selectCurrancyFn"  :class="{borderRed:border.selectCurrency1}" :placeholder="$t('sendProjectPacket.choseCurrency')" /> -->
          <div class="inputText2" @click.prevent.stop="selectCurrancyFn" :class="{borderRed:border.selectCurrency1}" >
            <div v-if="!selectCurrency1" class="placeholders">
              {{$t('sendProjectPacket.choseCurrency')}}
            </div>
            <img src="../../assets/imgs/down.png" alt="">
            {{selectCurrency1}}
          </div>
          <p>{{error.sellectCurMes1}}</p>
        </div>
        <div class="label" style="margin-top:8px;">
          <span class="currency">{{$t('sendProjectPacket.currencyName')}}</span>
          <span class="canuser">{{$t('sendProjectPacket.canUserCurrency')}}{{canUserCurrency}}</span>
        </div>

        <div class="inputBox">
          <input type="number" class="inputText" v-model="submitMes.totalAmount"  :class="{borderRed:border.totalAmount}" :placeholder="$t('sendProjectPacket.allCashNotLower')+` ${currencyLastMoney1} ${selectCurrency1.toUpperCase()}`" />
          <p>{{error.allCash}}</p>
        </div>
        <div class="label" style="margin-top:8px;">
          <span class="currency">{{$t('sendProjectPacket.getWay')}}</span>
        </div>

        <div class="receiveWay">
          <button class="fixedAmount" style="float:left;" :class="{isActived:isActived}"  @click="toFixedFn">
            <img src="../../assets/imgs/azappchecked.png" v-if="isActived"/>
            <img src="../../assets/imgs/azappUncheck.png" else/>
            <span>{{$t('sendProjectPacket.fixedAmount')}}</span>
          </button>
          <button class="fixedAmount" style="float:right;" :class="{isActived:!isActived}" @click="toRandomFn">
            <img src="../../assets/imgs/azappchecked.png" v-if="!isActived"/>
            <img src="../../assets/imgs/azappUncheck.png" else/>
            <span>{{$t('sendProjectPacket.randomAmount')}}</span>
          </button>
        </div>
        <div class="label">
          <span class="currency">{{$t('sendProjectPacket.getAmount')}}</span>
        </div>

        <div class="inputBox"  v-if="isActived">
          <input type="number" class="inputText" v-model="submitMes.eachPacket"  :class="{borderRed:border.eachPacket}" :placeholder="$t('sendProjectPacket.eachPackAmount')"/>
          <p>{{error.eachPacket}}</p>
        </div>
        <div class="getCashRandow"  v-if="!isActived">
          <input type="number" class="inputText" v-model="submitMes.minNum"  :class="{borderRed:border.minNum}"  :placeholder="$t('sendProjectPacket.enterLastestAmount')" style="float:left;"/>
          <span style="float:left;">-</span>
          <input type="number" class="inputText" v-model="submitMes.largestNum"  :class="{borderRed:border.largestNum}" :placeholder="$t('sendProjectPacket.entermastestAmount')" style="float:right;"/>
          <div style="clear:both;"></div>
          <p>{{error.lastToMore}}</p>
        </div>
        <div class="label" style="margin-top:8px;">
          <span class="currency">{{$t('sendProjectPacket.knowPeop')}}</span>
        </div>
        <div class="inputBox">
          <!--+$t('sendProjectPacket.people')-->
          <input type="text" style="background:rgba(246,246,246,0.5);" class="inputText" :value="$t('sendProjectPacket.about')+' '+submitMes.expectedNumber+' '+$t('sendProjectPacket.people')"  :class="{borderRed:border.people}" disabled/>
          <p>{{error.people}}</p>
        </div>
        <!-- <input type="text" class="inputText" :value="'约'+submitMes.expectedNumber+'人'" disabled/> -->

        <div class="detail">
          <p>{{$t('sendProjectPacket.explain')}}</p>
          <br/>
          <ul>
            <li>{{$t('sendProjectPacket.firstSendPeop')}}</li>
            <li>{{$t('sendProjectPacket.secondSendPeop')}}</li>
            <li>{{$t('sendProjectPacket.threeSendPeop')}}</li>
          </ul>
        </div>

        <div class="setTitleBox">
          <span class="titles">{{$t('sendProjectPacket.bigSet')}}</span>
          <div style="float:right" class="setOpenBig" @click="toOpen">
            <span  :class="{changeColor:isOpen}">{{$t('sendProjectPacket.open')}}</span>
            <img src="../../assets/imgs/azappUncheck.png" v-if="!isOpen"/>
            <img src="../../assets/imgs/setBigPacket.png" v-if="isOpen"/>
          </div>
        </div>
        <div v-if="isOpen">
          <div class="label" style="margin-top:0;">
            <span class="currency">{{$t('sendProjectPacket.currency')}}</span>
          </div>

          <div class="inputBox">

            <div class="inputText2" @click.prevent.stop="selectCurrancyFn2" :class="{borderRed:border.selectCurrency2}" >
              <div v-if="!selectCurrency2" class="placeholders">
                {{$t('sendProjectPacket.choseCurrency')}}</div>
              <img src="../../assets/imgs/down.png" alt="">
              {{selectCurrency2}}
            </div>
            <p>{{error.sellectCurMes2}}</p>
          </div>

          <div class="label" style="margin-top:8px;"><!-- 中奖人数 -->
            <span class="currency">{{$t('sendProjectPacket.getprizePeop')}}</span>
          </div>
          <div class="inputBox">
            <input type="number" class="inputText" v-model="submitMes.getCashMenber" :class="{borderRed:border.getCashMenber}" :placeholder="$t('sendProjectPacket.enterPrizePeop')" />
            <p>{{error.getCashMenber}}</p>
          </div>

          <div class="label" style="margin-top:8px;"><!-- 单个中奖金额文字 -->
            <span class="currency">{{$t('sendProjectPacket.prizeCash1')}}</span>
            <span class="canuser">{{$t('sendProjectPacket.canUserCurrency')}} {{canUserCurrency2}}</span><!-- 可用金额 -->
          </div>
          <div class="inputBox">
            <input type="number" class="inputText" v-model="submitMes.winningAmount" :class="{borderRed:border.bigMoney}"
            :placeholder="$t('sendProjectPacket.prizeCash1')+$t('sendProjectPacket.notLower')+`${currencyLastMoney} ${selectCurrency2.toUpperCase()}`"/>
            <p>{{error.bigMoney}}</p>
          </div>

          <div class="label" style="margin-top:8px;"> <!-- 总金额文字 -->
            <span class="currency">{{$t('sendProjectPacket.currencyName')}}</span><!-- 总金额 -->
          </div>
          <div class="inputBox"><!-- 总金额 -->
            <input type="text" class="inputText"  style="background:rgba(246,246,246,0.5);" v-model="submitMes.allCashBig"  :class="{borderRed:border.allCashBig}" disabled :placeholder="$t('sendProjectPacket.currencyName')" />
            <p>{{error.allCashBig}}</p>
          </div>

          <div class="label">
            <span class="currency">{{$t('sendProjectPacket.prizePercent')}}</span>
          </div>
          <input type="text" class="inputText" v-model="submitMes.probabilityWinning" disabled  style="background:rgba(246,246,246,0.5);"/>
          <div class="detail">
            <p>{{$t('sendProjectPacket.explain')}}</p>
            <br/>
            <ul>
              <li>{{$t('sendProjectPacket.bigPrizeMath')}}</li>
              <li>{{$t('sendProjectPacket.bigPrizeDetail')}}</li>
            </ul>
          </div>

        </div>


        <div style="height:84px;width:335px;">&nbsp;</div>
      </div>
    </div>

    <div class="next fixed-center" v-if="nextAsync">
      <button @click="toNext">{{$t('sendProjectPacket.next')}}</button>
    </div>

    <select-dialog ref="selectCurrency1" @selectFn1="getCurrency1"></select-dialog>
    <select-dialog ref="selectCurrency2" @selectFn2="getCurrency2"></select-dialog>
  </div>
</template>

<script>
import api from "../../public/api";
import { Decimal } from "decimal.js";
import selectDialog from "../common/selectDialog";

export default {
  components: {
    selectDialog
  },
  data() {
    return {
      nextAsync:true,
      canUserCurrency: "0.00", //拼手气红包可用金额
      accuracyOrderL:0,//拼手气红包领取金额的提现精度
      currencyLastMoney1:"0",//普通总金额不得小于
      currencyLastMoney: "0", //大奖总金额不得小于
      canUserCurrency2: "0.00", //大奖可用金额
      accuracy: 0, //大奖总金额的提现精度
      showPrecision: 0, //大奖总金额的展示精度
      isActived: true, //领取方式
      isOpen: false, //是否开启大奖

      selectCurrency1: "", //下拉框返回的值
      selectCurrency2: "", //下拉框返回的值
      submitMes: {
        totalAmount: "", //总金额
        eachPacket: "", //固定金额下单个红包的领取金额
        minNum: "", //最小金额
        largestNum: "", //最大金额
        expectedNumber: "0", //预期人数
        allCashBig: "", //大奖的红包总金额
        getCashMenber: "", //大奖的红包的中奖人数
        winningAmount: "0", //中奖金额
        probabilityWinning: "0%" //中奖概率
      },
      error: {
        sellectCurMes1: "", //第一个选中币种
        allCash: "", //红包总金额
        eachPacket: "", //单个红包领取金额
        lastToMore: "", //最小金额和最大金额
        sellectCurMes2: "", //第二个选中币种的
        allCashBig: "", //大奖的总金额
        getCashMenber: "", //大奖的红包的中奖人数
        people:"",//拼手气红包的预期人数(不能超过10万人)
        bigMoney:"",//大奖的中奖金额(在精度以内)
      },
      border: {
        selectCurrency1: false, //请选择币种1
        totalAmount: false, //总金额
        eachPacket: false, //领取金额
        minNum: false, //最小金额
        largestNum: false, //最大金额
        selectCurrency2: false, //币种2
        allCashBig: false, //大奖总金额
        getCashMenber: false, //大奖的红包的中奖人数
        people:false,//拼手气红包的预期人数(不能超过10万人)
        bigMoney:false,//大奖的中奖金额(在精度以内)
      }
    };
  },
  watch:{
        "submitMes.totalAmount":{//总金额
            handler(val,oldVal){
              if(val==""){
                this.submitMes.expectedNumber = 0;
                this.submitMes.probabilityWinning = "0%";//中奖概率
                return;
              }
              if(/^[0-9]+\.?[0-9]{0,}$|^\.[0-9]+$/.test(val) ==false ||
               this.howManyPoint(val)>this.accuracyOrderL  //精度
               ){
                this.submitMes.totalAmount = oldVal;
              }else{
                  if(this.isActived==true){//固定金额
                    if(this.submitMes.eachPacket==""){
                      this.submitMes.expectedNumber = 0;//预期人数
                      this.submitMes.probabilityWinning = "0%";
                    }else{
                      //this.submitMes.totalAmount/this.submitMes.eachPacket/1.15//预期人数=总金额/金额/1.15
                      let a = new Decimal(this.submitMes.totalAmount);
                      a = Math.floor(a.dividedBy(this.submitMes.eachPacket).dividedBy(1.15).toString());
                      a = parseInt(new Decimal(a).toFixed(0).toString());
                      if(a<1){a=1;}
                      this.submitMes.expectedNumber = a;
                      if(this.submitMes.getCashMenber==""||this.submitMes.getCashMenber==0){
                        this.submitMes.probabilityWinning = "0%";
                      }else{
                        let b = new Decimal(this.submitMes.getCashMenber);
                        b = b.dividedBy(this.submitMes.expectedNumber).times(100).toString();
                        this.submitMes.probabilityWinning = this.numbersplice(b,4)+"%";
                      }
                    }
                  }else{//随机金额
                    if(this.submitMes.minNum=="" || this.submitMes.largestNum=="" || this.submitMes.minNum==0 || this.submitMes.largestNum==0){
                      this.submitMes.expectedNumber = 0;//预期人数
                      this.submitMes.probabilityWinning = "0%";
                    }else{
                      let a = new Decimal(this.submitMes.totalAmount);
                      let c = parseFloat(this.submitMes.minNum) + parseFloat(this.submitMes.largestNum);
                      a = Math.floor(a.dividedBy(c).times(2).dividedBy(1.15).toString());
                      a = parseInt(new Decimal(a).toFixed(0).toString());
                      if(a<1){a=1;}
                      this.submitMes.expectedNumber = a;
                      if(this.submitMes.getCashMenber==""||this.submitMes.getCashMenber==0){//大奖的红包的中奖人数
                        this.submitMes.probabilityWinning = "0%";
                      }else{
                        let b = new Decimal(this.submitMes.getCashMenber);
                        b = b.dividedBy(this.submitMes.expectedNumber).times(100).toString();
                        this.submitMes.probabilityWinning = this.numbersplice(b,4)+"%";
                      }
                    }
                  }
              }
      　　  },
      　　　deep:true
        },
        "submitMes.eachPacket":{//单个红包
            handler(val,oldVal){
              if(val==""){
                this.submitMes.expectedNumber = 0;
                this.submitMes.probabilityWinning = "0%";
                return;
              }
              if(/^[0-9]+\.?[0-9]{0,}$|^\.[0-9]+$/.test(val) ==false||
               this.howManyPoint(val)>this.accuracyOrderL  //精度
               ){

               this.submitMes.eachPacket = oldVal;
              }else{
                if(this.submitMes.totalAmount==""||this.submitMes.totalAmount==0 || val==0){
                  this.submitMes.expectedNumber = 0;
                  this.submitMes.probabilityWinning = "0%";
                }else{
                  //this.submitMes.totalAmount/this.submitMes.eachPacket/1.15//预期人数=总金额/金额/1.15
                  let a = new Decimal(this.submitMes.totalAmount);
                  a = Math.floor(a.dividedBy(this.submitMes.eachPacket).dividedBy(1.15).toString());
                  a = parseInt(new Decimal(a).toFixed(0).toString());
                  if(a<1){a=1;}
                  this.submitMes.expectedNumber = a;
                  if(this.submitMes.getCashMenber==""||this.submitMes.getCashMenber==0){//大奖的红包的中奖人数
                    this.submitMes.probabilityWinning = "0%";
                  }else{
                    let b = new Decimal(this.submitMes.getCashMenber);
                    b = b.dividedBy(this.submitMes.expectedNumber).times(100).toString();
                    this.submitMes.probabilityWinning = this.numbersplice(b,4)+"%";
                  }
                }
              }
      　　　},
      　　　deep:true
        },
        "submitMes.minNum":{
            handler(val,oldVal){
              if(val==""){
                this.submitMes.expectedNumber = 0;
                this.submitMes.probabilityWinning = "0%";
                return;
              }
              if(/^[0-9]+\.?[0-9]{0,}$|^\.[0-9]+$/.test(val) ==false||
               this.howManyPoint(val)>this.accuracyOrderL
               ){
                this.submitMes.minNum = oldVal;
              }else{
                if(this.submitMes.largestNum==""){
                  this.submitMes.expectedNumber = 0;
                  this.submitMes.probabilityWinning = "0%";
                }else{
                  if(parseFloat(this.submitMes.minNum)>parseFloat(this.submitMes.largestNum)){
                    this.submitMes.expectedNumber = 0;
                    this.submitMes.probabilityWinning = "0%";
                    this.error.lastToMore = this.$t("sendProjectPacket.lowNotBigBigest");
                  }else{
                    this.error.lastToMore = "";
                    if(this.submitMes.largestNum == 0 && this.submitMes.minNum == 0){
                      this.submitMes.expectedNumber = 0;
                      this.submitMes.probabilityWinning = "0%";
                    }else{
                      if(this.submitMes.totalAmount=="" || this.submitMes.totalAmount==0 ){
                        this.submitMes.expectedNumber = 0;
                        this.submitMes.probabilityWinning = "0%";
                      }else{
                        //this.submitMes.totalAmount/this.submitMes.eachPacket/1.15//预期人数=总金额/金额/1.15
                        let a = new Decimal(this.submitMes.totalAmount);
                        let b = parseFloat(this.submitMes.largestNum)+parseFloat(this.submitMes.minNum);
                        a = Math.floor(a.dividedBy(b).times(2).dividedBy(1.15).toString());
                        a = parseInt(new Decimal(a).toFixed(0).toString());
                        if(a<1){a=1;}
                        this.submitMes.expectedNumber = a;
                        if(this.submitMes.getCashMenber==""||this.submitMes.getCashMenber==0){//大奖的红包的中奖人数
                          this.submitMes.probabilityWinning = "0%";
                        }else{
                          let b = new Decimal(this.submitMes.getCashMenber);
                          b = b.dividedBy(this.submitMes.expectedNumber).times(100).toString();
                          this.submitMes.probabilityWinning = this.numbersplice(b,4)+"%";
                        }
                      }
                    }
                  }
                }
              }
      　　　},
      　　　deep:true
        },
        "submitMes.largestNum":{
            handler(val,oldVal){
              if(val==""){
                this.submitMes.expectedNumber = 0;
                this.submitMes.probabilityWinning = "0%";
                return;
              }
              if(/^[0-9]+\.?[0-9]{0,}$|^\.[0-9]+$/.test(val) ==false||
               this.howManyPoint(val)>this.accuracyOrderL
               ){
                this.submitMes.largestNum = oldVal;
              }else{
                if(this.submitMes.minNum == ""){
                  this.submitMes.expectedNumber = 0;
                  this.submitMes.probabilityWinning = "0%";
                }else{
                  if(parseFloat(this.submitMes.minNum)>parseFloat(this.submitMes.largestNum)){
                    this.submitMes.expectedNumber = 0;
                    this.submitMes.probabilityWinning = "0%";
                    this.error.lastToMore = this.$t("sendProjectPacket.lowNotBigBigest");
                  }else{
                    this.error.lastToMore = "";
                    if(this.submitMes.largestNum==0&&this.submitMes.minNum==0){
                      this.submitMes.expectedNumber = 0;
                      this.submitMes.probabilityWinning = "0%";
                    }else{
                      if(this.submitMes.totalAmount==""||this.submitMes.totalAmount==0 ){
                        this.submitMes.expectedNumber = 0;
                        this.submitMes.probabilityWinning = "0%";
                      }else{
                          let a = new Decimal(this.submitMes.totalAmount);
                          let b = parseFloat(this.submitMes.largestNum)+parseFloat(this.submitMes.minNum);
                          a = Math.floor(a.dividedBy(b).times(2).dividedBy(1.15).toString());
                          a = parseInt(new Decimal(a).toFixed(0).toString());
                          if(a<1){a=1;}
                          this.submitMes.expectedNumber = a;
                          if(this.submitMes.getCashMenber==""||this.submitMes.getCashMenber==0){//大奖的红包的中奖人数
                            this.submitMes.probabilityWinning = "0%";
                          }else{
                            let b = new Decimal(this.submitMes.getCashMenber);
                            b = b.dividedBy(this.submitMes.expectedNumber).times(100).toString();
                            this.submitMes.probabilityWinning = this.numbersplice(b,4)+"%";
                          }
                      }
                    }
                  }
                }
              }
      　　　},
      　　　deep:true
        },
        "submitMes.winningAmount":{//单个中奖金额
            handler(val,oldVal){
              if(val=="" || val==0){
                this.submitMes.allCashBig = 0;
                return;
              }
              if(/^[0-9]+\.?[0-9]{0,}$|^\.[0-9]+$/.test(val) ==false
              || this.howManyPoint(val)>this.accuracy){
                this.submitMes.winningAmount = oldVal;
              }else{
                if(this.submitMes.getCashMenber==""||this.submitMes.getCashMenber==0){
                  this.submitMes.allCashBig = 0;
                }else{
                  let b = new Decimal(this.submitMes.getCashMenber);
                  b = b.times(this.submitMes.winningAmount);
                  this.submitMes.allCashBig = this.numbersplice(b,this.accuracy);
                }
              }
      　　　},
      　　　deep:true
        },
        "submitMes.getCashMenber":{//大奖的红包的中奖人数
            handler(val,oldVal){
              if(val=="" || val == 0 ){
                this.submitMes.allCashBig = 0;
                this.submitMes.probabilityWinning = "0%";
                return;
              }
              if(/^[0-9]*$/.test(val)==false){
                this.submitMes.getCashMenber = oldVal;
              }else{
                if(this.submitMes.winningAmount==""||this.submitMes.winningAmount==0){
                  this.submitMes.allCashBig = 0;
                }else{
                  let b = new Decimal(this.submitMes.getCashMenber);
                  b = b.times(this.submitMes.winningAmount);
                  this.submitMes.allCashBig = this.numbersplice(b,this.accuracy);
                }

                if(this.submitMes.expectedNumber==""||this.submitMes.expectedNumber==0){
                  this.submitMes.probabilityWinning = "0%";
                }else{
                  let c = new Decimal(val);
                  c = c.dividedBy(this.submitMes.expectedNumber).times(100).toString();
                  this.submitMes.probabilityWinning = this.numbersplice(c,4)+"%";
                }
              }
      　　　},
      　　　deep:true
        },

  },
  computed:{

  },
  created(){
    // this.getcurrency();
    console.log(this.$store.state.user.fission1,22223333)
    if(this.$store.state.user.fission1.selectCurrency1){
      Object.assign(this.submitMes, this.$store.state.user.fission1);
      this.isActived= this.$store.state.user.fission1.isActived; //领取方式
      this.isOpen= this.$store.state.user.fission1.isOpen; //是否开启大奖
      this.selectCurrency1= this.$store.state.user.fission1.selectCurrency1;//下拉框返回的值
      this.selectCurrency2= this.$store.state.user.fission1.selectCurrency2; //下拉框返回的值
      // this.getCurrencyList(this.$store.state.user.fission1.selectCurrency2.toLowerCase());
      let par = {
          backFn:"selectFn1",
          selectCurrency:this.selectCurrency1.toLowerCase(),
        }
      let par2 = {
          backFn:"selectFn2",
          selectCurrency:this.selectCurrency2?this.selectCurrency2.toLowerCase():"",
        }

        this.$nextTick(()=>{
          this.$refs.selectCurrency1.toInitParent(par);
          this.selectCurrency2?this.$refs.selectCurrency2.toInitParent(par2):"";
        });
      setTimeout(() => {
        // this.$refs.selectCurrency1.toInitParent(par);
        this.submitMes.totalAmount= this.$store.state.user.fission1.totalAmount; //拼手气红包总金额
        this.submitMes.eachPacket= this.$store.state.user.fission1.eachPacket; //拼手气红包总金额
        this.submitMes.minNum= this.$store.state.user.fission1.minNum; //拼手气红包总金额
        this.submitMes.largestNum= this.$store.state.user.fission1.largestNum; //拼手气红包总金额


        if(this.selectCurrency2){
          this.submitMes.allCashBig= this.$store.state.user.fission1.allCashBig; //大奖的红包总金额
          this.submitMes.getCashMenber=this.$store.state.user.fission1.getCashMenber; //大奖的红包的中奖人数
          this.submitMes.winningAmount=this.$store.state.user.fission1.winningAmount; //中奖金额

        }

        setTimeout(() => {
          this.submitMes.expectedNumber = this.$store.state.user.fission1.expectedNumber; //预期人数
          this.submitMes.probabilityWinning=this.$store.state.user.fission1.probabilityWinning; //中奖概率
        }, 0);
      }, 300);

    }


  },
  mounted(){
  },
  methods:{

     selectCurrancyFn(){//第一个 选择币种点击
        let par = {
          popupVisible:true,
          backFn:"selectFn1",
          selectCurrency:this.selectCurrency1,
        }
       this.$refs.selectCurrency1.init(par);
     },
     selectCurrancyFn2(){//第二个 选择币种点击
        let par = {
          popupVisible:true,
          backFn:"selectFn2",
          selectCurrency:this.selectCurrency2,
        }
       this.$refs.selectCurrency2.init(par);
     },
     getCurrency1(val){//选中普通裂变红包币种后执行的
      this.selectCurrency1 = val.id.toUpperCase();//币种
      this.canUserCurrency = val.canUserCurrency;//可用金额
      this.accuracyOrderL = val.accuracy;//精度
      this.currencyLastMoney1 = val.currencyLastMoney,//普通红包总金额不得小于
      this.submitMes.totalAmount = "";
      this.submitMes.eachPacket = "";
      this.submitMes.minNum = "";
      this.submitMes.largestNum = "";
     },
     getCurrency2(val){//选中币种之后执行的
        this.selectCurrency2 = val.id.toUpperCase();//币种
        this.currencyLastMoney = val.currencyLastMoney,//总金额不得小于
        this.accuracy=val.accuracy;//大奖总金额的精度
        this.canUserCurrency2 = val.canUserCurrency;//大奖可用金额
        this.showPrecision = val.showPrecision;//大奖展示精度
        this.submitMes.allCashBig = "0";
        this.submitMes.getCashMenber = "";
        this.submitMes.winningAmount = "";
        this.submitMes.probabilityWinning = "0%";
     },
     howManyPoint(n){//判断有多少位小数点
        return n.toString().split(".")[1]?n.toString().split(".")[1].length:0;
     },
     utilToFixed(d,s=0){//截取多少位小数
        // 不要超过 16 位
        if (s === 0)
          return Math.floor(d);
        let str = this.utilScientificToNumber(d);

        let index = str.indexOf('.');
        if(index !== -1){
          let num = str.length-index-1; //原有小数位数
          if(num<s){
            str = `${str}${'0'.repeat(s-num)}`
          }else{
            str = str.slice(0,index+1+s);
          }
        }else{
          str = `${str}.${'0'.repeat(s)}`
        }
        return str
     },
     utilScientificToNumber(value){//科学记数法
        let str = value.toString();
        let eIndex = str.indexOf('e');
        if(eIndex<0){
          return str;
        }
        let powNum = str.slice(eIndex+2)-6;
        let arr = new Decimal(value).mul(Math.pow(10,powNum)).toString().split('');
        let dotIndex = arr.indexOf('.');
        arr.splice(dotIndex+1,0,'0'.repeat(powNum));
        return arr.join('');
     },
     numbersplice(value,pointNumber) {//截取相对精度的小数 value传的值，pointNumber精确到多少位小数（有些情况下会出现四舍五入现象）
        let p = new Decimal(value);
        return p.toFixed(pointNumber).toString();
      },
     toFixedFn(){
       this.isActived = true;
       this.submitMes.eachPacket = "";
       this.submitMes.expectedNumber = "0";
       this.submitMes.probabilityWinning = "0%";
       //报错
       this.error.eachPacket = "";
       this.border.eachPacket = false;
     },
     toRandomFn(){
       this.isActived = false;
       this.submitMes.minNum = "";
       this.submitMes.largestNum = "";
       this.submitMes.expectedNumber = "0";
       this.submitMes.probabilityWinning = "0%";
       //报错
       this.error.lastToMore = "";
       this.border.minNum = false;
       this.border.largestNum = false;
     },
     toOpen(){
       this.isOpen = !this.isOpen;
       if(this.isOpen==true){
         this.selectCurrency2 = "";
         this.submitMes.allCashBig = "0";
         this.submitMes.getCashMenber = "";
         this.submitMes.winningAmount = "";
         this.submitMes.probabilityWinning = "0%";
         this.currencyLastMoney= 0;//总金额不得小于
         this.canUserCurrency2 = "0.00";//大奖可用金额
         //报错
        this.border.selectCurrency2 = false;
        this.error.allCashBig = "";
        this.error.sellectCurMes2 = "";
        this.border.allCashBig = false;
        this.error.getCashMenber = "";
        this.border.getCashMenber = false;
        this.error.bigMoney = "";
        this.border.bigMoney = false;

       }
     },
     toNext(){
      if(this.selectCurrency1==""){
        this.error.sellectCurMes1 = this.$t("sendProjectPacket.choseCurrency");
        this.border.selectCurrency1 = true;
      } else {
        this.error.sellectCurMes1 = "";
        this.border.selectCurrency1 = false;
      }

      if (this.submitMes.totalAmount.toString().trim() == "" ) {
        this.error.allCash = this.$t("sendProjectPacket.enterPackAllCash");
        this.border.totalAmount = true;
      } else if (
        parseFloat(this.submitMes.totalAmount) > parseFloat(this.canUserCurrency)
      ) {
        this.error.allCash = this.$t("sendProjectPacket.enterNotBigCanUser");
        this.border.totalAmount = true;
      } else if(parseFloat(this.submitMes.totalAmount) < parseFloat(this.currencyLastMoney1)){
        this.error.allCash = this.$t("sendProjectPacket.allCashNotLowLast");
        this.border.totalAmount = true;
      } else {
        this.error.allCash = "";
        this.border.totalAmount = false;
      }

      if (this.isActived) {//固定金额
        if (
          this.submitMes.eachPacket.toString().trim() == "" ||
          this.submitMes.eachPacket.toString().trim() == 0
        ) {
          this.error.eachPacket =  this.$t("sendProjectPacket.enterEachGetCash");
          this.border.eachPacket = true;
        } else if (
          parseFloat(this.submitMes.eachPacket) >
          parseFloat(this.submitMes.totalAmount)
        ) {
          this.error.eachPacket = this.$t("sendProjectPacket.notBigAllCash");
          this.border.eachPacket = true;
        } else {
          this.error.eachPacket = "";
          this.border.eachPacket = false;
        }
      } else {//随机金额
        if (this.submitMes.minNum.toString().trim() == "") {
          this.error.lastToMore = this.$t("sendProjectPacket.enterLowerPrice");
          this.border.minNum = true;
        }else if(this.submitMes.minNum == 0){
          this.error.lastToMore = this.$t("sendProjectPacket.notZero");
          this.border.minNum = true;
        } else if (this.submitMes.largestNum.toString().trim() == "") {
          this.error.lastToMore = this.$t("sendProjectPacket.enterBigCash");
          this.border.largestNum = true;
        } else if (this.submitMes.largestNum.toString().trim() == 0) {
          this.error.lastToMore = this.$t("sendProjectPacket.allCashNtoZero");
          this.border.largestNum = true;
        } else if (
          parseFloat(this.submitMes.minNum) > parseFloat(this.submitMes.largestNum)
        ) {
          this.error.lastToMore = this.$t("sendProjectPacket.lowNotBigBigest");
          this.border.minNum = true;
          this.border.largestNum = true;
        } else {
          this.error.lastToMore = "";
          this.border.minNum = false;
          this.border.largestNum = false;
        }
      }


      if (this.isOpen) {//开启大奖红包
        if (this.selectCurrency2 == "") {
          this.error.sellectCurMes2 = this.$t("sendProjectPacket.choseCurrency");
          this.border.selectCurrency2 = true;
        } else {
          this.error.sellectCurMes2 = "";
          this.border.selectCurrency2 = false;
        }

        if (//大奖总金额
          parseFloat(this.submitMes.allCashBig) <
          parseFloat(this.currencyLastMoney)
        ) {
          this.error.allCashBig = this.$t("sendProjectPacket.allCashNotLower")+this.currencyLastMoney+this.selectCurrency2+this.$t("sendProjectPacket.changePeopleAndCash");
          this.border.allCashBig = true;
        } else if(this.selectCurrency1!="" && this.selectCurrency1 == this.selectCurrency2 && ( new Decimal(this.canUserCurrency).minus(this.submitMes.totalAmount).minus(this.submitMes.allCashBig).toString() < 0)){//两个币种相同时
          this.error.allCashBig = this.$t("sendProjectPacket.allCashNotBigCash");
          this.border.allCashBig = true;
        } else if(this.selectCurrency1 != this.selectCurrency2 && (parseFloat(this.canUserCurrency2) - parseFloat(this.submitMes.allCashBig))<0 ){//两个币种不想同时
          this.error.allCashBig = this.$t("sendProjectPacket.allCashNotBigCash");
          this.border.allCashBig = true;
        }else {
          this.error.allCashBig = "";
          this.border.allCashBig = false;
        }


        if (
          this.submitMes.getCashMenber.toString().trim() == "" ||
          this.submitMes.getCashMenber.toString().trim() == 0
        ) {
          this.error.getCashMenber = this.$t("sendProjectPacket.enterBigPerson");
          this.border.getCashMenber = true;
        } else if( parseInt(this.submitMes.getCashMenber) > parseInt(this.submitMes.expectedNumber)){
          this.error.getCashMenber = this.$t("sendProjectPacket.bigNotMorePeop");
          this.border.getCashMenber = true;
        } else {
          this.error.getCashMenber = "";
          this.border.getCashMenber = false;
        }

        if(
          this.submitMes.winningAmount.toString().trim() == "" ||
          this.submitMes.winningAmount.toString().trim() == 0
        ){
          this.error.bigMoney = this.$t("sendProjectPacket.enterEachBigGetCash");
          this.border.bigMoney = true;
        }else{
          this.error.bigMoney = "";
          this.border.bigMoney = false;
        }
      }


      if(parseInt(this.submitMes.expectedNumber)>100000){//拼手气红包不能超过10万人
          this.error.people =this.$t("sendProjectPacket.normalPeopMor");
          this.border.people = true;
      }else if(parseInt(this.submitMes.expectedNumber)<3){//不得小于三人
          this.error.people =this.$t("sendProjectPacket.notTooLower");
          this.border.people = true;
      }else{
        this.error.people ="";
        this.border.people = false;
      }

      //参数配置，进行下一步
      let par = {};
      if (this.isActived && this.isOpen) {
        if (
          this.border.selectCurrency1 == false &&
          this.border.totalAmount == false &&
          this.border.eachPacket == false &&
          this.border.selectCurrency2 == false &&
          this.border.allCashBig == false &&
          this.border.getCashMenber == false &&
          this.border.people == false &&
          this.border.bigMoney == false
        ) {
          par = {
            isActived: true,
            isOpen: true,
            selectCurrency1: this.selectCurrency1, //币种1
            totalAmount: this.submitMes.totalAmount, //总金额
            eachPacket: this.submitMes.eachPacket, //领取金额
            expectedNumber: this.submitMes.expectedNumber, //预期人数

            selectCurrency2: this.selectCurrency2, //币种2
            allCashBig: this.submitMes.allCashBig, //大奖的红包总金额
            getCashMenber: this.submitMes.getCashMenber, //大奖的红包的中奖人数
            winningAmount: this.submitMes.winningAmount, //中奖金额
            probabilityWinning: this.submitMes.probabilityWinning //中奖概率
          };
        } else {
          return;
        }
      }
      if (this.isActived && !this.isOpen) {
        if (
          this.border.selectCurrency1 == false &&
          this.border.totalAmount == false &&
          this.border.eachPacket == false &&
          this.border.people == false
        ) {
          par = {
            isActived: true,
            isOpen: false,
            selectCurrency1: this.selectCurrency1, //币种1
            totalAmount: this.submitMes.totalAmount, //总金额
            eachPacket: this.submitMes.eachPacket, //领取金额
            expectedNumber: this.submitMes.expectedNumber //预期人数
          };
        } else {
          return;
        }
      }
      if (!this.isActived && this.isOpen) {
        if (
          this.border.selectCurrency1 == false &&
          this.border.totalAmount == false &&
          // && this.border.eachPacket == false
          this.border.minNum == false &&
          this.border.largestNum == false &&
          this.border.selectCurrency2 == false &&
          this.border.allCashBig == false &&
          this.border.getCashMenber == false &&
          this.border.people == false &&
          this.border.bigMoney == false
        ) {
          par = {
            isActived: false,
            isOpen: true,
            selectCurrency1: this.selectCurrency1, //币种1
            totalAmount: this.submitMes.totalAmount, //总金额
            // eachPacket:this.submitMes.eachPacket,//领取金额
            minNum: this.submitMes.minNum, //最小金额
            largestNum: this.submitMes.largestNum, //最大金额
            expectedNumber: this.submitMes.expectedNumber, //预期人数

            selectCurrency2: this.selectCurrency2, //币种2
            allCashBig: this.submitMes.allCashBig, //大奖的红包总金额
            getCashMenber: this.submitMes.getCashMenber, //大奖的红包的中奖人数
            winningAmount: this.submitMes.winningAmount, //中奖金额
            probabilityWinning: this.submitMes.probabilityWinning //中奖概率
          };
        } else {
          return;
        }
      }
      if (!this.isActived && !this.isOpen) {
        if (
          this.border.selectCurrency1 == false &&
          this.border.totalAmount == false &&
          // && this.border.eachPacket == false
          this.border.minNum == false &&
          this.border.largestNum == false &&
          this.border.people == false
        ) {
          par = {
            isActived: false,
            isOpen: false,
            selectCurrency1: this.selectCurrency1, //币种1
            totalAmount: this.submitMes.totalAmount, //总金额
            // eachPacket:this.submitMes.eachPacket,//领取金额
            minNum: this.submitMes.minNum, //最小金额
            largestNum: this.submitMes.largestNum, //最大金额
            expectedNumber: this.submitMes.expectedNumber //预期人数
          };
        } else {
          return;
        }
      }
      console.log(par);
      this.$store.commit('SET_FISSION1_PACKET', par);
      this.$router.push({name:'sendPackets2',query:par})

    }
  }
};
</script>

<style lang="scss" scoped>
img{
   pointer-events: none;
}
.detailBottom {
  .borderRed {
    border: 1px solid red !important;
  }
}
.overdue{
  color:rgba(242,197,133,1);
  line-height:20px;
  width:335px;
  height:40px;
  font-size:14px;
  margin:20px 0 0 20px;
}

.inputBox {
  //44px
  height: 62px;
  p {
    margin-left: 20px;
    font-size: 12px;
    color: red;
    line-height: 21px;
  }
}
.sendProjectPackets {
  width: 100%;
  /*height: 100%;*/
  /*overflow: hidden;*/
  position: relative;
  .notFixed{
    position:relative;
    /*width:100%;*/
    /*height:100%;*/
    /*// overflow: auto;*/
    /*overflow-y: scroll;*/
  }
}
.changeColor {
  color: #ffb02e !important;
}
.sendPacketTop {
  width: 375px;
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
.detailBottom {
  width: 375px;
  background: white;
  position: absolute;
  left: 0;
  top: 90px;
  border-radius: 12px 12px 0 0;
  .step1 {
    width: 320px;
    margin: 20px 0 0 27px;
  }
  .title {
    font-size: 18px;
    color: rgba(51, 51, 51, 1);
    margin: 30px 0 0 20px;
    font-weight: bold;
  }
  .label {
    width: 335px;
    height: 30px;
    margin: 25px 0 0 20px;
    .currency {
      float: left;
      font-size: 14px;
      color: rgba(51, 51, 51, 1);
    }
    .contactUs {
      float: right;
      a{
        font-size: 14px;
        color: rgba(253, 100, 51, 1);
        text-decoration: none;
        &:hover{
          text-decoration: underline;
        }
      }
    }
    .canuser {
      float: right;
      font-size: 14px;
      color: rgba(181, 181, 181, 1);
    }
  }
  .select-input1 {
    width: 335px;
    height: 44px;
    margin: 5px 0 0 20px;
  }

  .inputText2{
    position: relative;
    width: 335px;
    height: 44px;
    background: rgba(246, 246, 246, 1);
    border-radius: 4px;
    border: 1px solid #eee;
    margin-left: 20px;
    text-indent: 10px;
    line-height:44px;
    img{
      position:absolute;
      right:16px;
      top:18px;
      width:14px;
    }
    .placeholders{
      position:absolute;
      left:0;
      top:0;
      line-height:44px;
      color:#B5B5B5;
    }
  }
  .inputText {
    width: 335px;
    height: 44px;
    background: rgba(246, 246, 246, 1);
    border-radius: 4px;
    // border: 1px solid #eee;
    margin-left: 20px;
    text-indent: 10px;
    &:focus {
      outline: none;
    }
  }
  .receiveWay {
    width: 335px;
    height: 44px;
    margin-left: 20px;
    .fixedAmount {
      position: relative;
      width: 155px;
      height: 44px;
      border: none;
      background: rgba(246, 246, 246, 1);
      border-radius: 5px;
      color: rgba(181, 181, 181, 1);
      &:focus {
        outline: none;
      }
      img {
        position: absolute;
        width: 16px;
        left: 12px;
        top: 15px;
      }
      // background:linear-gradient(90deg,rgba(255,142,76,1),rgba(253,100,51,1));
    }
    .isActived {
      background: linear-gradient(
        90deg,
        rgba(255, 142, 76, 1),
        rgba(253, 100, 51, 1)
      );
      color: white;
    }
  }
  .getCashRandow {
    width: 335px;
    height: 62px;
    margin-left: 20px;
    .inputText {
      width: 155px;
      margin-left: 0;
    }
    span {
      line-height: 44px;
      margin-left: 7px;
    }
    p {
      color: red;
      font-size: 12px;
      line-height: 21px;
    }
  }
  .detail {
    margin-top: 20px;
    width: 315px;
    background: rgba(254, 230, 157, 0.3);
    border-radius: 4px;
    margin-left: 20px;
    padding: 10px;
    p {
      color: rgba(85, 85, 85, 1);
      font-size: 14px;
    }
    ul {
      list-style: none;
      color: rgba(136, 136, 136, 1);
      font-size: 14px;
      line-height: 24px;
    }
  }
  .setTitleBox {
    width: 335px;
    margin: 20px;
    margin-bottom: 0;
    height: 40px;
    .titles {
      font-size: 18px;
      color: rgba(51, 51, 51, 1);
      font-weight: bold;
    }
    .setOpenBig {
      float: right;
      color: rgba(181, 181, 181, 1);
      font-size: 14px;
      /*margin-left: 20px;*/
      span {
        margin: 0;
      }
      img {
        float: right;
        width: 16px;
        margin-top: 7px;
        margin-right: 10px;
      }
      span {
        float: right;
        line-height: 29px;
      }
    }
  }
}
.next {
  // padding-bottom:0;
  left: 0;
  bottom: 0;
  position: fixed;
  width: 375px;
  height: 74px;
  background: white;
  border-top: 1px solid #eee;
  box-shadow:0px -2px 4px #eee;
  button {
    width: 335px;
    height: 44px;
    background: linear-gradient(
      90deg,
      rgba(255, 142, 76, 1),
      rgba(253, 100, 51, 1)
    );
    border-radius: 4px;
    border: none;
    text-align: center;
    line-height: 44px;
    color: white;
    font-size: 16px;
    margin-left: 20px;
    margin-top: 15px;
    &:focus {
      outline: none;
    }
  }
}
</style>

