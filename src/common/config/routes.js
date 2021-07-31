/**
  *规则
  *一、例如：index/index，shop/index以index结尾的，path和name默认去除index
  *二、例如：shop/list，默认生成name为shop_list（如果结尾为index，例如shop/index则是shop）
  *三、手动填写配置后不会自动生成
**/

const routes = [
  {
    path: '/',
    name: 'layout',
    component: 'layout',
    redirect: { name: 'index' },
    children: [
      {
        path: '/index',
        name: 'index',
        component: 'index/index'
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: 'login/index'
  },
  {
    path: '*',
    redirect: { name: 'index' }
  }
]

function getRoutes (routes) {
  // 递归自动生成路由配置文件
  createRoute(routes)
  return routes
}

function createRoute (arr) {
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].component) return
    const componentFun = import(`@/views/${arr[i].component}.vue`)
    arr[i].component = () => componentFun
    if (arr[i].children && arr[i].children.length > 0) {
      createRoute(arr[i].children)
    }
  }
}

export default getRoutes(routes)
