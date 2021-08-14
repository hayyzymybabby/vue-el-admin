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
        meta: { title: '首页' },
        component: 'index/index'
      },
      {
        meta: { title: '商品列表' },
        component: 'shop/goods/list'
      },
      {
        meta: { title: '相册管理' },
        component: 'image/index'
      }
    ]
  },
  {
    meta: { title: '登录' },
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
    // 去除index
    const val = removeIndex(arr[i].component)
    // 生成name
    arr[i].name = arr[i].name || val.replace(/\//g, '_')
    // 生成path
    arr[i].path = arr[i].path || `/${val}`
    const componentFun = import(`@/views/${arr[i].component}.vue`)
    arr[i].component = () => componentFun
    if (arr[i].children && arr[i].children.length > 0) {
      createRoute(arr[i].children)
    }
  }
}

// 去除index结尾
function removeIndex (str) {
  const index = str.lastIndexOf('/')
  const value = str.substring(index + 1)
  if (value === 'index') {
    return str.substring(0, index)
  }
  return str
}

export default getRoutes(routes)
