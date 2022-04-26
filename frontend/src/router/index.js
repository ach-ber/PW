import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AvisView from '@/views/AvisView.vue'
import LoginView from '@/views/LoginView.vue'
import AccountView from '@/views/AccountView.vue'
import SigninView from '@/views/SigninView.vue'
import SearchView from '@/views/SearchView.vue'
import LoginViewBis from '@/views/LoginViewBis.vue'
import SigninViewBis from '@/views/SigninViewBis.vue'
import PublishView from '@/views/PublishView.vue'
import ModifyAvis from '@/views/ModifyAvis.vue'
import AboutView from '@/views/AboutView.vue'

const routes = [
  {
    path: '/ModifyAvis/:id',
    name: 'ModifyAvis',
    component: ModifyAvis
  },
  {
    path: '/SigninViewBis',
    name: 'SigninViewBis',
    component: SigninViewBis
  },
  {
    path: '/PublishView',
    name: 'PublishView',
    component: PublishView
  },
  {
    path: '/LoginViewBis',
    name: 'LoginViewBis',
    component: LoginViewBis
  },
  {
    path: '/AvisView/:id',
    name: 'AvisView',
    component: AvisView
  },
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/LoginView',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/SigninView',
    name: 'SigninView',
    component: SigninView
  },
  {
    path: '/AccountView',
    name: 'AccountView',
    component: AccountView
  },
  {
    path: '/SearchView',
    name: 'SearchView',
    component: SearchView
  },
  {
    path: '/about',
    name: 'about',
    component:AboutView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const privatePages = ['/AccountView','/PublishView','/ModifyAvis/:id'];
  const authRequired = privatePages.includes(to.path);
  const loggedIn = (sessionStorage.getItem('userId') && sessionStorage.getItem('token'));

  if (authRequired && !loggedIn) {
    return next('/LoginViewBis');
  }

  next();
})