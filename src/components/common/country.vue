<template>
  <div class="countryBox">
    <div class="PhoneBox">
      <span class="left-code" @click="popupVisible=true">
        <span class="add-img">+</span>
        <span class="country-code">
          {{phoneCode}}
        </span>
        <i class="icon-caret">
          <img src="../../assets/imgs/packetDraw/caret-bottom@2x.png" alt="">
        </i>
        <!--<span class="lineVer"></span>-->
      </span>
      <input type="number" pattern="[0-9]*" v-model="phoneNumber" :placeholder="$t('country.phonePlc')" class="phoneNumber" @blur="changeData" />
    </div>
    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <div>
        <i class="close-icon" @click="popupVisible=false">
          <img src="../../assets/imgs/packetDraw/close-pop@2x.png" alt="">
        </i>
        <div class="pop-title">{{$t('country.selTitle')}}</div>
        <div class="search-box">
          <i class="search-icon">
            <img src="../../assets/imgs/packetDraw/search-input@2x.png" alt="">
          </i>
          <input type="text" v-model="keyword" @input="search" :placeholder="$t('country.searchPlc')">
        </div>
        <div class="country-list">
          <div class="item" v-for="(c,index) in countryList" @click="selPhoneCode(c)">
            <span :class="`img ${c.shortName}`">
            </span>
            <span class="c-name">{{c.countryName}}</span>
            <span class="c-code">+{{c.phoneCode}}</span>
          </div>
          <div class="item no-country" v-if="countryList.length===0" >
            {{$t('country.noDataTip')}}
          </div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import api from '../../public/api'

  /***@augments
   * 初始化传进来的值
   * json: {
          phoneNumber: "123123",//初始化传进来的手机号码
        }
   选中国家，传出去的是：
   countryEmit = {
            phoneNumber:手机号码,
            phoneCode:国家代码,

        }

   */
  export default {
    props: {
      parentCountry:{
        type:Object
      }
    },
    data() {
      return {
        phoneCode: this.parentCountry.phoneCode || "0086",
        phoneNumber: this.parentCountry.phoneNumber || "",
        countryList: [],
        countryAllList: [],
        // shortName: "",
        keyword: '',
        popupVisible: false
      }
    },
    mounted() {
      this.getCountry();
    },
    methods: {
      getCountry() {
        api.post('/Country/GetList', null).then((res) => {
          this.countryAllList = res.data.value.map((c)=>{
            c.phoneCode = `${'0'.repeat(4 - c.phoneCode.length)}${c.phoneCode}`;
            return c;
          });
          this.countryList = this.countryAllList;
        }).catch((err) => {
          console.log(err);
        })
      },
      search() {
        this.keyword = this.keyword.trim();
        if (!this.keyword) {
          this.countryList = this.countryAllList;
          return;
        }
        let exactList = this.countryAllList.filter((country) => {
          return country.phoneCode.indexOf(this.keyword) === 0 || country.countryName.toLowerCase().indexOf(this.keyword.toLowerCase()) === 0
        })
        let blurList =  this.countryAllList.filter((country) => {
          return country.phoneCode.indexOf(this.keyword) > 0  || country.countryName.toLowerCase().indexOf(this.keyword.toLowerCase()) > 0
        })
        this.countryList = [...exactList,...blurList]
      },
      selPhoneCode(item) {
        // this.phoneCode = `${'0'.repeat(4 - item.phoneCode.length)}${item.phoneCode}`;
        this.phoneCode = item.phoneCode;
        this.keyword = "";
        this.changeData();
      },
      changeData() {
        let countryEmit = {
          phoneNumber: this.phoneNumber,
          phoneCode: this.phoneCode
        }
        this.popupVisible = false;
        this.$emit("change", countryEmit);
      },
    },

  }
</script>

<style lang="scss" type="text/scss" scoped>
  .countryBox {
    width:100%;
    .PhoneBox {
      position: relative;
      height: 44px;
      background: #F6F6F6;
      border-radius: 5px;
      width: 320px;
      input {
        position: absolute;
        width: 220px;
        height: 44px;
        background: transparent;
        left: 80px;
        right: 15px;
        top: 0;
        font-size: 14px;
        color:#333;
      }
      .left-code {
        position: absolute;
        cursor: pointer;
        height:44px;
        left: 10px;
        display: flex;
        align-items: center;
        color: #555;
        font-size: 14px;
        i {
          width: 12px;
          margin-left:14px;
        }
      }
    }
    .phoneNumber {
      float: left;
      // margin-left: 6px;
      width: 185px;
      height: 20px;
      // margin-top: 11px;
      background: #F5F5F5;
      border: none;
      margin-top: 0px;
      // border-left: 1px solid #E5E5E5;
      text-indent: 8px;
      &:focus {
        outline: none;
      }
    }
    .mint-popup-bottom{
      z-index:10001 !important;
      .pop-title,
      .search-box,
      .country-list{
         padding:0 15px;
       }
      .search-box{
        position:relative;
        margin:8px 0;
        ::-webkit-input-placeholder { /*WebKit browsers*/
          color: #999;
        }
        ::-moz-placeholder { /*Mozilla Firefox*/
          color: #999;
        }
        :-moz-placeholder { /*Mozilla Firefox*/
          color: #999;
        }
        :-ms-input-placeholder { /*Internet Explorer*/
          color: #999;
        }
        .search-icon{
          width:16px;
          height:16px;
          position:absolute;
          left:28px;
          top:8px;
        }
        input{
          background: #EEEEEE;
          border-radius:4px;
          width:100%;
          height:32px;
          padding-left: 40px;
          box-sizing: border-box;
        }
      }
      .country-list{
        height: 328px;
        overflow-y: scroll;
        .item{
          height:42px;
          line-height:42px;
          box-sizing: border-box;
          text-align: left;
          color:#333;
          box-shadow:0px 0px 0px rgba(229,229,229,1);
          .img{
            display: inline-block;
            width:30px;
            height:19px;
            margin-right:6px;
            vertical-align: middle;
            background-image:url('../../assets/imgs/flags@2x.png');
            background-size: auto 20px;
          }
          .c-code{
            float:right;
          }
          &.no-country {
            text-align: center;
            margin-top:100px;
          }
        }
      }
    }
  }

</style>
