<!--<template>-->
  <!--<div id="app">-->
    <!--<img src="./assets/logo.png">-->
    <!--<router-view></router-view>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
  <!--name: 'app'-->
<!--}-->
<!--</script>-->

<!--<style>-->
<!--#app {-->
  <!--font-family: 'Avenir', Helvetica, Arial, sans-serif;-->
  <!-- -webkit-font-smoothing: antialiased;-->
  <!-- -moz-osx-font-smoothing: grayscale;-->
  <!--text-align: center;-->
  <!--color: #2c3e50;-->
  <!--margin-top: 60px;-->
<!--}-->
<!--</style>-->
<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller" keep-alive></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
import {urlParse} from './common/js/util';
import header from './components/header/header.vue';
import data from '../data.json';
// const errorOk = 0;
export default {
//  data() {
//    return {
//      seller: {
//        id: (() => {
//          var queryParam = urlParse();
//          return queryParam.id;
//        })()
//      }
//    };
//  },*/
  data() {
    return {
      seller: {
        id: (() => {
          var queryParam = urlParse();
          return queryParam.id;
        })()
      }
    };
  },
  created () {
//      this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
//        response = response.json();
//        if (response.errno === errorOk) {
//          this.seller = response.data;
//          this.seller = Object.assign({}, this.seller, response.data);
//        }
//      });
    this.seller = data.seller;
    },
    components: {
      'v-header': header
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
    .tab
      display flex
      width 100%
      height 40px
      line-height 40px
      border-1px(rgba(7,17,27,.1))
      .tab-item
        flex 1
        text-align center
        &>a
          display block
          font-size:14px;
          color rgb(77,85,93)
          &.active
            color rgb(240,20,20)




</style>
