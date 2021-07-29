import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/views/layout'
import login from '@/views/login'
import index from '@/views/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: layout,
    children: [
      {
        path: '/index',
        name: 'index',
        component: index
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }
]

const router = new VueRouter({
  routes
})

export default router
