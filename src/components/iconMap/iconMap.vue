<template>
  <span class="iconMap" :class="iconClassMap[iconType]"></span>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      iconType: Number
    },
    created() {
      this.iconClassMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .iconMap
    display inline-block
    width 12px
    height 12px
    background-size 100% 100%
    background-repeat no-repeat
    &.decrease
      bg-image('decrease_4')
    &.discount
      bg-image('discount_4')
    &.guarantee
      bg-image('guarantee_4')
    &.invoice
      bg-image('invoice_4')
    &.special
      bg-image('special_4')
</style>
