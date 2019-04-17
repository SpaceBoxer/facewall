import Vue from 'vue';
import Router from 'vue-router';

import {Util} from './utils';
import store from './store/store';
import config from './config';

const NotFoundView = () => import('./pages/not-found/not-found-view');
const Home = () => import('./pages/home/home');
const Login = () => import('./pages/login/login');

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        needLogin: true,
        title: 'FaceWall'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFoundView
    }
  ]
});

router.beforeEach((to, from, next) => {
  const metaData = to.meta || {};
  metaData.title && Util.setDocumentTitle(metaData.title);
  if (!config.noAuthentication && !store.getters.isLogin && metaData.needLogin) {
    next({path: '/login', query: {targetUrl: to.fullPath}});
  } else {
    next();
  }
});
router.afterEach(route => {
});

export default router;
