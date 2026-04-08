<template>
  <div class="pt-16">
    <div class="bg-gradient-to-br from-panda-dark to-panda-700 text-white py-20 text-center">
      <span class="text-5xl block mb-4">📰</span>
      <h1 class="font-serif text-5xl font-bold mb-3">文章</h1>
      <p class="opacity-80 text-lg">深度探索大熊猫的世界</p>
    </div>

    <div class="py-16 bg-gray-50">
      <div class="container mx-auto px-4 max-w-5xl">
        <div v-if="pending" class="text-center py-20 text-gray-400">加载中...</div>
        <div v-else-if="data?.items?.length === 0" class="text-center py-20 text-gray-400">暂无文章</div>
        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="article in data?.items"
            :key="article.id"
            :to="`/articles/${article.slug}`"
            class="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div class="h-40 bg-gradient-to-br from-panda-100 to-panda-50 flex items-center justify-center text-6xl">
              🐼
            </div>
            <div class="p-5">
              <div class="flex gap-2 flex-wrap mb-2">
                <span v-for="tag in article.tags?.slice(0,3)" :key="tag"
                  class="bg-panda-50 text-panda-700 text-xs px-2 py-0.5 rounded-full"
                >{{ tag }}</span>
              </div>
              <h2 class="font-serif text-lg text-gray-900 group-hover:text-panda-700 transition-colors mb-2 line-clamp-2">
                {{ article.title }}
              </h2>
              <p class="text-sm text-gray-500 line-clamp-2 mb-3">{{ article.excerpt }}</p>
              <div class="flex items-center justify-between text-xs text-gray-400">
                <span>{{ article.author?.name }}</span>
                <span>👁 {{ article.views }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- 分页 -->
        <div v-if="data?.total > 9" class="flex justify-center gap-2 mt-10">
          <button
            v-for="p in Math.ceil(data.total / 9)"
            :key="p"
            @click="page = p"
            class="w-10 h-10 rounded-lg text-sm font-medium transition-colors"
            :class="page === p ? 'bg-panda-700 text-white' : 'bg-white text-gray-600 hover:bg-panda-50'"
          >{{ p }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
usePandaSeo({
  title:       '大熊猫文章 — 深度知识与保护资讯',
  description: '阅读关于大熊猫的深度文章，涵盖保护现状、科学研究、栖息地保护等最新资讯。',
  url:         '/articles',
})

const page = ref(1)
const { data, pending } = await useAsyncData(
  () => `articles-${page.value}`,
  () => $fetch('/api/articles', { query: { page: page.value, pageSize: 9 } }),
  { watch: [page] }
)
</script>
