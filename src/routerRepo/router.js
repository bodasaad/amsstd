import Vue from "vue";
import Router from "vue-router";

import adminRoutes from './admin/main.js'
import studioRoutes from './studio/main.js'

import NotFound from '../views/404.vue';
Vue.use(Router);



let router = new Router({
  mode: "history",
  // base: process.env.BASE_URL,
  routes: [
    {
      name: 'home',
      path: '/:category?',
      meta: { index: 1 },
      component: () =>
        import(/* webpackChunkName: "studio" */ "@/views/Home.vue"),
    },
    {
      path: '*',
      name: 'Not Found',
      component: NotFound
    },
    ...studioRoutes,
    ...adminRoutes,
  ]
});




router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("at");
  const expiryDate = localStorage.getItem("aed");
  if (to.matched.some(record => record.meta.requiredAuth)) {
    console.log('requ');
    
    const oneday = 60 * 60 * 24 * 1000
    if (token == null || token === undefined) {
      next({
        name: 'Login',
      });
    } else {
      next();
    }
  } else {
    return next();
  }
});

export default router;
