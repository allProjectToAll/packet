<template>
  <div class="home">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {}
    },
    created() {
      this.$store.dispatch('initStore');
      this.$store.dispatch('getCurrencyPrecisions')
    },
  }
</script>

<style lang="scss" scoped type="text/scss">
  .home {
    width: 100%;
  }
</style>

