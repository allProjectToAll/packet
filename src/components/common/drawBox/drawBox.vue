<template>
    <div class="draw-box" v-if="isView">
      <div class="receiveRed">
        <slot></slot>
      </div>
    </div>
</template>

<script>
  export default {
    name: "draw-box",
    data(){
        return{}
    },
    props:{
      isView:{
        type:Boolean,
        default:true
      }
    }
  }
</script>

<style type="text/scss" scoped lang="scss" rel="stylesheet/scss">
.draw-box{
  width: 375px;
  margin-bottom: 20px;
  .receiveRed{
    margin: 0 auto;
    width:335px;
    height:112px;
    background:linear-gradient(90deg,rgba(230,186,126,1),rgba(213,160,79,1));
    box-shadow:0px 5px 15px 0px rgba(213,161,80,0.3);
    border-radius:6px;
  }
}
</style>
