<template>
  <div class="inputs">
    <input type="text" pattern="[1-9]*" maxlength="6" v-model="codeInput" @input="checkInput" ref="codeInput">
    <div class="input-border"></div>
    <div class="input-border"></div>
    <div class="input-border"></div>
    <div class="input-border"></div>
    <div class="input-border"></div>
    <div class="input-border"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        codeInput:'',
        curIndex: 1,
      }
    },
    props: {
      code: {
        type: String,
        default: ''
      }
    },
    methods: {
      initFocusInput(){
        this.codeInput = '';
        this.$refs.codeInput.focus();
      },
      checkInput(){
        if(this.codeInput.length >= 6){
          this.$refs.codeInput.blur();
          this.$emit('change',this.codeInput)
        }
      }
    },
    created() {

    },
  }
</script>

<style scoped lang="scss" type="text/scss">
  .inputs {
    display: flex;
    justify-content: space-between;
    input {
      position:absolute;
      width: 100%;
      height: 40px;
      background-color: transparent;
      font-size: 18px;
      font-family: DIN-Medium;
      color:#333333;
      letter-spacing: 49px;
      padding-left: 16px;
      border-radius: 0;
      box-sizing: border-box;
      &:disabled{
        color:#333333;
      }
    }
    .input-border{
      width:40px;
      height:40px;
      border-bottom: 1px solid #E5E5E5;
    }
  }
</style>
