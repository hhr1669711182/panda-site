import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { public: true },
  },
  {
    path: '/',
    component: () => import('@/components/AdminLayout.vue'),
    children: [
      { path: '',          redirect: '/dashboard' },
      { path: 'dashboard', name: 'Dashboard',    component: () => import('@/views/Dashboard.vue') },
      // 内容管理
      { path: 'sections',       name: 'SectionList',   component: () => import('@/views/content/SectionList.vue') },
      { path: 'sections/:slug', name: 'SectionEdit',   component: () => import('@/views/content/SectionEdit.vue') },
      { path: 'articles',       name: 'ArticleList',   component: () => import('@/views/content/ArticleList.vue') },
      { path: 'articles/new',   name: 'ArticleNew',    component: () => import('@/views/content/ArticleEdit.vue') },
      { path: 'articles/:slug', name: 'ArticleEdit',   component: () => import('@/views/content/ArticleEdit.vue') },
      // 媒体库
      { path: 'media',    name: 'MediaLibrary', component: () => import('@/views/media/MediaLibrary.vue') },
      // 用户管理 (仅 ADMIN)
      { path: 'users',    name: 'UserList',     component: () => import('@/views/users/UserList.vue'),    meta: { adminOnly: true } },
      // SEO 设置
      { path: 'seo',      name: 'SeoSettings',  component: () => import('@/views/seo/SeoSettings.vue'),  meta: { adminOnly: true } },
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: '/dashboard' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 路由守卫
router.beforeEach(async (to) => {
  const auth = useAuthStore()

  if (!to.meta.public && !auth.isLoggedIn) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  if (to.meta.adminOnly && !auth.isAdmin) {
    return { path: '/dashboard' }
  }

  // 首次加载时获取用户信息
  if (auth.isLoggedIn && !auth.user) {
    await auth.fetchMe()
  }
})

export default router
