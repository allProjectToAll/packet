<template>
  <div class="my">
    <!--<keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>-->
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {}
    },
    created(){
    }
  }
</script>

<style lang="scss" scoped type="text/scss">
  .my {
    width: 100%;
  }
</style>

