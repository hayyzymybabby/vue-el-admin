<template>
  <el-container style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;overflow: hidden;">
    <el-header style="background-color: #545c64;" class="d-flex align-items-center">
      <h5 class="h5 text-light mb-0 mr-auto">{{$conf.logo}}</h5>
      <el-menu :default-active="navBar.active" mode="horizontal" @select="handleSelect" background-color="#545c64"
        text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item :index="index | numToString" v-for="(item, index) in navBar.list" :key="index">{{item.name}}</el-menu-item>
        <el-submenu index="100">
          <template slot="title">
            <el-avatar size="small" :src="require('../assets/images/avatar.png')"></el-avatar>
            用户名
          </template>
          <el-menu-item index="100-1">修改</el-menu-item>
          <el-menu-item index="100-2">退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="slideMenuActive" @select="slideSelect" style="height: 100%;">
          <el-menu-item :index="index | numToString" v-for="(item, index) in slideMenus" :key="index">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="bg-light">
        <!-- 面包屑导航 -->
        <div class="border-bottom mb-3 bg-white" style="padding: 20px;margin: -20px;" v-if="bran.length > 0">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item,index) in bran" :key="index" :to="{ path: item.path }">{{item.title}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!-- 主布局 -->
        <router-view></router-view>
        <el-backtop target=".el-main" :bottom="100">
          <div style="
                height: 100%;
                width: 100%;
                background-color: #f2f5f6;
                box-shadow: 0 0 6px rgba(0,0,0, .12);
                text-align: center;
                line-height: 40px;
                color: #1989fa;
              ">
            UP
          </div>
        </el-backtop>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import common from '@/common/mixins/common.js'
  export default {
    name: 'layout',
    mixins: [common],
    created () {
      // 初始化菜单
      this.navBar = this.$conf.navBar
      this.getRouterBran()
      // 初始化选中菜单
      this.__initNavBar()
    },
    data () {
      return {
        navBar: [],
        bran: []
      }
    },
    computed: {
      slideMenus () {
        return this.navBar.list[this.navBar.active].submenu || []
      },
      slideMenuActive: {
        get () {
          return this.navBar.list[this.navBar.active].subActive || '0'
        },
        set (val) {
          this.navBar.list[this.navBar.active].subActive = val
        }
      }
    },
    watch: {
      '$route' () {
        // 本地存储，解决刷新问题
        localStorage.setItem('navActive', JSON.stringify({
          top: this.navBar.active,
          left: this.slideMenuActive
        }))
        this.getRouterBran()
      }
    },
    methods: {
      __initNavBar () {
        let result = localStorage.getItem('navActive')
        if (result) {
          result = JSON.parse(result)
          this.navBar.active = result.top
          this.slideMenuActive = result.left
        }
      },
      handleSelect (key, keyPath) {
        this.navBar.active = key
        if (this.slideMenus.length > 0) {
          this.$router.push({
            name: this.slideMenus[this.slideMenuActive].pathname
          })
        }
      },
      slideSelect (key, keyPath) {
        this.slideMenuActive = key
        this.$router.push({
          name: this.slideMenus[key].pathname
        })
      },
      // 获取面包屑导航
      getRouterBran () {
        // 返回有name值路由
        const hasName = this.$route.matched.filter(v => v.name)
        const resultArr = []
        hasName.forEach((v, k) => {
          // 过滤layout 和 index
          if (v.name === 'index' || v.name === 'layout') return
          resultArr.push({
            name: v.name,
            path: v.path,
            title: v.meta.title
          })
        })
        if (resultArr.length > 0) {
          resultArr.unshift({
            name: 'index',
            path: '/index',
            title: '后台首页'
          })
        }
        this.bran = resultArr
      }
    }
  }
</script>
<style>
</style>
