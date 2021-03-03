/*
  规则
  1、path和name默认去除index
  2、name中间为下划线
  3、手动配置path和name则不会自动生成
*/
const routes = [
  {
    path: '/',
    name: 'layout',
    redirect: {
      name: 'index'
    },
    component: 'layout',
    children: [
      {
        component: 'index/index',
        meta: {
          title: '后台首页'
        }
      },
      {
        component: 'image/index',
        meta: {
          title: '相册管理'
        }
      },
      {
        component: 'shop/goods/list',
        meta: {
          title: '商品列表'
        }
      }
    ]
  },
  {
    component: 'login/index',
    meta: {
      title: '登录页'
    }
  },
  {
    path: '*',
    redirect: {
      name: 'index'
    }
  }
]

// 获取路由信息方法
function getRoutes () {
  // 自动生成路由
  createRoute(routes)
  return routes
}

// 自动生成路由
function createRoute (arr) {
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].component) return
    // 去除index
    const val = getValue(arr[i].component)
    // 生成name
    arr[i].name = arr[i].name || val.replace(/\//g, '_')
    // 生成path
    arr[i].path = arr[i].path || `/${val}`
    // 自动生成component
    const componentFun = import(`../../views/${arr[i].component}.vue`)
    arr[i].component = () => componentFun
    if (arr[i].children && arr[i].children.length > 0) {
      createRoute(arr[i].children)
    }
  }
}

// 去除index
function getValue (str) {
  // 获取最后一个/的索引
  const index = str.lastIndexOf('/')
  const val = str.substring(index + 1)
  if (val === 'index') {
    return str.substring(0, index)
  }
  return str
}

export default getRoutes()
