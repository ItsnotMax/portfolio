import { createRouter, createWebHistory } from 'vue-router'
import { checkAuthStore } from '@/stores/authenticationStore'
import HomeView from '@/views/HomeView.vue'
import BookshelfView from '@/views/BookshelfView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'empty',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/bookshelf/',
      redirect: '/bookshelf/1',
      name: 'bookshelf',
    },
    {
      path: '/bookshelf/:page',
      name: 'bookshelfPage',
      component: BookshelfView,
      props: true,
      beforeEnter: (to, from, next) => {
        if (checkAuthStore().isAuthenticated || checkAuthStore().justLook) {
          next();
        } else {
          next('/home');
        }
      }
    },
  ]
})

export default router
