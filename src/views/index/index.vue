<template>
  <div>
    <!-- 数据统计 -->
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in counts" :key="index">
        <el-card class="box-card" shadow="hover">
          <div class="d-flex align-items-center">
            <i :class="[item.icon, item.color]" class="h4 mb-0 text-white text-center mr-3" style="width: 40px;height: 40px;line-height: 40px;"></i>
            <div>
              <h4 class="mb-1">{{item.name}}</h4>
              <small class="text-muted">{{item.desc}}</small>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 店铺、订单提示 | 统计图 -->
    <el-row :gutter="20" class="mt-3">
      <!-- 店铺、订单提示 -->
      <el-col :span="12" class="d-flex flex-column" style="height: 370px;justify-content: space-between;">
        <el-card class="box-card" shadow="never" v-for="(tip, tipIndex) in tips" :key="tipIndex">
          <div slot="header" class="clearfix">
            <span>{{tip.title}}</span>
            <el-button style="float: right; padding: 3px 0" type="text">
              {{tip.desc}}
            </el-button>
          </div>
          <div class="row">
            <div :class="tip.list.length | getCol" v-for="(item, index) in tip.list" :key="index">
              <button class="btn btn-light w-100">
                <h4 class="mb-1">{{item.value}}</h4>
                <small class="text-muted">{{item.name}}</small>
              </button>
            </div>
          </div>
        </el-card>
      </el-col>
      <!-- 统计图 -->
      <el-col :span="12">
        <el-card class="box-card" style="height: 370px;" shadow="never">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div ref="myChart" style="width: 100%;height: 270px;"></div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 销售情况统计 | 单品销售排名 -->
    <el-row :gutter="20" class="my-3">
      <el-col :span="12">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>销售情况统计</span>
            <el-button style="float: right; padding: 3px 0" type="text">按周期统计商家店铺的订单量和订单金额</el-button>
          </div>
          <div class="media align-items-center border">
            <span class="py-4 px-3 bg-light border-right">昨日销量</span>
            <div class="media-body">
              <div class="border-bottom pl-3 pb-1"><span>订单量（件）</span> 12</div>
              <div class="pl-3 pt-1"><span>订单量（件）</span> 12</div>
            </div>
          </div>
          <div class="media align-items-center border mt-3">
            <span class="py-4 px-3 bg-light border-right">昨日销量</span>
            <div class="media-body">
              <div class="border-bottom pl-3 pb-1"><span>订单量（件）</span> 12</div>
              <div class="pl-3 pt-1"><span>订单量（件）</span> 12</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>单品销售排名</span>
            <el-button style="float: right; padding: 3px 0" type="text">按周期统计商家店铺的订单量和订单金额</el-button>
          </div>
          <el-table :data="tableData" height="200" border style="width: 100%">
            <el-table-column type="index" label="#" width="50">
            </el-table-column>
            <el-table-column prop="name" label="商品信息">
            </el-table-column>
            <el-table-column prop="num" label="销量" width="50">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    mounted () {
      this.drawLine()
    },
    data () {
      return {
        counts: [{
            icon: 'el-icon-user-solid',
            name: 30,
            desc: '关注人数（个）',
            color: 'bg-primary'
          },
          {
            icon: 'el-icon-user-solid',
            name: 30,
            desc: '关注人数（个）',
            color: 'bg-primary'
          },
          {
            icon: 'el-icon-user-solid',
            name: 30,
            desc: '关注人数（个）',
            color: 'bg-primary'
          },
          {
            icon: 'el-icon-user-solid',
            name: 30,
            desc: '关注人数（个）',
            color: 'bg-primary'
          }
        ],
        tips: [{
            title: '店铺及商品提示',
            desc: '您需要关注的店铺信息及待处理对象',
            list: [{
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
            desc: '您需要关注的店铺信息及待处理对象',
            list: [{
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
        ],
        tableData: [
          { name: 'ceshi', num: '1' },
          { name: 'ceshi', num: '1' },
          { name: 'ceshi', num: '1' },
          { name: 'ceshi', num: '1' },
          { name: 'ceshi', num: '1' },
          { name: 'ceshi', num: '1' },
          { name: 'ceshi', num: '1' }
        ]
      }
    },
    methods: {
      drawLine () {
        const myChart = echarts.init(this.$refs.myChart)
        myChart.setOption({
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
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
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
        })
      }
    },
    filters: {
      getCol (total) {
        return `col-${12 / total}`
      }
    }
  }
</script>

<style>

</style>
