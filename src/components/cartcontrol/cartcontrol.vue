<style lang="stylus" rel="stylesheet/stylus">
  @import "cartcontrol.styl";
</style>
<template>
  <div class="cartcontrol">
    <transition name="fadeRotate">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="deleteCart()">
        <span class="icon-remove_circle_outline inner"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">
      {{food.count}}
    </div>
    <div class="cart-add" @click.stop.prevent="addCart($event)">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
//  var eventHub = new Vue();
export default {
  props: {
    // 在goods.vue的 <cartcontrol :food="food"></cartcontrol>使用到
    food: Object
  },
  methods: {
    addCart(event) {
      console.log(event.target);
      if (!event._constructed) {
        return;
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 0);
      }
      this.food.count++;
      // 在goods.vue上有引用
      this.$root.eventHub.$emit('cart.add', event.target);
    },
    deleteCart() {
      if (!event._constructed || !this.food.count) {
        return;
      }
      this.food.count--;
    }
  }
};
</script>
