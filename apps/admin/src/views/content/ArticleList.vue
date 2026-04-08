<template>
  <div>
    <div class="page-header">
      <h2 class="page-title">📰 文章管理</h2>
      <el-button type="primary" :icon="Plus" @click="router.push('/articles/new')">新建文章</el-button>
    </div>

    <el-card>
      <!-- 筛选栏 -->
      <div class="filters">
        <el-input v-model="keyword" placeholder="搜索标题..." clearable style="width:220px" @clear="fetch" @keyup.enter="fetch">
          <template #prefix><el-icon><Search /></el-icon></template>
        </el-input>
        <el-select v-model="category" placeholder="分类" clearable style="width:140px" @change="fetch">
          <el-option v-for="c in categories" :key="c.value" :label="c.label" :value="c.value" />
        </el-select>
        <el-button @click="fetch">搜索</el-button>
      </div>

      <el-table :data="articles" v-loading="loading" stripe class="mt-3">
        <el-table-column prop="title" label="标题" min-width="220" show-overflow-tooltip />
        <el-table-column label="分类" width="90">
          <template #default="{ row }">
            <el-tag size="small">{{ row.category }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="标签" min-width="140">
          <template #default="{ row }">
            <el-tag v-for="t in row.tags?.slice(0,3)" :key="t" size="small" class="mr-1" type="info">{{ t }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="90" align="center">
          <template #default="{ row }">
            <el-tag :type="row.published ? 'success' : 'warning'" size="small">
              {{ row.published ? '已发布' : '草稿' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="浏览" width="70" align="center" prop="views" />
        <el-table-column label="作者" width="100" prop="author.name" />
        <el-table-column label="更新" width="130">
          <template #default="{ row }">{{ dayjs(row.updatedAt).format('MM-DD HH:mm') }}</template>
        </el-table-column>
        <el-table-column label="操作" width="110" align="center" fixed="right">
          <template #default="{ row }">
            <el-button size="small" :icon="Edit" @click="router.push(`/articles/${row.slug}`)" />
            <el-popconfirm title="确认删除？" @confirm="deleteArticle(row.slug)">
              <template #reference>
                <el-button size="small" type="danger" :icon="Delete" />
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          v-model:current-page="page"
          v-model:page-size="pageSize"
          :total="total"
          layout="total, prev, pager, next"
          @current-change="fetch"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Plus, Edit, Delete, Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import request from '@/utils/request'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'

const router   = useRouter()
const articles = ref<any[]>([])
const loading  = ref(false)
const total    = ref(0)
const page     = ref(1)
const pageSize = ref(10)
const keyword  = ref('')
const category = ref('')

const categories = [
  { label: '全部', value: '' },
  { label: '保护', value: 'conservation' },
  { label: '科研', value: 'research' },
  { label: '趣味', value: 'fun' },
  { label: '通用', value: 'general' },
]

async function fetch() {
  loading.value = true
  try {
    const res: any = await request.get('/articles', {
      params: { page: page.value, pageSize: pageSize.value, keyword: keyword.value, category: category.value, all: true },
    })
    articles.value = res.items
    total.value    = res.total
  } finally {
    loading.value = false
  }
}

async function deleteArticle(slug: string) {
  await request.delete(`/articles/${slug}`)
  ElMessage.success('删除成功')
  fetch()
}

onMounted(fetch)
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.page-title  { font-size: 18px; font-weight: bold; color: #1b5e20; margin: 0; }
.filters     { display: flex; gap: 10px; flex-wrap: wrap; }
.pagination  { margin-top: 16px; display: flex; justify-content: flex-end; }
</style>
