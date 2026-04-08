<template>
  <div>
    <div class="page-header">
      <h2 class="page-title">👤 用户权限管理</h2>
      <el-button type="primary" :icon="Plus" @click="addDialog = true">新建用户</el-button>
    </div>

    <el-card>
      <el-table :data="users" v-loading="loading" stripe>
        <el-table-column prop="name"  label="姓名" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column label="角色" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.role === 'ADMIN' ? 'danger' : 'primary'" size="small">
              {{ row.role === 'ADMIN' ? '管理员' : '编辑者' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="90" align="center">
          <template #default="{ row }">
            <el-tag :type="row.active ? 'success' : 'info'" size="small">{{ row.active ? '启用' : '禁用' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="160">
          <template #default="{ row }">{{ dayjs(row.createdAt).format('YYYY-MM-DD HH:mm') }}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template #default="{ row }">
            <el-select v-model="row.role" size="small" style="width:100px;margin-right:8px" @change="updateUser(row)">
              <el-option label="管理员" value="ADMIN" />
              <el-option label="编辑者" value="EDITOR" />
            </el-select>
            <el-switch :model-value="row.active" @change="val => { row.active = val; updateUser(row) }" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新建用户对话框 -->
    <el-dialog v-model="addDialog" title="新建用户" width="420">
      <el-form :model="addForm" label-position="top">
        <el-form-item label="姓名 *"><el-input v-model="addForm.name" /></el-form-item>
        <el-form-item label="邮箱 *"><el-input v-model="addForm.email" type="email" /></el-form-item>
        <el-form-item label="初始密码 *"><el-input v-model="addForm.password" show-password /></el-form-item>
        <el-form-item label="角色">
          <el-radio-group v-model="addForm.role">
            <el-radio value="EDITOR">编辑者</el-radio>
            <el-radio value="ADMIN">管理员</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addDialog = false">取消</el-button>
        <el-button type="primary" :loading="addLoading" @click="createUser">创建</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import request from '@/utils/request'
import dayjs from 'dayjs'

const users    = ref<any[]>([])
const loading  = ref(true)
const addDialog = ref(false)
const addLoading = ref(false)
const addForm   = reactive({ name: '', email: '', password: '', role: 'EDITOR' })

async function fetchUsers() {
  loading.value = true
  try { users.value = await request.get('/users') }
  finally { loading.value = false }
}

async function updateUser(row: any) {
  await request.patch(`/users/${row.id}`, { role: row.role, active: row.active })
  ElMessage.success('已更新')
}

async function createUser() {
  if (!addForm.name || !addForm.email || !addForm.password) {
    ElMessage.warning('请填写所有必填项')
    return
  }
  addLoading.value = true
  try {
    await request.post('/users', addForm)
    ElMessage.success('创建成功')
    addDialog.value = false
    Object.assign(addForm, { name: '', email: '', password: '', role: 'EDITOR' })
    fetchUsers()
  } finally {
    addLoading.value = false
  }
}

onMounted(fetchUsers)
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.page-title  { font-size: 18px; font-weight: bold; color: #1b5e20; margin: 0; }
</style>
