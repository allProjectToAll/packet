<template>
  <div class="share-wrap">
    <h3 class="titles">{{DataInfo.title}}</h3>
    <p>{{$t('redInfo.transpondRed')}}</p>
    <div class="copyModel">
      <input type="text" disabled v-model="DataInfo.message" class="AZEX_copyText" :id="shareId" ref="ssss">
      <button type="button" class="copybtn noselect"
              v-clipboard:copy="`${DataInfo.text?DataInfo.text+'\n':''}${DataInfo.message}`"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError">{{$t('redInfo.copy')}}</button>
    </div>
  </div>
</template>

<script>
  //import { MessageBox } from 'mint-ui';
  import { Toast } from 'mint-ui';
  export default {
    name: "share-andgeneralize",
    props:{
      DataInfo:{
        type:Object,
        default:() => {
          return {}
        }
      },
      shareId:{
        type:String,
        default:''
      }
    },
    data(){
      return{

      }
    },
    created(){},
    methods:{
      onCopy: function (e) {
        Toast({
          message: `${this.$t('redInfo.justCopy')}`,
          duration: 1000
        });
       // MessageBox.alert(this.$t('redInfo.justCopy') + this.DataInfo.message).then(action => {});
       //console.log(this.$refs.ssss.value.indexOf('🔗'))
      },
      onError: function (e) {
        Toast({
          message: `${this.$t('redInfo.noCopy')}`,
          duration: 1000
        });
        //MessageBox.alert(this.$t('redInfo.noCopy')).then(action => {});
      }
    }
  }
</script>

<style type="text/scss" scoped lang="scss" rel="stylesheet/scss">
  @import "~assets/style/public";
  .share-wrap {
    .titles {
      font-size: 18px;
      font-family: PingFangSC_Bold;
      color: rgba(51, 51, 51, 1);
      line-height: 25px;
    }
    p {
      font-size: 14px;
      font-family: PingFangSC_Regular;
      color: rgba(181, 181, 181, 1);
      line-height: 20px;
      margin-top: 10px;
    }
    .copyModel {
      margin-top: 20px;
      width: 335px;
      height: 44px;
      display: flex;
      .AZEX_copyText {
        border: none;
        outline: none;
        width: 271px;
        @include no-wrap();
        font-size: 14px;
        font-family: PingFangSC_Regular;
        text-indent: 15px;
        background-color: #F6F6F6;
        color: #333333
      }
      .copybtn {
        width: 64px;
        border: none;
        box-shadow: none;
        height: 44px;
        background: linear-gradient(90deg, rgba(230, 186, 126, 1), rgba(213, 160, 79, 1));
        border-radius: 4px;
        font-family: PingFangSC_Medium;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
</style>
<style>
  .mint-msgbox-message{
    word-break: break-all;
  }
</style>
