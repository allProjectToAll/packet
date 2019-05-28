<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif" v-show="isLoadingIcon" alt="">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      },
      isLoadingIcon:{
        type:Boolean,
        default:true
      }
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  .loading{
    width:100%;
    height: 50px;
    text-align:center;
    .desc{
      line-height: 20px;
      font-size: 14px;
      color:rgba(242,197,133,1);
    }
  }



</style>
