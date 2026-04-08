<template>
  <div>
    <div class="page-header">
      <h2 class="page-title">📄 板块内容管理</h2>
    </div>

    <el-card>
      <el-table :data="sections" v-loading="loading" stripe>
        <el-table-column prop="order" label="排序" width="70" align="center" />
        <el-table-column prop="slug"  label="标识 Slug" width="140" />
        <el-table-column prop="title" label="标题" />
        <el-table-column label="SEO 标题" show-overflow-tooltip>
          <template #default="{ row }">
            <span class="text-gray">{{ row.seoTitle || '未设置' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="90" align="center">
          <template #default="{ row }">
            <el-tag :type="row.published ? 'success' : 'info'" size="small">
              {{ row.published ? '已发布' : '隐藏' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" width="160">
          <template #default="{ row }">{{ dayjs(row.updatedAt).format('YYYY-MM-DD HH:mm') }}</template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template #default="{ row }">
            <el-button type="primary" size="small" :icon="Edit" @click="goEdit(row.slug)" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue'
import request from '@/utils/request'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'

const router   = useRouter()
const sections = ref<any[]>([])
const loading  = ref(true)

onMounted(async () => {
  try {
    sections.value = await request.get('/sections')
  } finally {
    loading.value = false
  }
})

function goEdit(slug: string) {
  router.push(`/sections/${slug}`)
}
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.page-title  { font-size: 18px; font-weight: bold; color: #1b5e20; margin: 0; }
.text-gray   { color: #aaa; font-size: 13px; }
</style>
