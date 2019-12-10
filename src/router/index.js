import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    // component: Home,
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/TreeBook',
    name: 'TreeBook',
    // component: Home,
    component: () => import('@/common/TreeBook'),
  }
]

const router = new VueRouter({
  routes
})

export default router
