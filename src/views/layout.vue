<template>
  <div>
    <el-container class="layout">
      <el-header>Header</el-header>
      <el-container class="layout-container">
        <el-aside width="200px">
          <ul>
            <li v-for="i in 100" :key="i">{{ i }}</li>
          </ul>
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
export default {}
</script>

<style lang="scss" scoped>
.layout {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  .layout-container {
    height: 100%;
    padding-bottom: 60px;
  }
}
</style>
