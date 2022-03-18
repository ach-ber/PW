import { createRouter, createWebHashHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import TheRequete from '../components/TheRequete.vue'
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

const routes = [
  {
    path: '/HelloWorld',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/ModifyAvis',
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
    path: '/TheRequete',
    name: 'TheRequete',
    component: TheRequete
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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const privatePages = ['/AccountView',];
  const authRequired = privatePages.includes(to.path);
  const loggedIn = sessionStorage.getItem('token');

  if (authRequired && !loggedIn) {
    return next('/LoginView');
  }

  next();
})