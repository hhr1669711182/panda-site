<template>
  <div class="pt-16">
    <div class="bg-gradient-to-br from-panda-dark to-panda-700 text-white py-20 text-center">
      <span class="text-5xl block mb-4">💡</span>
      <h1 class="font-serif text-5xl font-bold mb-3">趣味知识</h1>
      <p class="opacity-80 text-lg">你不知道的大熊猫冷知识</p>
    </div>

    <div class="py-20 bg-white">
      <div class="container mx-auto px-4 max-w-5xl">
        <div class="grid md:grid-cols-3 gap-5">
          <RevealCard v-for="fact in facts" :key="fact.num">
            <div class="relative">
              <span class="absolute top-0 right-0 font-serif text-5xl font-bold text-panda-50 leading-none select-none">{{ fact.num }}</span>
              <div class="text-3xl mb-3">{{ fact.icon }}</div>
              <h3 class="font-serif text-lg text-panda-dark mb-2 pr-8">{{ fact.title }}</h3>
              <p class="text-sm text-gray-600 leading-relaxed">{{ fact.body }}</p>
            </div>
          </RevealCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
usePandaSeo({
  title:       '大熊猫趣味冷知识 — 9个你不知道的大熊猫秘密',
  description: '大熊猫每天排便40次？不冬眠？WWF Logo的灵感？揭开这些鲜为人知的大熊猫趣味知识。',
  url:         '/facts',
  keywords:    ['大熊猫冷知识', '大熊猫趣味', '大熊猫不冬眠', 'WWF熊猫', '大熊猫游泳'],
})

const facts = [
  { num: '01', icon: '💩', title: '每天排便多达 40 次',   body: '由于竹子难以消化，大熊猫每天需要排便约 40 次，粪便中有大量未消化的竹纤维，甚至有一股淡淡的竹香味。' },
  { num: '02', icon: '🏊', title: '天生的游泳健将',       body: '大熊猫是出色的游泳者，能轻松横渡湍急的山间溪流。它们也擅长爬树，幼崽受到威胁时会迅速爬上大树躲避。' },
  { num: '03', icon: '🎨', title: '黑白配色的多重功能',   body: '研究表明大熊猫的毛色有多重功能：黑色部分吸热保温；白色提供雪地伪装；眼周黑斑用于种内识别和威吓。' },
  { num: '04', icon: '😴', title: '不冬眠的熊',           body: '与其他熊类不同，大熊猫不冬眠。这是因为竹子营养不足，无法积累足够脂肪进入冬眠状态。冬季仅向低海拔迁移。' },
  { num: '05', icon: '🔊', title: '拥有 11 种叫声',       body: '大熊猫的叫声出乎意料地丰富，包括「咩咩」声（幼崽）、吠叫声、嗤鼻声等至少 11 种不同叫声，用于不同社交场合。' },
  { num: '06', icon: '🧠', title: '比想象中更聪明',       body: '圈养大熊猫展现出解决问题的能力。它们能学习简单指令，甚至部分雌性会「假装怀孕」以获得更好的食物待遇。' },
  { num: '07', icon: '🌡️', title: '极低的基础代谢率',     body: '大熊猫核心体温约 38.5°C，但基础代谢率仅为同等体型动物的约 37%，这是适应低营养竹子饮食的节能策略。' },
  { num: '08', icon: '🌏', title: 'WWF 的灵感来源',       body: '1961 年 WWF 创立时，联合创始人彼得·斯科特爵士以在伦敦动物园展出的大熊猫「姬姬」为原型，设计了标志性的黑白 Logo。' },
  { num: '09', icon: '🦷', title: '强大的咬合力',         body: '大熊猫头骨宽大，咬肌极其发达，咬合力可达 1298 N，能轻松咬断直径数厘米的竹茎——即便用钢丝钳也需要相当力气。' },
]
</script>
