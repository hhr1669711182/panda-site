<template>
  <div>
    <div class="page-header">
      <h2 class="page-title">🔍 SEO 全站设置</h2>
      <el-button type="primary" :loading="saving" @click="handleSave">保存设置</el-button>
    </div>

    <el-row :gutter="16" v-loading="loading">
      <!-- 基础信息 -->
      <el-col :span="14">
        <el-card class="mb-4">
          <template #header><span class="card-title">基础 Meta 信息</span></template>
          <el-form :model="form" label-position="top" label-width="auto">
            <el-form-item label="网站名称（siteName）">
              <el-input v-model="form.siteName" />
            </el-form-item>
            <el-form-item label="默认标题（defaultTitle）">
              <el-input v-model="form.defaultTitle" :maxlength="60" show-word-limit />
              <p class="hint">当页面没有设置独立 SEO 标题时使用此标题</p>
            </el-form-item>
            <el-form-item label="默认描述（defaultDesc）">
              <el-input v-model="form.defaultDesc" type="textarea" :rows="3" :maxlength="160" show-word-limit />
            </el-form-item>
            <el-form-item label="默认关键词（keywords，逗号分隔）">
              <el-select v-model="form.keywords" multiple filterable allow-create default-first-option style="width:100%" />
            </el-form-item>
            <el-form-item label="默认 OG 图片 URL">
              <el-input v-model="form.ogImage" placeholder="/uploads/og-default.png" />
            </el-form-item>
          </el-form>
        </el-card>

        <el-card>
          <template #header><span class="card-title">社交媒体卡片</span></template>
          <el-form :model="form" label-position="top">
            <el-form-item label="Twitter Card 类型">
              <el-radio-group v-model="form.twitterCard">
                <el-radio value="summary">summary（小图）</el-radio>
                <el-radio value="summary_large_image">summary_large_image（大图）</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Twitter @账号">
              <el-input v-model="form.twitterSite" placeholder="@yoursite" />
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>

      <!-- 验证码 & 分析 -->
      <el-col :span="10">
        <el-card class="mb-4">
          <template #header><span class="card-title">搜索引擎验证</span></template>
          <el-form :model="form" label-position="top">
            <el-form-item label="Google Search Console 验证码">
              <el-input v-model="form.googleVerify" placeholder="google-site-verification content" />
            </el-form-item>
            <el-form-item label="百度站长平台验证码">
              <el-input v-model="form.baiduVerify" />
            </el-form-item>
          </el-form>
        </el-card>

        <el-card class="mb-4">
          <template #header><span class="card-title">流量分析</span></template>
          <el-form :model="form" label-position="top">
            <el-form-item label="Google Analytics 4 ID">
              <el-input v-model="form.gaId" placeholder="G-XXXXXXXXXX" />
            </el-form-item>
          </el-form>
        </el-card>

        <!-- Sitemap 预览 -->
        <el-card>
          <template #header><span class="card-title">Sitemap</span></template>
          <p class="text-sm text-gray-500 mb-3">自动生成的 Sitemap 可在以下地址访问：</p>
          <el-tag type="success" class="w-full text-center" style="display:block;text-align:center">
            /sitemap.xml
          </el-tag>
          <p class="hint mt-2">包含所有已发布文章和静态页面，供搜索引擎抓取</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import request from '@/utils/request'

const loading = ref(true)
const saving  = ref(false)
const form    = reactive<any>({
  siteName: '', defaultTitle: '', defaultDesc: '',
  keywords: [], ogImage: '',
  twitterCard: 'summary_large_image', twitterSite: '',
  googleVerify: '', baiduVerify: '', gaId: '',
})

onMounted(async () => {
  try {
    const data = await request.get('/seo/config')
    Object.assign(form, data)
  } finally {
    loading.value = false
  }
})

async function handleSave() {
  saving.value = true
  try {
    await request.put('/seo/config', form)
    ElMessage.success('SEO 配置已保存')
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.page-title  { font-size: 18px; font-weight: bold; color: #1b5e20; margin: 0; }
.card-title  { font-weight: 600; }
.hint        { font-size: 12px; color: #aaa; margin-top: 4px; }
.mb-4        { margin-bottom: 16px; }
.mt-2        { margin-top: 8px; }
</style>
