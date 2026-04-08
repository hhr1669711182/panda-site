<template>
  <div>
    <div class="page-header">
      <h2 class="page-title">🖼️ 媒体库</h2>
      <el-upload
        action="/api/media/upload"
        :headers="uploadHeaders"
        :on-success="onUploadSuccess"
        :on-error="() => ElMessage.error('上传失败')"
        :show-file-list="false"
        accept="image/*"
        multiple
      >
        <el-button type="primary" :icon="Upload">上传图片</el-button>
      </el-upload>
    </div>

    <el-card>
      <div v-if="loading" class="loading-placeholder">加载中...</div>
      <div v-else-if="!media.length" class="empty">暂无媒体文件</div>
      <div v-else class="media-grid">
        <div
          v-for="item in media"
          :key="item.id"
          class="media-item"
          @click="selected = item"
          :class="{ active: selected?.id === item.id }"
        >
          <img :src="item.url" :alt="item.alt || item.filename" class="media-thumb" />
          <div class="media-name">{{ item.filename }}</div>
          <div class="media-size">{{ formatSize(item.size) }}</div>
        </div>
      </div>

      <div class="pagination">
        <el-pagination v-model:current-page="page" :total="total" :page-size="20" @current-change="fetch" layout="total, prev, pager, next" />
      </div>
    </el-card>

    <!-- 详情面板 -->
    <el-drawer v-model="!!selected" title="图片详情" :size="340" @closed="selected = null">
      <div v-if="selected">
        <img :src="selected.url" class="w-full rounded-lg mb-4" />
        <el-descriptions :column="1" border size="small">
          <el-descriptions-item label="文件名">{{ selected.filename }}</el-descriptions-item>
          <el-descriptions-item label="URL">
            <el-input :model-value="selected.url" readonly size="small">
              <template #append>
                <el-button :icon="CopyDocument" @click="copy(selected.url)" />
              </template>
            </el-input>
          </el-descriptions-item>
          <el-descriptions-item label="格式">{{ selected.mimeType }}</el-descriptions-item>
          <el-descriptions-item label="大小">{{ formatSize(selected.size) }}</el-descriptions-item>
        </el-descriptions>
        <el-button type="danger" class="mt-4 w-full" :icon="Delete" @click="deleteMedia(selected)">删除</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { Upload, Delete, CopyDocument } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import request from '@/utils/request'

const media    = ref<any[]>([])
const loading  = ref(true)
const page     = ref(1)
const total    = ref(0)
const selected = ref<any>(null)

const uploadHeaders = computed(() => ({
  Authorization: `Bearer ${localStorage.getItem('panda_token')}`,
}))

async function fetch() {
  loading.value = true
  try {
    const res: any = await request.get('/media', { params: { page: page.value } })
    media.value = res.items
    total.value = res.total
  } finally {
    loading.value = false
  }
}

function onUploadSuccess() {
  ElMessage.success('上传成功')
  fetch()
}

async function deleteMedia(item: any) {
  await request.delete(`/media/${item.id}`)
  ElMessage.success('删除成功')
  selected.value = null
  fetch()
}

function formatSize(bytes: number) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1024 / 1024).toFixed(2) + ' MB'
}

function copy(text: string) {
  navigator.clipboard.writeText(text)
  ElMessage.success('已复制到剪贴板')
}

onMounted(fetch)
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.page-title  { font-size: 18px; font-weight: bold; color: #1b5e20; margin: 0; }
.media-grid  { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 12px; }
.media-item  { border: 2px solid #f0f0f0; border-radius: 8px; padding: 6px; cursor: pointer; transition: all .2s; }
.media-item:hover, .media-item.active { border-color: #2e7d32; }
.media-thumb { width: 100%; height: 110px; object-fit: cover; border-radius: 6px; }
.media-name  { font-size: 11px; color: #555; margin-top: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.media-size  { font-size: 10px; color: #aaa; }
.pagination  { margin-top: 16px; display: flex; justify-content: flex-end; }
.empty, .loading-placeholder { text-align: center; padding: 60px; color: #ccc; }
.mt-4 { margin-top: 16px; }
.w-full { width: 100%; }
</style>
