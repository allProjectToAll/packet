<template>
  <div id="app">
    <div id="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    created() {
    },
    computed:{
    }
  }
</script>


<style type="text/scss" lang="scss">

  #app {
    .bg-fixed {
      position:fixed !important;
      top:0;
      left:0;
      bottom:0;
      right:0;
    }
    .mint-popup-bottom,
    .fixed-center {
      /*//兼容 web */
      left: 50%;
      max-width: 375px;
      width: 100%;
      transform: translateX(-50%);
    }
    .mint-loadmore-text {
      font-size: 14px;
      color: rgba(242, 197, 133, 1);
    }
  }
  @media(min-width:479px){
    #app {
      .bg-fixed {
        /*//兼容 web */
        position: fixed !important;
        top: 0;
        left: 50%;
        bottom: 0;
        max-width: 375px;
        width: 100%;
        transform: translateX(-50%);
      }
    }
  }
</style>
