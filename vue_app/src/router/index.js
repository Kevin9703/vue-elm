import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      keepAlive: true, // 导航栏在该页面显示
    },
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      keepAlive: false,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/My',
    name: 'My',
    meta: {
      keepAlive: true,
    },
    component: () => import('../views/My.vue'),
  },
  {
    path: '/Find',
    name: 'Find',
    meta: {
      keepAlive: true,
    },
    component: () => import('../views/Find.vue'),
  },
  {
    path: '/Order',
    name: 'Order',
    meta: {
      keepAlive: true,
    },
    component: () => import('../views/Order.vue'),
  },
  {
    path: '/location',
    name: 'Location',
    meta: {
      keepAlive: false,
    },
    component: () => import('../views/Location.vue'),
  },
  {
    path: '/addressSelect',
    name: 'addressSelect',
    meta: {
      keepAlive: false,
    },
    component: () => import('../views/addressSelect.vue'),
  },
  {
    path: '/selectCity',
    name: 'selectCity',
    meta: {
      keepAlive: false,
    },
    component: () => import('../views/selectCity.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      keepAlive: false,
    },
    component: () => import('../views/login.vue'),
  },
  {
    path: '/signup',
    name: 'signUp',
    meta: {
      keepAlive: false,
    },
    component: () => import('../views/signUp.vue'),
  },
  {
    path: '/myDetail',
    name: 'myDetail',
    meta: {
      keepAlive: false,
    },
    component: () => import('../views/myDetail.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
