//版本迁移
```
new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app');
```
Vue版本更新过快，api改动较大
谨记：时时刻刻学习最新api，看最新api和之前的api区别的地方



/*替换 debounce过滤器*/
```
//前
<input v-on:keyup="doStuff | debounce 500">
methods: {
  doStuff: function(){
    //....
  }
}


//后
<input v-on:keyup="doStuff">
methods: {
  doStuff: _.dobouce(function(){
    //....
  },500)
}



```

编写组件流程
  1、新建组件页面
  在新建页面中 export default {};//起码有这个


  2、在引用组件页面 import对应的组件
  import shopCart from '../shopCart/shopCart';


  注册组件
    components: {
      shopCart
    }


  3、应用组件标签
  <shopCart></shopCart>



  ```
  .logo
    width 100%
    height 100%
    line-height 44px
    border-radius 50%
    font-size 24px
    font-weight 700
    color #80858a
    background #2b343c
    &.active  /*不是很明白是什么意思*/ class="logo active"
      background rgb(0,160,220)
  ```




什么时候把 变量/常量 return出来


flex 0 0 105px代表

flex-grow:0;
flex-shrink:0;
flex-basis:105px;


写错了  把computed写成methods 了, 尴尬



/*Vue 缩写*/
//v-on
<!-- 完整语法 -->
<a v-on:click="dosomething"></a>

<!-- 缩写 -->
<a @click="dosomething"></a>

//v-bind
动态 Props

###类似于用 v-bind 绑定 HTML特性到一个表达式,也可以用 v-bind 绑定动态props到父组件的数据.
每当父组件的数据变化时，也会传导给子组件##
```
<div>
  <input v-model="selectFoods">
  <child v-bind:selectFoods="selectFoods"></child>
</div>

/*使用缩写*/
<child :selectFoods="selectFoods"></child>



export default {
    props: {
      selectFoods: {
        type: Array,
        default: []
      },
      deliveryPrice: {
        type: Number,
        default: 0
      }
    }
  }
```

移动端布局

    .block
      flex 1
      margin-top 18px
      text-align center
      border-right 1px solid rgba(7,17,27,.1)
      &:last-child
        border none





//原来添加到购物车用的是CSS3动画
transition all .4s linear

@click="setEmpty()"是这样还是@click="setEmpty" ???


淘宝 京东 购物车跳动



querySelector ??? 原生还是什么东西

$nextTick
