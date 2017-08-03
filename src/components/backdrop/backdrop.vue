<style lang="stylus" rel="stylesheet/stylus">
  @import "backdrop.styl";
</style>
<template>
  <transition name="fade-backdrop">
    <div class="backdrop" v-show="isShow"></div>
  </transition>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    isShow: Boolean
  }
};
</script>

