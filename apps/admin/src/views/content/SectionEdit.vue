<template>
  <div>
    <div class="page-header">
      <h2 class="page-title">✏️ 编辑板块：{{ slug }}</h2>
      <div class="actions">
        <el-button @click="router.push('/sections')">返回</el-button>
        <el-button type="primary" :loading="saving" @click="handleSave">保存</el-button>
      </div>
    </div>

    <el-row :gutter="16" v-loading="loading">
      <!-- 主内容 -->
      <el-col :span="16">
        <el-card>
          <el-form :model="form" label-position="top">
            <el-form-item label="标题">
              <el-input v-model="form.title" />
            </el-form-item>
            <el-form-item label="副标题">
              <el-input v-model="form.subtitle" />
            </el-form-item>
            <el-form-item label="内容 (JSON)">
              <el-input
                v-model="contentJson"
                type="textarea"
                :rows="12"
                placeholder='{"blocks": [{"type": "text", "data": "..."}]}'
                @blur="parseContent"
              />
              <p class="hint">内容以 JSON 格式存储，支持 text / taxonomy / fact 等 block 类型</p>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>

      <!-- SEO 侧栏 -->
      <el-col :span="8">
        <el-card>
          <template #header><span class="card-title">🔍 SEO 设置</span></template>
          <el-form :model="form" label-position="top">
            <el-form-item label="SEO 标题（搜索结果标题）">
              <el-input v-model="form.seoTitle" :maxlength="60" show-word-limit />
            </el-form-item>
            <el-form-item label="SEO 描述（搜索摘要）">
              <el-input v-model="form.seoDesc" type="textarea" :rows="3" :maxlength="160" show-word-limit />
            </el-form-item>
            <el-form-item label="OG 图片 URL">
              <el-input v-model="form.ogImage" placeholder="/uploads/og-image.png" />
            </el-form-item>
            <el-divider />
            <el-form-item label="排序（数值越小越靠前）">
              <el-input-number v-model="form.order" :min="0" :max="99" />
            </el-form-item>
            <el-form-item label="是否显示">
              <el-switch v-model="form.published" active-text="显示" inactive-text="隐藏" />
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import request from '@/utils/request'
import { useRoute, useRouter } from 'vue-router'

const route   = useRoute()
const router  = useRouter()
const slug    = route.params.slug as string
const loading = ref(true)
const saving  = ref(false)

const form = reactive({
  title: '', subtitle: '', content: {} as any,
  seoTitle: '', seoDesc: '', ogImage: '',
  published: true, order: 0,
})
const contentJson = ref('{}')

onMounted(async () => {
  try {
    const data = await request.get(`/sections/${slug}`)
    Object.assign(form, data)
    contentJson.value = JSON.stringify(data.content, null, 2)
  } finally {
    loading.value = false
  }
})

function parseContent() {
  try {
    form.content = JSON.parse(contentJson.value)
  } catch {
    ElMessage.warning('JSON 格式有误，请检查')
  }
}

async function handleSave() {
  parseContent()
  saving.value = true
  try {
    await request.put(`/sections/${slug}`, form)
    ElMessage.success('保存成功')
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.page-title  { font-size: 18px; font-weight: bold; color: #1b5e20; margin: 0; }
.actions     { display: flex; gap: 8px; }
.card-title  { font-weight: 600; }
.hint        { font-size: 12px; color: #aaa; margin-top: 4px; }
</style>
