<template>
  <el-container class="admin-layout">
    <!-- 侧边栏 -->
    <el-aside :width="collapsed ? '64px' : '220px'" class="sidebar transition-all duration-300">
      <div class="sidebar-header">
        <span class="logo-icon">🐼</span>
        <span v-if="!collapsed" class="logo-text">大熊猫管理</span>
      </div>

      <el-menu
        :default-active="$route.path"
        :collapse="collapsed"
        router
        background-color="#1b5e20"
        text-color="#c8e6c9"
        active-text-color="#ffffff"
      >
        <el-menu-item index="/dashboard">
          <el-icon><Odometer /></el-icon>
          <template #title>数据看板</template>
        </el-menu-item>

        <el-sub-menu index="content">
          <template #title>
            <el-icon><Document /></el-icon>
            <span>内容管理</span>
          </template>
          <el-menu-item index="/sections">板块内容</el-menu-item>
          <el-menu-item index="/articles">文章管理</el-menu-item>
        </el-sub-menu>

        <el-menu-item index="/media">
          <el-icon><Picture /></el-icon>
          <template #title>媒体库</template>
        </el-menu-item>

        <el-menu-item v-if="auth.isAdmin" index="/users">
          <el-icon><User /></el-icon>
          <template #title>用户权限</template>
        </el-menu-item>

        <el-menu-item v-if="auth.isAdmin" index="/seo">
          <el-icon><Search /></el-icon>
          <template #title>SEO 设置</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- 顶栏 -->
      <el-header class="topbar">
        <div class="topbar-left">
          <el-button :icon="collapsed ? 'Expand' : 'Fold'" circle text @click="collapsed = !collapsed" />
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ currentTitle }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="topbar-right">
          <a href="http://localhost:3000" target="_blank" class="preview-link">
            <el-button size="small" type="primary" plain>预览网站 ↗</el-button>
          </a>
          <el-dropdown @command="handleCommand">
            <div class="user-info">
              <div class="user-avatar">{{ auth.user?.name?.[0] || '?'  }}</div>
              <span class="user-name">{{ auth.user?.name }}</span>
              <el-icon><ArrowDown /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout" divided>
                  <el-icon><SwitchButton /></el-icon> 退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 主内容 -->
      <el-main class="main-content">
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter, useRoute } from 'vue-router'

const auth   = useAuthStore()
const router = useRouter()
const route  = useRoute()
const collapsed = ref(false)

const titleMap: Record<string, string> = {
  '/dashboard': '数据看板',
  '/sections':  '板块内容',
  '/articles':  '文章管理',
  '/media':     '媒体库',
  '/users':     '用户权限',
  '/seo':       'SEO 设置',
}
const currentTitle = computed(() => titleMap[route.path] || '编辑')

function handleCommand(cmd: string) {
  if (cmd === 'logout') {
    auth.logout()
    router.push('/login')
  }
}
</script>

<style scoped>
.admin-layout { height: 100vh; }

.sidebar {
  background: #1b5e20;
  overflow: hidden;
}
.sidebar-header {
  height: 60px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 18px;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  border-bottom: 1px solid rgba(255,255,255,.1);
}
.logo-icon { font-size: 24px; }

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  padding: 0 20px;
  height: 60px;
  box-shadow: 0 1px 4px rgba(0,0,0,.06);
}
.topbar-left, .topbar-right { display: flex; align-items: center; gap: 12px; }
.preview-link { text-decoration: none; }

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.user-avatar {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: #2e7d32;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
}
.user-name { font-size: 14px; color: #333; }

.main-content {
  background: #f5f7fa;
  padding: 20px;
  overflow-y: auto;
}

:deep(.el-menu) { border-right: none !important; }
:deep(.el-menu-item.is-active) { background-color: #2e7d32 !important; }
</style>
