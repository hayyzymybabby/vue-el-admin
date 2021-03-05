<template>
  <div class="bg-white px-3" style="margin: -20px;margin-top: -1rem;">
    <el-tabs v-model="tabIndex" @tab-click="handleClick">
      <el-tab-pane :label="item.name" v-for="(item, index) in tabbars" :key="index">
        <button-serach ref="buttonSerach" placeholder="要搜索的商品名称" @search="searchEvent">
          <!-- 左边 -->
          <template #left>
            <el-button type="success" size="mini">发布商品</el-button>
            <el-button type="danger" size="mini">批量删除</el-button>
            <el-button size="mini">下架</el-button>
            <el-button size="mini">推荐</el-button>
          </template>
          <!-- 高级搜索表单 -->
          <template #form>
            <!-- 表单 -->
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
          </template>
        </button-serach>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import buttonSerach from '@/components/common/button-serach'
  export default {
    components: {
      buttonSerach
    },
    data () {
      return {
        tabIndex: '0',
        tabbars: [{
            name: '审核中'
          },
          {
            name: '出售中'
          },
          {
            name: '已下架'
          }, {
            name: '库存预警'
          },
          {
            name: '回收站'
          }
        ],
        form: {
          name: '',
          code: '',
          type: '',
          category: ''
        }
      }
    },
    methods: {
      handleClick (tab) {
        this.tabIndex = tab.index
      },
      // 搜索
      searchEvent (e) {
        if (typeof e === 'string') {
          console.log('简单搜索')
        } else {
          console.log('高级搜索')
        }
      },
      // 清空筛选
      clearSearch () {
        this.form = {
          name: '',
          code: '',
          type: '',
          category: ''
        }
        this.$refs.buttonSerach[this.tabIndex].closeAdvancedSearch()
      }
    }
  }
</script>

<style>

</style>
