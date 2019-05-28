<template>
<div class="noUserTakeIt">
  <div class="wrappers">
    <img src="../../assets/imgs/redInfo/nouserTake_icon@2x.png" alt="">
    <p>{{$t('')}}</p>
  </div>

</div>
</template>

<script>
  export default {
    name: "no-user-take-it",
    data(){
      return {}
    }
  }
</script>

<style type="text/scss" scoped lang="scss" rel="stylesheet/scss">
.noUserTakeIt{
  .wrappers{
    width: 80px;
    height: 90px;
    overflow: hidden;
    margin: 0px auto ;
    padding: 108px 0px;
    img{

    }
    p{
      padding-top: 21px;
      font-size:12px;
      font-family:PingFang-SC-Medium;
      color:rgba(85,85,85,1);
      text-align: center;
      line-height:17px;
    }
  }
}
</style>
