<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-sm-9 col-md-7 col-lg-5 m-auto pt-5">
        <div class="card mt-5">
          <div class="card-header bg-white">
            <h3 class="text-center mb-0 text-secondary">ADMIN</h3>
          </div>
          <div class="card-body">
            <el-form ref="form" :model="form">
              <el-form-item>
                <el-input
                  size="medium"
                  v-model="form.username"
                  placeholder="请输入用户名"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-input
                  size="medium"
                  type="password"
                  v-model="form.password"
                  placeholder="请输入密码"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="w-100" type="primary" size="medium">立即创建</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {}
    }
  }
}
</script>

<style>
</style>
