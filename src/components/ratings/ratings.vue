<style lang="stylus" rel="stylesheet/stylus">
@import "ratings.styl";
</style>
<template>
  <div class="ratingsWrapper" ref="ratingsWrapper">
    <div class="ratings-content">
      <div class="info">
        <div class="mark">
          <div class="num">{{seller.score}}</div>
          <div class="text">综合评分</div>
          <div class="contrast">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="stars">
          <div class="serviceScore">
            <span class="text">服务态度</span>
            <star v-bind:size="36" v-bind:score="seller.serviceScore"></star>
            <span class="num">{{seller.serviceScore}}</span>
          </div>
          <div class="foodScore">
            <span class="text">服务态度</span>
            <star v-bind:size="36" v-bind:score="seller.foodScore"></star>
            <span class="num">{{seller.foodScore}}</span>
          </div>
          <div class="deliveryTime">
            <span class="text">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="evaluation">
        <div class="classify">
          <span class="item" v-for="(item, index) in classifyArr" v-bind:class="{'active':item.active, 'bad':index==2,'badActive':item.active&&index==2}" v-on:click="filterEvel(item)">
            {{item.name}}<span class="count">{{item.count}}</span>
          </span>
        </div>
        <div class="switch" v-on:click="evelflag=!evelflag">
         <span class="icon-check_circle" v-bind:class="{'on':evelflag}"></span> <!--设置图标高亮-->
          <span class="text">只看有内容的评论</span>
        </div>
        <div class="evel-list">
          <ul>
            <li class="evel" v-for="evel in evelArr">
              <div class="avatar">
                <img v-bind:src="evel.avatar" width="28" height="28" alt="">
              </div>
              <div class="content">
                <div class="user">
                  <span class="name">{{evel.username}}</span>
                  <span class="rateTime">{{evel.rateTime | formatDate}}</span>
                </div>
                <div class="star-wrapper">
                  <star :size="24" v-bind:score="evel.score"></star>
                  <span class="deliveryTime">{{evel.deliveryTime}}分钟送达</span>
                </div>
                <div class="text">{{evel.text}}</div>
                <div class="recommend">
                  <span class="icon icon-thumb_up" v-show="evel.recommend.length"></span>
                  <span class="dish" v-for="dish in evel.recommend">{{dish}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // 评论页问题是评论时间没有做好!!!important
  import star from '../star/star.vue';
  import axios from 'axios';
  import BScroll from 'better-scroll';
  import {formatDate} from '../../common/js/date';
  export default {
    data() {
      return {
        ratings: [],
        seller: {},
        classifyArr: [{
          name: '全部', // json格式
          count: 0,
          active: true
        }, {
          name: '推荐',
          count: 0,
          active: false
        }, {
          name: '吐槽',
          count: 0,
          active: false
        }],
        evelflag: true
      };
    },
    components: {
      star
    },
    created() {
      this._init();
    },
    computed: {
      evelArr() {
        let selectIndex = 0;
        this.classifyArr.forEach((data, index) => {
          if (data.active) { // data.active === true
            selectIndex = index;
          }
        });
        if (this.scroll) {
          this.$nextTick(() => {
            this.scroll.refresh();
          });
        }
          return selectIndex ? this.ratings.filter((data) => this.evelflag ? data.rateType === selectIndex - 1 && data.text : data.rateType === selectIndex - 1) : this.ratings.filter((data) => this.evelflag ? data.text : true);
        }
    },
    methods: {
      _init() {
        axios.get('static/data.json').then((res) => { // 获得json
          this.ratings = res.data.ratings;
          this.seller = res.data.seller;
          this._initClassifyArr();
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratingsWrapper, {
              click: true
            });
          });
        });
      },
      _initClassifyArr() { // 计算评价个数
        this.classifyArr.forEach((data, index) => {
          if (index) {
            data.count = this.ratings.filter((temp) => temp.rateType === index - 1).length;
          } else {
            data.count = this.ratings.length;
          }
        });
      },
      filterEvel(item) {
        this.classifyArr.forEach((data) => {
          data.active = false;
        });
        item.active = true;
      }
    },
    filters: { // 时间计算
      formatDate(rateTime) {
        let date = new Date(rateTime);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    }
  };

</script>

