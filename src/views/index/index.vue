<template>
  <div class="index">
    <!-- 总览 -->
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in counts" :key="index">
        <el-card class="box-card" shadow="hover">
          <div class="d-flex align-items-center">
            <i
              class="h4 mb-0 p-2 text-white mr-3"
              :class="[item.icon, item.color]"
            ></i>
            <div>
              <h4 class="mb-0">{{ item.num }}</h4>
              <small class="text-muted">{{ item.desc }}</small>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 店铺 订单提示 | 统计图 -->
    <el-row :gutter="20" class="mt-3 index-middle">
      <el-col :span="12" class="index-middle-left d-flex flex-column">
        <el-card class="box-card mb-auto" shadow="hover">
          <div slot="header">
            <span>店铺及商品提示</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div class="row">
            <div class="col-3">
              <button class="btn btn-light w-100">
                <h4 class="mb-1">64</h4>
                <small class="text-muted">出售中</small>
              </button>
            </div>
            <div class="col-3">
              <button class="btn btn-light w-100">
                <h4 class="mb-1">64</h4>
                <small class="text-muted">出售中</small>
              </button>
            </div>
            <div class="col-3">
              <button class="btn btn-light w-100">
                <h4 class="mb-1">64</h4>
                <small class="text-muted">出售中</small>
              </button>
            </div>
            <div class="col-3">
              <button class="btn btn-light w-100">
                <h4 class="mb-1">64</h4>
                <small class="text-muted">出售中</small>
              </button>
            </div>
          </div>
        </el-card>
        <el-card class="box-card" shadow="hover">
          <div slot="header">
            <span>交易提示</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div class="row">
            <div class="col-2">
              <button class="btn btn-light w-100">
                <h4 class="mb-1">64</h4>
                <small class="text-muted">出售中</small>
              </button>
            </div>
            <div class="col-2">
              <button class="btn btn-light w-100">
                <h4 class="mb-1">64</h4>
                <small class="text-muted">出售中</small>
              </button>
            </div>
            <div class="col-2">
              <button class="btn btn-light w-100">
                <h4 class="mb-1">64</h4>
                <small class="text-muted">出售中</small>
              </button>
            </div>
            <div class="col-2">
              <button class="btn btn-light w-100">
                <h4 class="mb-1">64</h4>
                <small class="text-muted">出售中</small>
              </button>
            </div>
            <div class="col-2">
              <button class="btn btn-light w-100">
                <h4 class="mb-1">64</h4>
                <small class="text-muted">出售中</small>
              </button>
            </div>
            <div class="col-2">
              <button class="btn btn-light w-100">
                <h4 class="mb-1">64</h4>
                <small class="text-muted">出售中</small>
              </button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12" class="index-middle-right">
        <el-card class="box-card index-middle-right-chart" shadow="hover">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >操作按钮</el-button
            >
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{ "列表内容 " + o }}
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      counts: [
        {
          icon: 'el-icon-user-solid',
          color: 'bg-primary',
          num: 30,
          desc: '关注人数(个)'
        },
        {
          icon: 'el-icon-user-solid',
          color: 'bg-primary',
          num: 30,
          desc: '关注人数(个)'
        },
        {
          icon: 'el-icon-user-solid',
          color: 'bg-primary',
          num: 30,
          desc: '关注人数(个)'
        },
        {
          icon: 'el-icon-user-solid',
          color: 'bg-primary',
          num: 30,
          desc: '关注人数(个)'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.index {
  .index-middle {
    .index-middle-left {
      height: 370px;
    }
    .index-middle-right {
      .index-middle-right-chart {
        height: 370px;
      }
    }
  }
}
</style>
