import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import AuthPageVue from '../views/AuthPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      meta: { adminGuest: true},
      component: AuthPageVue
    }
  ] 
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.adminGuest)) {
    if (store.getters.isAdminAuthenticated) {
      next('/home');
      return;
    }
    next();
  } else {
    if (!store.getters.isAdminAuthenticated) {
      next('/');
      return;
    }
    next();
  }
});

export default router
