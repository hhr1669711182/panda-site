<template>
  <div class="pt-16">
    <div class="bg-gradient-to-br from-panda-dark to-panda-700 text-white py-20 text-center">
      <span class="text-5xl block mb-4">🎋</span>
      <h1 class="font-serif text-5xl font-bold mb-3">饮食习惯</h1>
      <p class="opacity-80 text-lg">99% 竹子的独特食谱</p>
    </div>

    <div class="py-20 bg-white">
      <div class="container mx-auto px-4 max-w-5xl">
        <!-- 饼图视觉 -->
        <div class="flex flex-col items-center mb-16">
          <div class="relative w-52 h-52">
            <svg viewBox="0 0 200 200" class="w-full h-full -rotate-90">
              <circle cx="100" cy="100" r="80" fill="none" stroke="#e8f5e9" stroke-width="36" />
              <circle cx="100" cy="100" r="80" fill="none" stroke="#4caf50" stroke-width="36"
                stroke-dasharray="499 3" class="transition-all duration-1000" />
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <span class="font-serif text-3xl font-bold text-panda-dark">99%</span>
              <span class="text-xs text-gray-500">竹子</span>
            </div>
          </div>
          <div class="flex gap-6 mt-4 text-sm">
            <span class="flex items-center gap-2"><span class="w-4 h-4 rounded bg-panda-400 inline-block" />竹子 99%</span>
            <span class="flex items-center gap-2"><span class="w-4 h-4 rounded bg-orange-400 inline-block" />其他 1%</span>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <RevealCard v-for="card in dietCards" :key="card.title">
            <h3 class="font-serif text-lg text-panda-dark mb-2">{{ card.title }}</h3>
            <p class="text-sm text-gray-600 leading-relaxed" v-html="card.body" />
          </RevealCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
usePandaSeo({
  title:       '大熊猫饮食习惯 — 为什么大熊猫只吃竹子',
  description: '探索大熊猫独特的饮食习惯：每天进食 12–38 公斤竹子、神奇的假拇指、低效的竹子消化系统与竹子开花危机。',
  url:         '/diet',
  keywords:    ['大熊猫饮食', '大熊猫吃竹子', '伪拇指', '假拇指', '竹子消化', '大熊猫食物'],
})

const dietCards = [
  { title: '🎋 竹子消耗量',   body: '成年大熊猫每天进食 <strong>12–38 公斤</strong>竹子，进食时间长达 <strong>10–16 小时</strong>。竹子营养价值极低，需要大量进食满足能量需求。' },
  { title: '👋 伪拇指（假拇指）', body: '大熊猫前掌有一根特化的桡侧籽骨，形成功能性的「第六指」，可对握帮助抓握竹茎。这是趋同进化的典范。' },
  { title: '🌿 竹子偏好',    body: '春季：竹笋（营养最丰富）；夏季：竹叶；秋冬：竹茎。偏爱竹种包括箭竹、冷箭竹、巴山木竹等。' },
  { title: '⚙️ 消化效率',    body: '对竹子的消化率仅约 <strong>17%</strong>（草食动物可达 80%）。大熊猫保留了食肉动物短而简单的消化道，肠道菌群帮助消化。' },
  { title: '💧 饮水需求',    body: '大熊猫通常在溪流边饮水，竹叶和竹茎中也含有大量水分。有时会寻找特定矿物盐补充微量元素。' },
  { title: '🔄 竹子开花危机', body: '竹子周期性大规模开花后集体死亡（50–120 年一次），历史上曾导致大熊猫大量死亡。今日保护区内种植多种竹子降低此风险。' },
]
</script>
