<template>
    <div class="tipsComponet">
      <h1>{{DataInfo.title}}</h1>
      <p v-for="n in DataInfo.m" :class="DataInfo.m.length==1?'sortp':''">{{n}}</p>
    </div>
</template>

<script>
  export default {
    name: "tips-componet",
    props:{
      DataInfo:{
        type:Object,
        default:()=>{
          return {}
        }
      }
    }
  }
</script>

<style type="text/scss" scoped lang="scss" rel="stylesheet/scss">
  .tipsComponet{
    padding: 30px 20px 30px 20px;
    h1{
      font-size:18px;
      font-family:PingFangSC_Bold;
      color:rgba(51,51,51,1);
      line-height:25px;
      //margin-bottom: 20px;
    }
    p{
      font-size:14px;
      font-family:PingFangSC_Medium;
      color:rgba(136,136,136,1);
      line-height:20px;
      margin-top: 20px;
      &.sortp{
        margin-bottom: 20px;
      }
    }
  }

</style>
