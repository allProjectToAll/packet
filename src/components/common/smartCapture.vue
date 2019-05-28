<template>
  <div id="smart-capture">
    <div :id="id" class="sc">
    </div>
  </div>
</template>

<script>
  // 智能检测组件
  // 当需要重新初始化智能验证组件时 调用组件的 init 方法
  // 弹框盾牌刮不出原因是 父辈元素 transform 影响
  export default {
    data() {
      return {
        sc:undefined
      }
    },
    props:{
      id:{
        default:'sc'
      }
    },
    methods:{
      init(){
        let that = this;
        // let scWraperDom = document.querySelector(`#${this.id} #SM_BTN_WRAPPER_1`);
        // scWraperDom&&scWraperDom.remove();
        document.getElementById(this.id).innerHTML = '';
        this.sc = new smartCaptcha({
          renderTo: `#${this.id}`,
          width: 314,
          height: 42,
          default_txt: this.$t('smartCaptcha.clickButtonToValidate'),
          success_txt: this.$t('smartCaptcha.ValidateSuccess'),
          fail_txt: this.$t('smartCaptcha.ValidateErrorToRefresh'),
          scaning_txt: this.$t('smartCaptcha.noopsyche'),
          success: function(data) {
            that.$emit('success',data);
          },
          error:function(err){
            console.log(err);
          }
        });
        this.sc.init();
      },
    },
    mounted(){
      this.init();
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  #smart-capture{
    width:100%;
    padding:0;
    height:44px;
    overflow: hidden;
    border-radius: 4px;
    .sc{
      /* width:100%; */
      padding:0;
      height:44px;
      margin-top:0;
      margin-left:0;
      background:#f6f6f6;
    }
  }
</style>
<style lang="scss" type="text/scss">
  #smart-capture {
    .sm-txt{
      color: #B5B5B5;
      font-family: PingFangSC_Light;
    }
    .sm-btn-success .sm-txt {
      color: #01bf8f;
    }
    #SM_BTN_1{
      line-height: 40px !important;
    }
    .sm-btn{
      border:1px solid #eaeaea;
      border-radius:5px;
      text-align: left;
      font-family: PingFangSC_Light;
    }
    #SM_POP_INNER_1{
      left:12px !important;
    }
    .nc-container #nc_1_wrapper{
      width:310px;
    }
  }
</style>
