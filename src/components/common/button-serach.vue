<template>
  <div>
    <div class="d-flex align-items-center">
      <!-- 左边 -->
      <slot name="left">
      </slot>
      <el-button type="success" size="mini">发布商品</el-button>
      <el-button type="danger" size="mini">批量删除</el-button>
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
      <slot name="form">
        <el-form inline ref="form" :model="form" label-width="80px">
          <el-form-item label="商品名称" class="mb-0">
            <el-input v-model="form.name" size="mini" placeholder="商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品编码" class="mb-0">
            <el-input v-model="form.code" size="mini" placeholder="商品编码"></el-input>
          </el-form-item>
          <el-form-item label="商品类型" class="mb-0">
            <el-select size="mini" v-model="form.type" placeholder="商品类型">
              <el-option value="1">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品分类" class="mb-0">
            <el-input v-model="form.category" size="mini" placeholder="商品分类"></el-input>
          </el-form-item>
          <el-form-item class="mb-0">
            <el-button type="info" size="mini" @click="searchEvent">搜索</el-button>
            <el-button size="mini" @click="clearSearch">清空筛选条件</el-button>
          </el-form-item>
        </el-form>
      </slot>
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
