<template>
  <div>
    <div class="d-flex align-items-center">
      <!-- 左边 -->
      <slot name="left"></slot>
      <!-- 右边 -->
      <div class="ml-auto" v-show="!advancedSearch">
        <slot name="right">
          <el-input class="mr-2" size="mini" style="width: 150px;" v-model="keyword" :placeholder="placeholder"></el-input>
          <el-button @click="$emit('search', keyword)" type="info" size="mini">搜索</el-button>
          <el-button size="mini" @click="advancedSearch=true">高级搜索</el-button>
        </slot>
      </div>
    </div>
    <el-card class="box-card bg-light my-3" v-show="advancedSearch">
      <div slot="header" class="clearfix" style="margin: -10px;">
        <span>高级搜索</span>
        <el-button @click="closeAdvancedSearch" style="float: right; padding: 3px 0" type="text">收起</el-button>
      </div>
      <!-- 表单 -->
      <slot name="form"></slot>
    </el-card>
  </div>
</template>

<script>
  export default {
    props: {
      placeholder: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        keyword: '',
        advancedSearch: false
      }
    },
    methods: {
      closeAdvancedSearch () {
        this.advancedSearch = false
      }
    }
  }
</script>

<style>
</style>
