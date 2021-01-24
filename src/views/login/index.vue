<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-9 col-md-7 col-lg-5 m-auto pt-5">
          <div class="card mt-5">
            <div class="card-header">
              <h3 class="text-center mb-0">VUE-ADMIN</h3>
            </div>
            <div class="card-body">
              <el-form ref="form" :rules="rules" :model="form" size="medium">
                <el-form-item prop="username">
                  <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button class="w-100" type="primary" @click="submitForm('form')">立即登录</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        form: {
          username: '',
          password: ''
        },
        rules: {
          username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      submitForm (formName) {
        console.log(this.$refs[formName])
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$router.push({
              name: 'index'
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style>
</style>
