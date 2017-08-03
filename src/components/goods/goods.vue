<style lang="stylus" rel="stylesheet/stylus">
  @import "goods.styl";
</style>
<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" @click="menuclick(index,$event)"   :class="index==menuCurrentIndex?'menu-item-selected':'menu-item'">
          <span class="text">
            <iconMap v-show="item.type>0" :iconType="item.type" class="iconMap "></iconMap>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" id="wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1>{{item.name}}</h1>
          <ul>
            <li  v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img width="57" height="57" :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2>{{food.name}}</h2>
                <p class="description" v-show="food.description">{{food.description}}</p>
                <div class="sell-info">
                  <span class="sellCount">月售{{food.sellCount}}</span>
                  <span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="newPrice"><span class="unit">￥</span>{{food.price}}</span>
                  <span v-show="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopCart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"></shopCart>

  </div>

</template>

<script type="text/ecmascript-6">
  import iconMap from '../iconMap/iconMap';
  import shopCart from '../shopCart/shopCart';
  import cartcontrol from '../cartcontrol/cartcontrol';
  import axios from 'axios';
  import BScroll from 'better-scroll';
//  import Vue from 'vue';
//  let eventHub = new Vue();
export default {
  props: {
    seller: Object
  },
  created() {
    axios.get('/static/data.json').then((res) => {
      this.goods = res.data.goods;
      this.$nextTick(() => {
        this._initScroll();
        this._calculateHeight();
      });
    });
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      foodsScrollY: 0

    };
  },
  computed: { // 计算属性
    menuCurrentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let topHeight = this.listHeight[i];
        let bottomHeight = this.listHeight[i + 1];
        if (!bottomHeight || (this.foodsScrollY >= topHeight && this.foodsScrollY < bottomHeight)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },

  methods: { // 方法
    _initScroll() {
      this.menuWrapper = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      });
      this.foodsScroll.on('scroll', (pos) => {
        this.foodsScrollY = Math.abs(Math.round(pos.y));
      });
    },
     _calculateHeight() {
       let foodList = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook');
       let height = 0;
       this.listHeight.push(height);
       for (let i = 0, l = foodList.length; i < l; i++) {
         let item = foodList[i];
         height += item.clientHeight;
         this.listHeight.push(height);
       }
      },
    menuclick(index, event) {
      if (!event._constructed) {
        return;
      }
      this.foodsScroll.scrollTo(0, -this.listHeight[index], 300);
        // scrollTo(x ,y ,time)
    }

  },
  components: {
    iconMap, // 商品优惠图标
    shopCart, // 购物车
    cartcontrol // 商品加减功能
  }
};
</script>
