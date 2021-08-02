<template>
  <div>
    <el-container class="layout">
      <el-header class="layout-header d-flex align-items-center">
        <a class="h5 text-light mb-0 mr-auto">{{$conf.logo}}</a>
        <el-menu
          :default-active="navBar.active"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item :index="index | valToString" v-for="(nav,index) in navBar.list" :key="index">{{nav.name}}</el-menu-item>
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
        <el-aside width="200px">
          <el-menu :default-active="sideMenuActive" @select="sideSelect">
            <el-menu-item :index="index | valToString" v-for="(menu, index) in sideMenu" :key="index">
              <i :class="menu.icon"></i>
              <span slot="title">{{menu.name}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <ul>
            <li v-for="i in 100" :key="i">{{ i }}</li>
          </ul>
        </el-main>
      </el-container>
    </el-container>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
export default {
  created () {
    this.navBar = this.$conf.navBar
  },
  data () {
    return {
      navBar: []
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
    },
    sideSelect (key, keyPath) {
      this.sideMenuActive = key
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
    padding-bottom: 60px;
  }
}
</style>
