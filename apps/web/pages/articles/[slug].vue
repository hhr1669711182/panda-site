<template>
  <div class="pt-16">
    <div v-if="pending" class="min-h-screen flex items-center justify-center text-gray-400">加载中...</div>
    <div v-else-if="!data" class="min-h-screen flex items-center justify-center text-gray-400">文章不存在</div>
    <article v-else>
      <!-- 封面 -->
      <div class="bg-gradient-to-br from-panda-dark to-panda-700 text-white py-24 text-center px-4">
        <div class="flex flex-wrap justify-center gap-2 mb-4">
          <span v-for="tag in data.tags" :key="tag"
            class="bg-white/20 text-xs px-3 py-1 rounded-full"
          >{{ tag }}</span>
        </div>
        <h1 class="font-serif text-4xl md:text-5xl font-bold max-w-3xl mx-auto mb-4">{{ data.title }}</h1>
        <p class="opacity-80">{{ data.author?.name }} · {{ formatDate(data.publishedAt) }} · 👁 {{ data.views }}</p>
      </div>

      <!-- 正文 -->
      <div class="py-16 bg-white">
        <div class="container mx-auto px-4 max-w-3xl">
          <p v-if="data.excerpt" class="text-xl text-gray-500 leading-relaxed border-l-4 border-panda-400 pl-5 mb-10">
            {{ data.excerpt }}
          </p>
          <!-- 渲染 JSON content blocks -->
          <div class="prose prose-lg max-w-none">
            <template v-for="block in data.content?.blocks" :key="block.type + Math.random()">
              <p v-if="block.type === 'paragraph'" class="mb-4 text-gray-700 leading-relaxed">
                {{ block.data?.text }}
              </p>
            </template>
          </div>

          <!-- 作者信息 -->
          <div class="mt-12 pt-8 border-t border-gray-100 flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-panda-100 flex items-center justify-center text-2xl">🐼</div>
            <div>
              <div class="font-semibold text-gray-900">{{ data.author?.name }}</div>
              <div class="text-sm text-gray-400">发布于 {{ formatDate(data.publishedAt) }}</div>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { data, pending } = await useAsyncData(
  `article-${route.params.slug}`,
  () => $fetch(`/api/articles/${route.params.slug}`)
)

if (data.value) {
  usePandaSeo({
    title:       data.value.seoTitle || data.value.title,
    description: data.value.seoDesc  || data.value.excerpt || '',
    url:         `/articles/${data.value.slug}`,
    image:       data.value.coverImage,
    type:        'article',
    publishedAt: data.value.publishedAt,
    author:      data.value.author?.name,
    keywords:    data.value.tags,
  })
}

function formatDate(d: string | null) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>
