<template>
  <div class="login-page">
    <div class="login-box">
      <div class="login-logo">🐼</div>
      <h1 class="login-title">大熊猫管理后台</h1>
      <p class="login-sub">请使用管理员账号登录</p>

      <el-form :model="form" :rules="rules" ref="formRef" size="large" @submit.prevent="handleLogin">
        <el-form-item prop="email">
          <el-input
            v-model="form.email"
            placeholder="邮箱地址"
            :prefix-icon="Message"
            autocomplete="email"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="密码"
            :prefix-icon="Lock"
            show-password
            autocomplete="current-password"
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        <el-button
          type="primary"
          class="login-btn"
          :loading="loading"
          native-type="submit"
          @click="handleLogin"
        >
          登 录
        </el-button>
      </el-form>

      <p class="login-hint">默认账号：admin@panda-site.com / admin123456</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Message, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/auth'
import { useRouter, useRoute } from 'vue-router'

const auth   = useAuthStore()
const router = useRouter()
const route  = useRoute()

const formRef = ref()
const loading = ref(false)
const form = reactive({ email: '', password: '' })

const rules = {
  email:    [{ required: true, type: 'email', message: '请输入有效邮箱', trigger: 'blur' }],
  password: [{ required: true, min: 6, message: '密码至少 6 位', trigger: 'blur' }],
}

async function handleLogin() {
  await formRef.value?.validate()
  loading.value = true
  try {
    await auth.login(form.email, form.password)
    ElMessage.success('登录成功')
    const redirect = (route.query.redirect as string) || '/dashboard'
    router.push(redirect)
  } catch (e: any) {
    ElMessage.error(e.response?.data?.statusMessage || '登录失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1b5e20, #2e7d32, #43a047);
}
.login-box {
  width: 380px;
  background: #fff;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0,0,0,.3);
  text-align: center;
}
.login-logo  { font-size: 48px; margin-bottom: 12px; }
.login-title { font-size: 20px; font-weight: bold; color: #1b5e20; margin-bottom: 6px; }
.login-sub   { color: #999; font-size: 13px; margin-bottom: 28px; }
.login-btn   { width: 100%; margin-top: 8px; }
.login-hint  { margin-top: 16px; font-size: 11px; color: #ccc; }
</style>
