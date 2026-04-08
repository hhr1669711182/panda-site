<template>
  <div class="pt-16">
    <div class="bg-gradient-to-br from-panda-dark to-panda-700 text-white py-20 text-center">
      <span class="text-5xl block mb-4">🖼️</span>
      <h1 class="font-serif text-5xl font-bold mb-3">画廊</h1>
      <p class="opacity-80 text-lg">用视觉感受大熊猫的黑白世界</p>
    </div>

    <div class="py-20 bg-gray-50">
      <div class="container mx-auto px-4 max-w-5xl">
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div
            v-for="item in gallery"
            :key="item.caption"
            :class="['rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer relative', item.large ? 'col-span-2' : '']"
            @click="lightbox = item"
          >
            <div
              class="min-h-48 flex flex-col items-center justify-center p-6 relative"
              :style="`background: ${item.bg}`"
            >
              <span class="text-6xl md:text-8xl">{{ item.emoji }}</span>
              <div v-if="item.sub" class="text-2xl mt-2">{{ item.sub }}</div>
              <div class="absolute bottom-0 inset-x-0 bg-black/50 text-white text-center py-2 text-sm backdrop-blur-sm">
                {{ item.caption }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 灯箱 -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="lightbox"
          class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          @click.self="lightbox = null"
        >
          <div class="bg-white rounded-2xl overflow-hidden max-w-lg w-full shadow-2xl">
            <div class="min-h-64 flex items-center justify-center p-8" :style="`background:${lightbox.bg}`">
              <span class="text-9xl">{{ lightbox.emoji }}</span>
            </div>
            <div class="p-5">
              <h3 class="font-serif text-xl text-panda-dark mb-2">{{ lightbox.caption }}</h3>
              <p class="text-sm text-gray-500">{{ lightbox.desc }}</p>
              <button class="mt-4 px-4 py-2 bg-panda-700 text-white rounded-lg text-sm hover:bg-panda-900 transition-colors" @click="lightbox = null">关闭</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
usePandaSeo({
  title:       '大熊猫画廊 — 黑白国宝的视觉世界',
  description: '通过精美插画感受大熊猫的生活场景：竹林觅食、母子互动、爬树玩耍、山地家园。',
  url:         '/gallery',
})

const lightbox = ref<any>(null)

const gallery = [
  { emoji: '🐼', sub: '🎋', bg: 'linear-gradient(135deg,#c8e6c9,#a5d6a7)', caption: '竹林午后', desc: '大熊猫每天花 10–16 小时进食竹子，惬意地坐在竹林里享受一顿竹宴。', large: true },
  { emoji: '🐼', sub: null, bg: 'linear-gradient(135deg,#fff8e1,#ffe082)', caption: '幼崽嬉戏',  desc: '新生大熊猫幼崽体重仅 90–180 克，粉嫩可爱。' },
  { emoji: '🐼', sub: null, bg: 'linear-gradient(135deg,#e3f2fd,#b3e5fc)', caption: '爬树高手',  desc: '大熊猫从幼崽起便擅长爬树，遇到天敌时会迅速登上大树躲避。' },
  { emoji: '🐼', sub: '🐼', bg: 'linear-gradient(135deg,#fce4ec,#f8bbd0)', caption: '母子情深',  desc: '大熊猫母亲会不间断照料幼崽长达 1.5 年，这是极为罕见的长期投入。' },
  { emoji: '🐼', sub: null, bg: 'linear-gradient(135deg,#f3e5f5,#e1bee7)', caption: '翻滚嬉戏',  desc: '大熊猫看似笨拙，其实行动灵活，会翻滚、游泳，还能爬陡坡。' },
  { emoji: '🐼', sub: '⛰️', bg: 'linear-gradient(135deg,#e8f5e9,#c8e6c9)', caption: '山地家园', desc: '大熊猫生活在海拔 1200–3400 米的高山竹林，秦岭山脉是重要栖息地。', large: true },
]
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
