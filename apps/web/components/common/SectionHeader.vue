<template>
  <div class="text-center">
    <span class="inline-block bg-panda-50 text-panda-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3">
      {{ tag }}
    </span>
    <h2 class="font-serif text-3xl md:text-4xl text-gray-900 mb-4">{{ title }}</h2>
    <p v-if="desc" class="max-w-2xl mx-auto text-gray-500 text-base leading-relaxed">{{ desc }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ tag: string; title: string; desc?: string }>()
</script>
