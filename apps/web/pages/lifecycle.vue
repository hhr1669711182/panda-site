<template>
  <div class="pt-16">
    <div class="bg-gradient-to-br from-panda-dark to-panda-700 text-white py-20 text-center">
      <span class="text-5xl block mb-4">🐾</span>
      <h1 class="font-serif text-5xl font-bold mb-3">繁殖与生命周期</h1>
      <p class="opacity-80 text-lg">脆弱而珍贵的生命旅程</p>
    </div>

    <div class="py-20 bg-gray-50">
      <div class="container mx-auto px-4 max-w-3xl">
        <!-- 时间轴 -->
        <div class="relative pl-16">
          <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-panda-400 to-panda-dark" />
          <div v-for="(step, i) in lifecycle" :key="i" class="relative mb-10">
            <div class="absolute -left-10 w-11 h-11 rounded-full bg-white border-2 border-panda-400 flex items-center justify-center text-xl shadow">
              {{ step.icon }}
            </div>
            <RevealCard>
              <div class="flex flex-wrap items-center gap-3 mb-2">
                <h3 class="font-serif text-xl text-panda-dark">{{ step.title }}</h3>
                <span class="bg-panda-50 text-panda-700 text-xs font-bold px-3 py-1 rounded-full">{{ step.time }}</span>
              </div>
              <p class="text-sm text-gray-600 leading-relaxed" v-html="step.body" />
            </RevealCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
usePandaSeo({
  title:       '大熊猫繁殖与生命周期 — 延迟着床与微小幼崽',
  description: '了解大熊猫独特的繁殖机制：每年仅 24–72 小时发情窗口、延迟着床现象、仅 90 克的微小新生儿。',
  url:         '/lifecycle',
  keywords:    ['大熊猫繁殖', '大熊猫幼崽', '延迟着床', '大熊猫寿命', '大熊猫发情期'],
})

const lifecycle = [
  { icon: '💕', title: '求偶与交配',   time: '3—5月',       body: '每年春季发情期。雌性发情窗口极短，仅 <strong>24–72 小时</strong>。雄性通过气味和叫声寻找配偶，交配后雄性不参与育幼。' },
  { icon: '🤰', title: '延迟着床',     time: '97–163天',     body: '受精卵在子宫中漂浮数周至数月后才植入宫壁发育。实际胚胎发育时间仅约 45–60 天，妊娠期 97–163 天，变化范围极大。' },
  { icon: '👶', title: '出生',         time: '7—9月',        body: '新生幼崽体重仅 <strong>90–180 克</strong>（约为母亲体重的 1/900），全身粉红色，双眼紧闭。若产双胞胎，母亲通常只能抚养一只。' },
  { icon: '🍼', title: '哺乳期',       time: '0–6个月',      body: '母亲需要 24 小时不间断地抱着、舔舐幼崽使其保持温暖。约 <strong>6–8 周</strong>开始出现黑白毛色，4–5 个月可以行走。' },
  { icon: '🌱', title: '断奶与学习',   time: '8–9个月',      body: '幼崽约 8–9 月龄开始吃竹子，但仍会哺乳至 1 岁半左右。幼崽跟随母亲学习觅食、爬树等生存技能。母亲每隔 2 年繁殖一次。' },
  { icon: '🐾', title: '独立与成熟',   time: '1.5–2.5岁',   body: '幼崽在 1.5–2.5 岁时与母亲分离。雌性 <strong>4–5 岁</strong>性成熟。野外寿命约 14–20 年，圈养最长记录超过 38 岁。' },
]
</script>
