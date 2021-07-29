import layout from '@/views/layout'
import login from '@/views/login'
import index from '@/views/index'

const routes = [
  {
    path: '/',
    name: 'layout',
    component: layout,
    redirect: { name: 'index' },
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
  },
  {
    path: '*',
    redirect: { name: 'index' }
  }
]

export default routes
