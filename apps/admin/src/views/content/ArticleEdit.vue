<template>
  <div>
    <div class="page-header">
      <h2 class="page-title">{{ isNew ? '✏️ 新建文章' : '✏️ 编辑文章' }}</h2>
      <div class="actions">
        <el-button @click="router.push('/articles')">返回</el-button>
        <el-button @click="saveDraft" :loading="saving">存为草稿</el-button>
        <el-button type="primary" @click="savePublish" :loading="saving">发布</el-button>
      </div>
    </div>

    <el-row :gutter="16" v-loading="loading">
      <el-col :span="16">
        <el-card>
          <el-form :model="form" label-position="top">
            <el-form-item label="标题 *">
              <el-input v-model="form.title" placeholder="请输入文章标题" size="large" @blur="autoSlug" />
            </el-form-item>
            <el-form-item label="Slug（URL 路径）*">
              <el-input v-model="form.slug" placeholder="article-slug">
                <template #prepend>/articles/</template>
              </el-input>
            </el-form-item>
            <el-form-item label="摘要">
              <el-input v-model="form.excerpt" type="textarea" :rows="3" placeholder="一句话描述文章内容（同时作为搜索摘要）" :maxlength="200" show-word-limit />
            </el-form-item>
            <el-form-item label="正文内容 (JSON blocks)">
              <el-input
                v-model="contentJson"
                type="textarea"
                :rows="16"
                placeholder='{"blocks": [{"type": "paragraph", "data": {"text": "..."}}]}'
                @blur="parseContent"
              />
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>

      <el-col :span="8">
        <!-- 分类与标签 -->
        <el-card class="mb-4">
          <template #header><span class="card-title">📂 分类与标签</span></template>
          <el-form :model="form" label-position="top">
            <el-form-item label="分类">
              <el-select v-model="form.category" style="width:100%">
                <el-option v-for="c in categories" :key="c.value" :label="c.label" :value="c.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="标签（回车确认）">
              <el-select v-model="form.tags" multiple filterable allow-create default-first-option style="width:100%" />
            </el-form-item>
            <el-form-item label="封面图片 URL">
              <el-input v-model="form.coverImage" placeholder="/uploads/cover.jpg" />
            </el-form-item>
          </el-form>
        </el-card>

        <!-- SEO -->
        <el-card>
          <template #header><span class="card-title">🔍 SEO 优化</span></template>
          <el-form :model="form" label-position="top">
            <el-form-item label="SEO 标题">
              <el-input v-model="form.seoTitle" :maxlength="60" show-word-limit />
              <p class="hint">留空则使用文章标题</p>
            </el-form-item>
            <el-form-item label="SEO 描述">
              <el-input v-model="form.seoDesc" type="textarea" :rows="3" :maxlength="160" show-word-limit />
              <p class="hint">留空则使用文章摘要</p>
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

const route  = useRoute()
const router = useRouter()
const slug   = route.params.slug as string
const isNew  = slug === undefined || slug === 'new'
const loading = ref(!isNew)
const saving  = ref(false)

const form = reactive({
  title: '', slug: '', excerpt: '', content: {} as any,
  category: 'general', tags: [] as string[],
  coverImage: '', seoTitle: '', seoDesc: '',
  published: false,
})
const contentJson = ref('{"blocks":[]}')

const categories = [
  { label: '通用', value: 'general' },
  { label: '保护', value: 'conservation' },
  { label: '科研', value: 'research' },
  { label: '趣味', value: 'fun' },
]

if (!isNew) {
  onMounted(async () => {
    try {
      const data = await request.get(`/articles/${slug}`)
      Object.assign(form, data)
      contentJson.value = JSON.stringify(data.content, null, 2)
    } finally {
      loading.value = false
    }
  })
}

function autoSlug() {
  if (!form.slug && form.title) {
    form.slug = form.title
      .toLowerCase()
      .replace(/[\s\u4e00-\u9fa5]+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .slice(0, 60)
  }
}

function parseContent() {
  try { form.content = JSON.parse(contentJson.value) } catch {}
}

async function saveDraft() {
  form.published = false
  await doSave()
}
async function savePublish() {
  form.published = true
  await doSave()
}
async function doSave() {
  parseContent()
  if (!form.title || !form.slug) {
    ElMessage.warning('标题和 Slug 不能为空')
    return
  }
  saving.value = true
  try {
    if (isNew) {
      const res: any = await request.post('/articles', form)
      ElMessage.success('创建成功')
      router.replace(`/articles/${res.slug}`)
    } else {
      await request.put(`/articles/${slug}`, form)
      ElMessage.success('保存成功')
    }
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
.mb-4        { margin-bottom: 16px; }
</style>
