<template>

  <div class="inputs">
    <input type="text" pattern="[0-9]*" maxlength="1" v-model="codeObj.c1" :disabled="curIndex!=1" ref="code1" @input="checkInput(1)"/>
    <input type="text" pattern="[0-9]*" maxlength="1" v-model="codeObj.c2" :disabled="curIndex!=2" ref="code2" @keyup.delete="clearInput(1)" @input="checkInput(2)"/>
    <input type="text" pattern="[0-9]*" maxlength="1" v-model="codeObj.c3" :disabled="curIndex!=3" ref="code3" @keyup.delete="clearInput(2)" @input="checkInput(3)"/>
    <input type="text" pattern="[0-9]*" maxlength="1" v-model="codeObj.c4" :disabled="curIndex!=4" ref="code4" @keyup.delete="clearInput(3)" @input="checkInput(4)"/>
    <input type="text" pattern="[0-9]*" maxlength="1" v-model="codeObj.c5" :disabled="curIndex!=5" ref="code5" @keyup.delete="clearInput(4)" @input="checkInput(5)"/>
    <input type="text" pattern="[0-9]*" maxlength="1" v-model="codeObj.c6" :disabled="curIndex!=6" ref="code6" @keyup.delete="clearInput(5)" @input="checkInput(6)"/>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        codeObj: {
          c1: '',
          c2: '',
          c3: '',
          c4: '',
          c5: '',
          c6: '',
        },
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
      checkInput(n) {
        if(!/[0-9]/.test(this.codeObj[`c${n}`])){
          this.codeObj[`c${n}`] = '';
          this.$refs[`code${n}`].value = '';
          return;
        }
        //下一个输入框聚焦
        if (n < 6) {
          this.curIndex = n + 1;
          this.$nextTick(() => {
            this.$refs[`code${n + 1}`].focus();
          })
        } else {
          this.curIndex = 0;
          this.$refs[`code${n}`].blur();
          this.$emit('change', Object.values(this.codeObj).join(''))
        }
      },
      clearInput(n){
        this.codeObj[`c${n}`] = '';
        this.curIndex = n;
        this.$nextTick(() => {
          this.$refs[`code${n}`].focus();
        })
      },
      initFocusInput() {
        this.initCodeObj();
        this.curIndex = 1;
        this.$nextTick(() => {
          this.$refs.code1.focus();
        })
      },
      initCodeObj() {
        this.codeObj = {
          c1: '',
          c2: '',
          c3: '',
          c4: '',
          c5: '',
          c6: '',
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
      width: 40px;
      height: 40px;
      background-color: transparent;
      border-bottom: 1px solid #E5E5E5;
      text-align: center;
      font-size: 18px;
      font-family: DIN-Medium;
      color:#333333;
      border-radius: 0;
      &:disabled{
        color:#333333;
      }
    }
  }
</style>
