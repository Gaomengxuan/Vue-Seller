<style lang="stylus" rel="stylesheet/stylus">
  @import "seller.styl";
</style>
<template>
  <div class="seller-wrapper" ref="sellerWrapper">
    <div class="seller-content">
      <div class="info">
        <div class="title">
          <div class="text">{{seller.name}}</div>
          <div class="star-wrapper">
            <star :size="36" :score="seller.score"></star>
            <span class="rate-count">({{seller.ratingCount}})</span>
            <span class="seller-count">月售{{seller.sellCount}}单</span>
          </div>
          <div class="collect">
            <span class="icon-favorite"></span>
            <span class="text">{{collectflag?'收藏':'已收藏'}}</span>
          </div>
        </div>
        <div class="remark">
          <div class="block">
            <h2>起送假</h2>
            <div class="content">
              <span class="num">{{seller.minPrice}}</span>元
            </div>
          </div>
          <div class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="num">{{seller.deliveryPrice}}</span>元
            </div>
          </div>
          <div class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="num">{{seller.deliveryTime}}</span>分钟
            </div>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="activities">
        <div class="bulletin">
          <h1>公告与活动</h1>
          <div class="content">
            {{seller.bulletin}}
          </div>
        </div>
      </div>
      <div class="supports">
        <ul>
          <li class="item" v-for="item in seller.supports">
            <iconMap :iconType="item.type"></iconMap>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <div class="divider"></div>
      <div class="seller-imgs">
        <h1>商家实景</h1>
        <div class="img-wrapper" ref="picsWrapper">
          <div ref="picList">
            <img v-for="pic in seller.pics" :src="pic" alt="" width="120" height="90">
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="seller-info">
        <h1>商家信息</h1>
        <ul class="info-list">
          <li class="info" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star.vue';
  import iconMap from '../iconMap/iconMap.vue';
  import axios from 'axios';
  import BScroll from 'better-scroll';
  export default {
    data() {
      return {
        seller: {},
        collectflag: false
      };
    },
    components: {
      star,
      iconMap
    },
    created() {
      this._init();
    },
    methods: {
      _init() {
        axios.get('static/data.json').then((res) => {
          this.seller = res.data.seller;
          this.$nextTick(() => {
            this.sellerScroll = new BScroll(this.$refs.sellerWrapper, {
              click: true
            });
            this._initPicScroll();
          });
        });
      },
      _initPicScroll() {
        if (this.picsScroll) {
          return;
        }
        const PIC_WIDTH = 120;
        const MARGIN = 6;
        let picLen = this.seller.pics.length;
        this.$ref.picList.style.width = PIC_WIDTH * picLen * MARGIN * (picLen - 1) + 'px';
        this.picsScroll = new BScroll(this.$refs.picsWrapper, {
          scrollX: true
        });
      }
    }
  };
</script>
