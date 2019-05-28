<template>
  <div class="selectDialog">
    <mt-popup v-model="popupVisible" position="bottom">
      <div class="selectDialogBox">
        <div class="TitleBox">
          <span class="titlemess">{{$t('sendProjectPacket.choseCurrency')}}</span>
          <img src="../../assets/imgs/close.png" class="close" @click="closeFn"/>
        </div>
        <div class="searchBox">
          <input type="text" v-model="searchValue" class="searchInput" :placeholder="$t('sendProjectPacket.searchCurrency')" @keyup="searchFn"/>
          <img src="../../assets/imgs/search.png" class="searchImg"/>
        </div>
        <div class="currencyGroup">
          <div class="eachCurrency" v-for="(item,index) in currency" :key=index @click="clickEach(index)">
            {{item?item.id.toUpperCase():""}}
            <img v-if="item.isRight" src="../../assets/imgs/right.png"/>
          </div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import api from "../../public/api";

  export default {
    components: {},
    data() {
      return {
        popupVisible: false,
        currency: [],
        currency2: [],
        backFn: "",
        searchValue: "",
      };
    },
    computed: {},
    created() {
      this.getcurrency();
    },
    methods: {
      init(par) {
        // console.log(par, 999)
        this.backFn = par.backFn;
        this.popupVisible = par.popupVisible;
        for (let i = 0; i < this.currency.length; i++) {
          if (par.selectCurrency && (this.currency[i].id == par.selectCurrency.toLowerCase())) {
            this.currency[i].isRight = true;
          } else {
            this.currency[i].isRight = false;
          }
        }
      },
      getcurrency() {
        api.post("/Currency/GetCurrencys", {}).then(res => {
          //   console.log(res);
          this.currency = [];
          this.currency2 = [];
          for (let i = 0; i < res.data.value.length; i++) {
            this.currency.push({
              id: res.data.value[i].id,
              isRight: false,
            })
            this.currency2.push({
              id: res.data.value[i].id,
              isRight: false,
            })
          }
        }).catch(err => {
          console.log(err);
        });
      },
      closeFn() {
        this.popupVisible = false;
      },
      clickEach(index) {
        this.popupVisible = false;
        this.searchValue = "";
        this.currency = this.currency2;
        this.getBalance(this.currency[index].id)

      },
      // let par = {  //以下注释是父组件传参形式
      //   backFn:"selectFn1",//父组件回掉函数
      //   selectCurrency:this.selectCurrency1.toLowerCase(),//币种
      // }
      // this.$nextTick(()=>{this.$refs.selectCurrency1.toInitParent(par)});
      toInitParent(par){//发送红包 返回（上一步）得时候，已知币种获取可用余额，调用父组件的函数
        this.backFn = par.backFn;
        this.getBalance(par.selectCurrency.toLowerCase());
      },
      getBalance(currency) {
        let par = {
          "currency": currency,
        }
        //  console.log(currency)
        api.post("/User/GetAssetPageList", par).then((res) => {
          // console.log(222222222)
          this.getCurrencyList(currency, res.data.value.items[0].balance);
        }).catch((error) => {
        });

      },
      getCurrencyList(currency,canUserCurrency){//获取最小精度和提现最小值
        api.post('/Currency/GetCurrencyWithdrawlInfo', {"id": currency}).then((res)=>{
          let showPrecision = this.$store.state.user.getCurrencyPrecisions.filter((item) => {
            return item.id == currency;
              })[0];
            let par2 = {
              id:currency,//选择的币种
              canUserCurrency:canUserCurrency,//可用金额
              currencyLastMoney:res.data.value.withdrawlOnceMin,//总金额不得小于
              accuracy:res.data.value.withdrawlPrecision, //币种提现精度
              showPrecision:showPrecision?showPrecision.showPrecision:undefined //币种展现的精度
            }
            this.$emit(this.backFn, par2);
        }).catch((err)=> {
            console.log(err);
        })
      },
      searchFn() {
        let searchMessage = this.searchValue.toUpperCase();//文字
        // console.log(searchMessage);
        let array = this.currency2.filter((item) => {
          return item.id.toUpperCase().indexOf(searchMessage) > -1;
        })
        let array2 = array.sort((a, b) => {
          return (a.id.indexOf(searchMessage) - b.id.indexOf(searchMessage));
        })
        this.currency = array2;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .selectDialogBox {
    width: 375px;
    height: 302px;
    background: white;
    -webkit-overflow-scrolling: touch;
  .TitleBox {
    width: 100%;
    height: 44px;

  .titlemess {
    float: left;
    margin: 10px 0 0 20px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    color: rgba(85, 85, 85, 1);
  }

  .close {
    float: right;
    width: 24px;
    margin: 10px 20px 0 0;
    cursor: pointer;
  }

  }
  .searchBox {
    width: 100%;
    height: 48px;
    position: relative;

  .searchInput {
    width: 335px;
    height: 32px;
    margin: 6px 20px;
    border: none;
    background: rgba(238, 238, 238, 1);
    border-radius: 4px;
    text-indent: 40px;

  &
  :focus {
    outline: none;
  }

  }
  .searchImg {
    position: absolute;
    width: 20px;
    left: 30px;
    top: 12px;
  }

  }
  .currencyGroup {
    width: 100%;
    height: 210px;

  .eachCurrency {
    position: relative;
    width: 100%;
    height: 42px;
    text-align: center;
    line-height: 42px;

  img {
    position: absolute;
    width: 24px;
    float: right;
    top: 9px;
    right: 20px;
  }

  }
  }

  }
</style>

