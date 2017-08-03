<style lang="stylus" rel="stylesheet/stylus">
  @import "shopCart.styl";
</style>
<template>
  <div class="">
    <div class="shopCart">
      <div class="content" @click="listToggle()">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="badge" v-show="totalCount">
              {{totalCount}}
              <!--计算商品个数-->
            </div>
            <div class="logo" :class="{'active':totalPrice}">
              <i class="icon-shopping_cart"></i>
            </div>
          </div>
          <div class="price" :class="{'active':totalPrice}">
            ￥{{totalPrice}}
            <!--计算商品总价-->
          </div>
          <div class="desc">
            另需要配送费￥{{deliveryPrice}}元
            <!--配送费是固定的-->
          </div>
        </div>
        <div class="content-right" v-bind:class="{'enough':totalPrice>=minPrice}">
          {{payDesc}}
      </div>
      </div>


    <div class="ball-container">
      <!--下面的name为drop的标签原为transition，这个标签用v-for报错-->
      <transition name="drop"
       v-on:before-enter="beforeEnter"
       v-on:enter="enter"
       v-on:after-enter="afterEnter"
       v-for="(ball,index) in balls" v-bind:key="ball">
        <div class="ball" v-show="ball.show">
          <div class="inner inner-hook"></div>
        </div>
      </transition>
    </div>
    <transition name="transHeight">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="setEmpty()">清空</span>
        </div>
        <div class="list-content" ref="foodlist">
          <ul>
            <li class="food" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price * food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
  <transition name="fade-backdrop" v-bind:key="fade-backdrop">
    <div class="backdrop" v-show="showBackdrop" @click="hideBackdrop()"></div>
  </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import backdrop from '../backdrop/backdrop.vue';
  import BScroll from 'better-scroll';
  import cartcontrol from '../cartcontrol/cartcontrol';
  export default {
    props: {
      selectFoods: {
        type: Array,
        default: []
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        balls: [{
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }],
        dropBalls: [],
        listShow: false
      };
    },
    created() {
      this.$root.eventHub.$on('cart.add', this.drop);
    },
    computed: {
      showBackdrop() {
        if (this.listShow && this.totalPrice) {
          return true;
        }
        this.listShow = false;
        return false;
      },
      // 计算总价
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          if (food.count) {
            total += food.price * food.count;
          }
        });
        return total;
      },
      // 计算总数
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc() {
        let diff = this.minPrice - this.totalPrice;
        if (!this.totalPrice) {
          return `￥${this.totalPrice}起送`;
        } else if (diff > 0) {
          return `还差￥${diff}元`;
        } else {
          return `去结算`;
        }
      }
    },
    methods: {
      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeEnter: function(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) { // ball.show === true
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
//            el.css({'display': 'none', 'webkitTransform': 'translate3d(0,${y}px,0)'});
            let inner = el.querySelector('.inner-hook');
            inner.style.webkitTransform = `translate3d(${x},0,0)`;
            inner.style.transform = `translate3d({${x},0,0)`;
          }
        }
      },
      enter: function(el) {
        el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = `translate3d(0,0,0)`;
          el.style.transform = `translate3d(0,0,0)`;
          let inner = el.querySelector('.inner-hook');
          inner.style.webkitTransform = `translate3d(0,0,0)`;
          inner.style.transform = `translate3d(0,0,0)`;
        });
      },
      afterEnter: function(el) {
        let ball = this.balls.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      setEmpty() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      _initScroll() {
        this.foodlistScroll = new BScroll(this.$refs.foodlist, {
          click: true
        });
      },
      listToggle() {
        if (!this.selectFoods.length) {
          return;
        }
        this.listShow = !this.listShow;
        if (this.listShow) {
          this.$nextTick(() => {
            if (!this.foodlistScroll) {
              this._initScroll();
            } else {
              this.foodlistScroll.refresh();
            }
          });
        }
      },
      hideBackdrop() {
        this.listShow = false;
      }
    },
    components: {
      backdrop,
      cartcontrol
    }
  };
</script>
