<template>
  <div
    ref="el"
    class="bg-white rounded-2xl p-6 shadow-md transition-all duration-700 hover:shadow-xl hover:-translate-y-1.5"
    :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const el = ref<HTMLElement | null>(null)
const visible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      visible.value = true
      observer.disconnect()
    }
  }, { threshold: 0.1 })
  if (el.value) observer.observe(el.value)
})
</script>
