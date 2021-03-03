<template>
  <div>
    <el-container style="position: absolute;top: 55px;right: 0;left: 0;bottom: 0;">
      <!-- 头部 -->
      <el-header class="d-flex align-items-center border-bottom">
        <div class="d-flex mr-auto">
          <el-select v-model="searchForm.order" size="mini" style="width: 150px;" placeholder="请选择图片排序方式">
            <el-option label="" value="1"></el-option>
          </el-select>
          <el-input v-model="searchForm.keyword" class="mx-2" size="mini" style="width: 150px;" placeholder="输入相册名称"></el-input>
          <el-button type="success" size="mini">搜索</el-button>
        </div>
        <el-button v-if="chooseList.length" type="warning" size="mini" @click="unChoose">取消选中</el-button>
        <el-button v-if="chooseList.length" type="danger" size="mini" @click="imageDel({all:true})">批量删除</el-button>
        <el-button type="success" size="mini" @click="openAlbumModal(false)">创建相册</el-button>
        <el-button type="warning" size="mini" @click="uploadModal=true">上传图片</el-button>
      </el-header>
      <el-container>
        <!-- 侧边 | 相册列表 -->
        <el-aside class="bg-white border-right" width="200px" style="position: absolute;top: 60px;left: 0;bottom: 60px;">
          <ul class="list-group list-group-flush">
            <album-item v-for="(item, index) in albums" :key="index" :item="item" :index="index" :active="albumIndex === index"
              @change="albumChange" @edit="openAlbumModal" @delete="albumDel"></album-item>
          </ul>
        </el-aside>
        <el-container>
          <el-main style="position: absolute;top: 60px;left: 200px;bottom: 60px;right: 0;">
            <!-- 主内容 -->
            <el-row :gutter="10">
              <el-col :span="12" :lg="4" :md="6" :sm="8" v-for="(item, index) in imageList" :key="index">
                <el-card style="cursor: pointer;" class="box-card mb-3 position-relative" :body-style="{'padding': '0'}"
                  shadow="hover">
                  <div class="border" :class="{'border-danger':item.isCheck}">
                    <span v-if="item.isCheck" style="position: absolute;right: 0;top: 0;" class="badge badge-danger">{{item.checkOrder}}</span>
                    <img :src="item.url" class="w-100" @click="choose(item)">
                    <div class="w-100 text-white px-2" style="background-color: rgba(0,0,0,0.5);margin-top: -25px;position: absolute;">
                      <span class="small">{{item.name}}</span>
                    </div>
                    <div class="p-2 text-center">
                      <el-button-group>
                        <el-button @click="previewImage(item)" size="mini" icon="el-icon-view" class="p-2"></el-button>
                        <el-button @click="imageEdit(item, index)" size="mini" icon="el-icon-edit" class="p-2"></el-button>
                        <el-button @click="imageDel({index})" size="mini" icon="el-icon-delete" class="p-2"></el-button>
                      </el-button-group>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
      </el-container>
      <!-- 底部 -->
      <el-footer class="d-flex border-top align-items-center px-0">
        <div style="width: 200px;flex-shrink: 0;" class="h-100 d-flex align-items-center justify-content-center border-right">
          <el-button-group>
            <el-button size="mini">上一页</el-button>
            <el-button size="mini">下一页</el-button>
          </el-button-group>
        </div>
        <div style="flex: 1;" class="px-2">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
          </el-pagination>
        </div>
      </el-footer>
    </el-container>
    <!-- 修改 | 创建相册 -->
    <el-dialog :title="albumModalTitle" :visible.sync="albumModal">
      <el-form ref="albumForm" :model="albumForm" label-width="80px">
        <el-form-item label="相册名称">
          <el-input v-model="albumForm.name" size="medium" placeholder="请输入相册名称"></el-input>
        </el-form-item>
        <el-form-item label="相册排序">
          <el-input-number v-model="albumForm.order" :min="0" size="medium"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="albumModal = false">取 消</el-button>
        <el-button type="primary" @click="confirmAlbumModal">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 上传图片 -->
    <el-dialog title="上传图片" :visible.sync="uploadModal">
      <div class="text-center">
        <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
    </el-dialog>
    <!-- 预览图片 -->
    <el-dialog :visible.sync="previewModal" width="60vw" top="5vh">
      <div style="margin: -60px -20px -30px -20px;">
        <img class="w-100" :src="previewUrl">
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import AlbumItem from '@/components/image/AlbumItem.vue'
  export default {
    created () {
      this.__init()
    },
    components: {
      AlbumItem
    },
    data () {
      return {
        searchForm: {
          order: '',
          keyword: ''
        },
        albums: [],
        albumIndex: 0,
        albumModal: false,
        albumEditIndex: -1,
        albumForm: {
          name: '',
          order: 0
        },
        uploadModal: false,
        previewModal: false,
        previewUrl: '',
        imageList: [],
        // 选择
        chooseList: [],
        // 分页相关
        currentPage: 1
      }
    },
    computed: {
      albumModalTitle () {
        return this.albumEditIndex > -1 ? '修改相册' : '创建相册'
      }
    },
    methods: {
      __init () {
        for (let i = 0; i < 20; i++) {
          this.albums.push({
            name: '相册' + i,
            num: Math.floor(Math.random() * 100),
            order: 0
          })
        }
        for (let i = 0; i < 30; i++) {
          this.imageList.push({
            id: i,
            url: 'https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/5366d0160924ab18c1375d8835fae6cd7b890b6f.jpg',
            name: '图片' + i,
            isCheck: false,
            checkOrder: 0
          })
        }
      },
      albumChange (index) {
        this.albumIndex = index
      },
      // 打开相册修改 | 创建框
      openAlbumModal (obj) {
        if (obj) {
          const {
            item,
            index
          } = obj
          // 初始化表单
          this.albumForm.name = item.name
          this.albumForm.order = item.order
          this.albumEditIndex = index
          this.albumModal = true
        } else {
          this.albumForm = {
            name: '',
            order: 0
          }
          this.albumEditIndex = -1
          this.albumModal = true
        }
      },
      // 点击确定修改 | 创建相册
      confirmAlbumModal () {
        if (this.albumEditIndex > -1) {
          this.albumEdit()
        } else {
          this.albums.unshift({
            name: this.albumForm.name,
            order: this.albumForm.order,
            num: 0
          })
        }
        this.albumModal = false
      },
      // 修改相册
      albumEdit () {
        this.albums[this.albumEditIndex].name = this.albumForm.name
        this.albums[this.albumEditIndex].order = this.albumForm.order
      },
      // 删除相册
      albumDel (index) {
        this.$confirm('是否删除该相册?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.albums.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {

        })
      },
      // 预览图片
      previewImage (item) {
        this.previewUrl = item.url
        this.previewModal = true
      },
      // 修改图片名称
      imageEdit (item, index) {
        this.$prompt('请输入新名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: item.name,
          inputValidator (val) {
            if (val === '') {
              return '图片名称不能为空'
            }
          }
        }).then(({
          value
        }) => {
          item.name = value
          this.$message.success('修改成功')
        }).catch(() => {})
      },
      // 删除图片
      imageDel (obj) {
        this.$confirm(obj.all ? '是否批量删除图片?' : '是否删除该图片?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (obj.all) {
            const list = this.imageList.filter(item => {
              return !this.chooseList.some(img => {
                return item.id === img.id
              })
            })
            this.imageList = list
            this.chooseList = []
          } else {
            this.imageList.splice(obj.index, 1)
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {})
      },
      // 选中图片
      choose (item) {
        if (!item.isCheck) {
          this.chooseList.push({
            id: item.id,
            url: item.url
          })
          item.checkOrder = this.chooseList.length
          item.isCheck = true
        } else {
          const i = this.chooseList.findIndex(v => {
            return v.id === item.id
          })
          if (i >= 0) {
            const length = this.chooseList.length
            if (i + 1 < length) {
              for (let j = i; j < length; j++) {
                const result = this.imageList.findIndex(v => {
                  return v.id === this.chooseList[j].id
                })
                if (result >= 0) {
                  this.imageList[result].checkOrder--
                }
              }
            }
            this.chooseList.splice(i, 1)
            item.isCheck = false
            item.checkOrder = 0
          }
        }
      },
      // 取消选中
      unChoose () {
        this.imageList.forEach(img => {
          const i = this.chooseList.findIndex(item => {
            return item.id === img.id
          })
          if (i > -1) {
            img.isCheck = false
            img.checkOrder = 0
            this.chooseList.splice(i, 1)
          }
        })
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
      }
    }
  }
</script>

<style>
  .sum-active {
    color: #67C23A !important;
    background-color: #F0F9EB !important;
    border-color: #C2E7B0 !important;
  }
</style>
