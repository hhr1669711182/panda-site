<template>
  <div class="min-h-screen flex flex-col font-sans">
    <!-- 导航栏 -->
    <nav
      class="fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300"
      :class="scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'"
    >
      <div class="container mx-auto px-4 h-full flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2 text-panda-dark font-serif font-bold text-xl">
          <span class="text-2xl">🐼</span>
          <span>大熊猫</span>
        </NuxtLink>

        <!-- 桌面导航 -->
        <ul class="hidden md:flex gap-6 text-sm font-medium">
          <li v-for="item in navItems" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="text-gray-700 hover:text-panda-700 transition-colors relative group"
            >
              {{ item.label }}
              <span class="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-panda-500 group-hover:w-full transition-all" />
            </NuxtLink>
          </li>
        </ul>

        <!-- 汉堡菜单 -->
        <button
          class="md:hidden flex flex-col gap-1.5 p-1"
          @click="mobileOpen = !mobileOpen"
          aria-label="菜单"
        >
          <span class="block w-6 h-0.5 bg-gray-700 transition-all" :class="mobileOpen ? 'rotate-45 translate-y-2' : ''" />
          <span class="block w-6 h-0.5 bg-gray-700 transition-all" :class="mobileOpen ? 'opacity-0' : ''" />
          <span class="block w-6 h-0.5 bg-gray-700 transition-all" :class="mobileOpen ? '-rotate-45 -translate-y-2' : ''" />
        </button>
      </div>

      <!-- 移动端菜单 -->
      <Transition name="slide">
        <div
          v-if="mobileOpen"
          class="md:hidden absolute top-16 left-0 right-0 bg-white/97 backdrop-blur-md shadow-md py-2"
        >
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="block px-6 py-3 text-gray-700 hover:bg-panda-50 hover:text-panda-700"
            @click="mobileOpen = false"
          >
            {{ item.label }}
          </NuxtLink>
        </div>
      </Transition>
    </nav>

    <!-- 主内容 -->
    <main class="flex-1 pt-16">
      <slot />
    </main>

    <!-- 页脚 -->
    <footer class="bg-gray-900 text-gray-400 pt-14 pb-6">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <span class="font-serif text-white text-xl font-bold block mb-3">🐼 大熊猫</span>
            <p class="text-sm leading-relaxed">本网站旨在传播大熊猫科学知识，推动物种保护意识。内容仅供教育参考。</p>
          </div>
          <div>
            <h4 class="text-white text-sm font-semibold mb-4 border-b border-gray-700 pb-2">快速导航</h4>
            <ul class="space-y-2 text-sm">
              <li v-for="item in navItems" :key="item.to">
                <NuxtLink :to="item.to" class="hover:text-panda-400 transition-colors">{{ item.label }}</NuxtLink>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="text-white text-sm font-semibold mb-4 border-b border-gray-700 pb-2">参考来源</h4>
            <ul class="space-y-1.5 text-xs space-y-2">
              <li>IUCN Red List — Ailuropoda melanoleuca</li>
              <li>WWF Giant Panda Conservation</li>
              <li>中国大熊猫保护研究中心</li>
              <li>National Geographic — Giant Panda</li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-800 pt-5 text-center text-xs text-gray-600">
          © 2025 大熊猫简介网站 · 内容仅供教育参考
        </div>
      </div>
    </footer>

    <!-- 回到顶部 -->
    <Transition name="fade">
      <button
        v-if="scrolled"
        class="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-panda-700 text-white shadow-lg hover:bg-panda-900 hover:-translate-y-1 transition-all z-50 text-lg"
        @click="scrollToTop"
        aria-label="回到顶部"
      >
        ↑
      </button>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const navItems = [
  { to: '/',             label: '首页'     },
  { to: '/habitat',      label: '栖息地'   },
  { to: '/diet',         label: '饮食习惯' },
  { to: '/lifecycle',    label: '生命周期' },
  { to: '/conservation', label: '保护现状' },
  { to: '/gallery',      label: '画廊'     },
  { to: '/facts',        label: '趣味知识' },
  { to: '/articles',     label: '文章'     },
]

const scrolled = ref(false)
const mobileOpen = ref(false)

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 60
  })
})
</script>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: all .25s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-10px); }
.fade-enter-active, .fade-leave-active { transition: opacity .25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
