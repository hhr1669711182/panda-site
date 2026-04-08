<template>
  <div class="pt-16">
    <div class="bg-gradient-to-br from-panda-dark to-panda-700 text-white py-20 text-center">
      <span class="text-5xl block mb-4">🌿</span>
      <h1 class="font-serif text-5xl font-bold mb-3">保护现状</h1>
      <p class="opacity-80 text-lg">从濒危到易危的保护奇迹</p>
    </div>

    <div class="py-20 bg-white">
      <div class="container mx-auto px-4 max-w-5xl">
        <!-- 状态徽章 -->
        <div class="flex flex-wrap justify-center gap-4 mb-16">
          <div v-for="badge in badges" :key="badge.label"
            class="bg-white rounded-2xl shadow-md px-8 py-4 text-center min-w-44"
          >
            <div class="text-xs text-gray-400 uppercase tracking-widest mb-1">{{ badge.label }}</div>
            <div class="font-bold text-sm rounded px-2 py-0.5 inline-block" :class="badge.cls">{{ badge.value }}</div>
          </div>
        </div>

        <!-- 种群增长 -->
        <div class="mb-14">
          <h2 class="font-serif text-2xl text-panda-dark text-center mb-8">野生种群恢复历程</h2>
          <div class="space-y-3 max-w-2xl mx-auto">
            <div v-for="p in population" :key="p.year" class="flex items-center gap-4">
              <span class="text-sm text-gray-500 w-14 shrink-0">{{ p.year }}</span>
              <div class="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                <div
                  class="h-full rounded-full flex items-center justify-end pr-3 text-white text-xs font-bold transition-all duration-1000"
                  :class="p.current ? 'bg-gradient-to-r from-panda-dark to-panda-400' : 'bg-panda-600'"
                  :style="`width:${p.pct}%`"
                >{{ p.count }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <RevealCard v-for="card in conCards" :key="card.title">
            <div class="text-3xl mb-3">{{ card.icon }}</div>
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
  title:       '大熊猫保护现状 2024 — IUCN易危与中国保护行动',
  description: '大熊猫保护成果：2016年从濒危降级为易危，野生数量恢复至1864只，了解中国67个保护区体系与人工繁育项目。',
  url:         '/conservation',
  keywords:    ['大熊猫保护', 'IUCN易危', '大熊猫国家公园', '人工繁育', '野化放归', '大熊猫保护区'],
})

const badges = [
  { label: 'IUCN 状态',   value: '易危 (VU)',       cls: 'bg-orange-100 text-orange-700' },
  { label: '中国保护级别', value: '国家一级保护动物', cls: 'bg-red-100 text-red-700'    },
  { label: 'CITES 附录',  value: '附录 I',           cls: 'bg-blue-100 text-blue-700'   },
]

const population = [
  { year: '1970s', count: '~1000只', pct: 22 },
  { year: '2003',  count: '1596只',  pct: 32 },
  { year: '2013',  count: '1864只',  pct: 40 },
  { year: '2024',  count: '1800+只', pct: 48, current: true },
]

const conCards = [
  { icon: '🏞️', title: '保护区网络',  body: '中国建立了 <strong>67 个大熊猫自然保护区</strong>，总面积超过 336 万公顷，覆盖约 66.8% 的野生大熊猫种群。2021 年大熊猫国家公园正式设立。' },
  { icon: '🧪', title: '人工繁育',    body: '截至 2023 年，全球人工圈养大熊猫约 <strong>698 只</strong>。卧龙、成都等繁育中心通过人工授精、双胞胎拆分轮养等技术显著提高繁殖成功率。' },
  { icon: '🌍', title: '熊猫外交',    body: '中国将大熊猫租借给其他国家的动物园，约 <strong>20 个国家</strong>参与租借项目，每年租金约 100 万美元，资金用于保护项目。' },
  { icon: '🎯', title: '野化放归',    body: '自 2003 年起，已有多只圈养大熊猫成功回归野外，标志着保护工作进入新阶段。科学家构建生态廊道，连接孤立种群促进基因交流。' },
  { icon: '⚠️', title: '持续威胁',    body: '栖息地碎片化、气候变化导致竹林上移、遗传多样性下降、竹子周期性开花死亡等问题仍是种群恢复的主要障碍。' },
  { icon: '🔬', title: '科学研究',    body: '基因组研究帮助科学家了解遗传多样性，为人工繁育提供配对建议。GPS 追踪技术揭示野生大熊猫的活动规律与栖息地利用模式。' },
]
</script>
