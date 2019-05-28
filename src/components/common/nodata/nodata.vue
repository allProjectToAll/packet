<template>
    <div class="nodata">
      <p>{{$t('packet.noRed')}}</p>
      <!--<a href="http://www.baidu.com">123</a>-->
    </div>
</template>

<script>
  export default {
    name: "nodata"
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
.nodata{
  margin-top: 180px;
  p{
    font-size:14px;
    color:rgba(255,255,255,0.5);
    line-height:20px;
  }
}
</style>
