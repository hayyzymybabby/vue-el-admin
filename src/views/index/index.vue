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
        <el-card
          class="box-card"
          shadow="hover"
          v-for="(tip, tIndex) in tips"
          :key="tIndex"
        >
          <div slot="header">
            <span>{{ tip.title }}</span>
            <el-button style="float: right; padding: 3px 0" type="text">{{
              tip.desc
            }}</el-button>
          </div>
          <div class="row">
            <div
              :class="tip.list.length | getCol"
              v-for="(tlist, index) in tip.list"
              :key="index"
            >
              <button class="btn btn-light w-100">
                <h4 class="mb-1">{{ tlist.num }}</h4>
                <small class="text-muted">{{ tlist.name }}</small>
              </button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12" class="index-middle-right">
        <el-card class="box-card index-middle-right-chart" shadow="hover">
          <div slot="header" class="clearfix">
            <span>订单总数统计</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >订单数量</el-button
            >
          </div>
          <div ref="myChart" class="myChart"></div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 销售情况统计 | 单品销售排名 -->
    <el-row :gutter="20" class="my-3">
      <el-col :span="12">
        <el-card class="box-card" shadow="hover" style="height: 353px;">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >操作按钮</el-button
            >
          </div>
          <div class="media align-items-center border">
            <span class="py-5 px-3 bg-light border-right">昨日销量</span>
            <div class="media-body">
              <div class="border-bottom pl-3 pb-3">
                <span>订单量（件）</span>12
              </div>
              <div class="pl-3 pt-3"><span>订单量（件）</span>12</div>
            </div>
          </div>
          <div class="media align-items-center border mt-3">
            <span class="py-5 px-3 bg-light border-right">昨日销量</span>
            <div class="media-body">
              <div class="border-bottom pl-3 pb-3">
                <span>订单量（件）</span>12
              </div>
              <div class="pl-3 pt-3"><span>订单量（件）</span>12</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>单品销售排名</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >按周期统计商家店铺的订单量和订单金额</el-button
            >
          </div>
          <el-table :data="tableData" height="250" border style="width: 100%">
            <el-table-column type="index" label="#" width="50">
            </el-table-column>
            <el-table-column prop="name" label="商品信息"> </el-table-column>
            <el-table-column prop="num" label="销量" width="60"> </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  mounted () {
    this.drawLine()
  },
  filters: {
    getCol (total) {
      return `col-${12 / total}`
    }
  },
  data () {
    return {
      tableData: [
        {
          name: '1',
          num: '2'
        },
        {
          name: '1',
          num: '2'
        },
        {
          name: '1',
          num: '2'
        },
        {
          name: '1',
          num: '2'
        },
        {
          name: '1',
          num: '2'
        },
        {
          name: '1',
          num: '2'
        }
      ],
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
      ],
      tips: [
        {
          title: '店铺及商品提示',
          desc: '需要关注的店铺信息及待处理事项',
          list: [
            {
              name: '出售中',
              value: '64'
            },
            {
              name: '出售中',
              value: '64'
            },
            {
              name: '出售中',
              value: '64'
            },
            {
              name: '出售中',
              value: '64'
            }
          ]
        },
        {
          title: '店铺及商品提示',
          desc: '需要关注的店铺信息及待处理事项',
          list: [
            {
              name: '出售中',
              value: '64'
            },
            {
              name: '出售中',
              value: '64'
            },
            {
              name: '出售中',
              value: '64'
            },
            {
              name: '出售中',
              value: '64'
            },
            {
              name: '出售中',
              value: '64'
            },
            {
              name: '出售中',
              value: '64'
            }
          ]
        }
      ]
    }
  },
  methods: {
    drawLine () {
      const myChart = echarts.init(this.$refs.myChart)
      const option = {
        title: {},
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            label: {
              show: true,
              position: 'top'
            },
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.index {
  .index-middle {
    .index-middle-left {
      height: 370px;
      justify-content: space-between;
    }
    .index-middle-right {
      .index-middle-right-chart {
        height: 370px;
        .myChart {
          width: 100%;
          height: 270px;
        }
      }
    }
  }
}
</style>
