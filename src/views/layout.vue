<template>
  <div>
    <el-container class="layout">
      <el-header class="layout-header d-flex align-items-center">
        <a class="h5 text-light mb-0 mr-auto">{{ $conf.logo }}</a>
        <el-menu
          :default-active="navBar.active"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item
            :index="index | valToString"
            v-for="(nav, index) in navBar.list"
            :key="index"
            >{{ nav.name }}</el-menu-item
          >
          <el-submenu index="100">
            <template slot="title">
              <el-avatar
                size="small"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              ></el-avatar>
              summer
            </template>
            <el-menu-item index="100-1">修改</el-menu-item>
            <el-menu-item index="100-2">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-container class="layout-container">
        <el-aside class="layout-container-aside">
          <el-menu
            :default-active="sideMenuActive"
            @select="sideSelect"
            class="layout-container-aside-menu"
          >
            <el-menu-item
              :index="index | valToString"
              v-for="(menu, index) in sideMenu"
              :key="index"
            >
              <i :class="menu.icon"></i>
              <span slot="title">{{ menu.name }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="layout-container-main bg-light">
          <!-- 面包屑导航 -->
          <div
            class="border-bottom layout-container-main-breadcrumb mb-3 bg-white"
            v-if="breadcrumb.length"
          >
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item
                v-for="(item, index) in breadcrumb"
                :key="index"
                :to="{ path: item.path }"
                >{{ item.title }}</el-breadcrumb-item
              >
            </el-breadcrumb>
          </div>
          <!-- 主内容 -->
          <router-view></router-view>
          <!-- 回到顶部 -->
          <el-backtop target=".el-main" :bottom="100">
            <div class="layout-container-main-backtop">UP</div>
          </el-backtop>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  created () {
    this.navBar = this.$conf.navBar
    this.getBreadcrumb()
    this.__initNavBar()
  },
  data () {
    return {
      navBar: [],
      breadcrumb: []
    }
  },
  watch: {
    $route (to, from) {
      // 本地缓存已选择的导航，防止刷新丢失
      localStorage.setItem(
        'navActive',
        JSON.stringify({
          top: this.navBar.active,
          left: this.sideMenuActive
        })
      )
      this.getBreadcrumb()
    }
  },
  computed: {
    sideMenu () {
      return this.navBar.list[this.navBar.active].submenu || []
    },
    sideMenuActive: {
      get () {
        return this.navBar.list[this.navBar.active].submenuActive || '0'
      },
      set (val) {
        this.navBar.list[this.navBar.active].submenuActive = val
      }
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      this.navBar.active = key
      this.$router.push({
        name: this.sideMenu[this.sideMenuActive].pathname
      })
    },
    sideSelect (key, keyPath) {
      this.sideMenuActive = key
      this.$router.push({
        name: this.sideMenu[key].pathname
      })
    },
    // 获取面包屑导航
    getBreadcrumb () {
      const currentRoutes = this.$route.matched.filter((item) => item.name)
      const breadcrumb = []
      // 过滤layout和index
      currentRoutes.forEach((item, index) => {
        if (item.name === 'layout' || item.name === 'index') return
        breadcrumb.push({
          name: item.name,
          path: item.path,
          title: item.meta.title
        })
      })
      if (breadcrumb.length) {
        breadcrumb.unshift({
          name: 'index',
          path: '/',
          title: '首页'
        })
      }
      this.breadcrumb = breadcrumb
    },
    // 初始化选中菜单
    __initNavBar () {
      const navBarString = localStorage.getItem('navActive')
      if (navBarString) {
        const navBar = JSON.parse(navBarString)
        this.navBar.active = navBar.top
        this.sideMenuActive = navBar.left
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  .layout-header {
    background-color: #545c64;
  }
  .layout-container {
    height: 100%;
    .layout-container-aside {
      width: 200px;
      .layout-container-aside-menu {
        height: 100%;
      }
    }
    .layout-container-main {
      padding-bottom: 60px;
      .layout-container-main-breadcrumb {
        padding: 20px;
        margin: -20px;
      }
      .layout-container-main-backtop {
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }
    }
  }
}
</style>
