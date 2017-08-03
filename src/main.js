// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引用的文件必须要使用
import Vue from 'vue';
import App from './App';
import VueResurce from 'vue-resource';
// import Router from './router';
import VueRouter from 'vue-router';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';
import './common/stylus/index.styl';
// Vue.config.productionTip = false;

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// });

Vue.use(VueRouter);
Vue.use(VueResurce);
// let app = Vue.extend(App);
// let router = new VueRouter();

/*
// 被替换的方法
// router.map({
//   '/goods': {
//     component: goods
//   }
// });
let router = new VueRouter({
  routes: [
    {path: '/goods', component: goods}
  ]
});

// router.start(app, '#app');
// router.go('/goods');

const app = new Vue({
  router
}).$mount('#app')
*/
var routes = [
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  {path: '/seller', component: seller}
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
var router = new VueRouter({
  routes: routes,
  'linkActiveClass': 'active'
});

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app');

// 1.0版本为 router.go('/goods');
router.push({ path: '/goods' });
