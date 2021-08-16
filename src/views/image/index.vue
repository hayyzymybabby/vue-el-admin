<template>
  <el-container class="image">
    <!-- 头部 -->
    <el-header class="image-header d-flex align-items-center border-bottom">
      <div class="search-part d-flex">
        <el-select
          placeholder="请选择图片排序方式"
          size="mini"
          style="width: 200px"
          v-model="searchForm.order"
        >
          <el-option label="区域一" value="shanghai"></el-option>
        </el-select>
        <el-input
          v-model="searchForm.keyword"
          class="mx-2"
          style="width: 200px"
          size="mini"
          placeholder="输入相册名称"
        ></el-input>
        <el-button type="success" size="mini">搜索</el-button>
      </div>
      <div class="ml-auto">
        <el-button type="success" size="mini" @click="openAlbumModel(null)">创建相册</el-button>
        <el-button type="warning" size="mini">上传图片</el-button>
      </div>
    </el-header>
    <el-container class="image-main">
      <!-- 侧边 -->
      <el-aside width="200px" class="main-aside bg-white border-right">
        <ul class="list-group list-group-flush">
          <li
            v-for="(item, index) in albums"
            :key="index"
            @click.stop="albumChange(index)"
            :class="{ 'sum-active': albumIndex === index }"
            class="
              list-group-item list-group-item-action
              d-flex
              align-items-center
            "
          >
            {{ item.name }}
            <el-dropdown class="ml-auto">
              <span class="btn btn-light btn-sm border">
                {{ item.num }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.stop.native="openAlbumModel({item, index})"
                  >修改</el-dropdown-item
                >
                <el-dropdown-item @click.stop.native="albumDel(index)"
                  >删除</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
      </el-aside>
      <el-container class="main-wrapper">
        <!-- 主内容 -->
        <el-main class="main-container">Main</el-main>
      </el-container>
    </el-container>
    <!-- 底部 -->
    <el-footer class="image-footer">Footer</el-footer>

    <!-- 修改 | 创建相册 -->
    <el-dialog title="修改相册" :visible.sync="albumModel">
      <el-form :model="albumForm" label-width="80px">
        <el-form-item label="相册名称">
          <el-input v-model="albumForm.name" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="相册排序">
          <el-input-number
            v-model="albumForm.order"
            :min="0"
            size="medium"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="albumModel = false">取 消</el-button>
        <el-button type="primary" @click="confirmAlbumModel">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        order: '',
        keyword: ''
      },
      albumIndex: 0,
      albums: [],
      albumModel: false,
      albumEditIndex: -1,
      albumForm: {
        name: '',
        order: 0
      }
    }
  },
  created () {
    this.__init()
  },
  methods: {
    __init () {
      for (let i = 0; i < 20; i++) {
        this.albums.push({
          name: `相册${i + 1}`,
          num: Math.floor(Math.random() * 100),
          order: 0
        })
      }
    },
    albumChange (index) {
      this.albumIndex = index
    },
    albumDel (index) {
      this.$confirm('是否删除该相册', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.albums.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    openAlbumModel (obj) {
      console.log(obj)
      if (obj) {
        const { item, index } = obj
        this.albumForm.name = item.name
        this.albumForm.order = item.order
        this.albumEditIndex = index
        this.albumModel = true
      } else {
        this.albumForm = {
          name: '',
          order: 0
        }
        this.albumEditIndex = -1
        this.albumModel = true
      }
    },
    confirmAlbumModel () {
      if (this.albumEditIndex > -1) {
        this.albumEdit()
        this.albumModel = false
      } else {
        this.albums.unshift({
          name: this.albumForm.name,
          order: this.albumForm.order,
          num: 0
        })
        this.albumModel = false
      }
    },
    albumEdit () {
      this.albums[this.albumEditIndex].name = this.albumForm.name
      this.albums[this.albumEditIndex].order = this.albumForm.order
    }
  }
}
</script>

<style lang="scss" scoped>
.image {
  position: absolute;
  top: 55px;
  left: 0;
  right: 0;
  bottom: 0;
  .image-main {
    .main-aside {
      position: absolute;
      top: 60px;
      left: 0;
      bottom: 60px;
      .sum-active {
        color: #67c23a !important;
        background-color: #f0f9eb !important;
        border-color: #c2e7b0 !important;
      }
    }
    .main-wrapper {
      .main-container {
        position: absolute;
        top: 60px;
        left: 200px;
        right: 0;
        bottom: 60px;
      }
    }
  }
}
</style>
