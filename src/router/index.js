import {createRouter, createWebHistory} from 'vue-router'
import { useAuthStore } from '../stores/auth'
import About from '../views/About.vue'
import Albums from '../views/Albums.vue'
import Login from '../views/Login.vue'
import Songs from '../views/Songs.vue'

const router = createRouter({
    history: createWebHistory(),
    routes : [
        {
            path: '/login',
            name: 'Login',
            component: Login,
          },
          {
            path: '/about',
            name: 'About',
            component: About,
          },
          {
            path: '/',
            name: 'Songs',
            component: Songs,
          },
          {
            path: '/albums',
            name: 'Albums',
            component: Albums,
          },
    ],
})

// LV
// Tiek izveidots middleware / starpprogrammatūra kura katru reizi veiks pārbaudi pirms tiks nomainīta rūtera adrese
// arguments to glabā adresi uz kurieni gribam iet
// arguments from glabā adresi no kurienes mēs nākam

// ENG
// Middleware is a function that is executed before the route is changed
// argument "to" stores the address where we want to navigate/go
// argument "from" stores the address from where we're coming from

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const is_authenticated = authStore.is_authenticated;
    if (!is_authenticated && to.path !== '/login') {
      next('/login');
    } else if (is_authenticated && to.path === '/login') {
      next('/');
    } else {
      next();
    }
  });

export default router
