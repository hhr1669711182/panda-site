<template>
  <div>
    <!-- ===== 英雄区 ===== -->
    <section class="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-panda-dark via-panda-800 to-panda-600">
      <!-- 浮动装饰 -->
      <div class="absolute inset-0 pointer-events-none">
        <span v-for="(leaf, i) in leaves" :key="i"
          class="absolute text-3xl opacity-20"
          :style="leaf.style"
        >{{ leaf.emoji }}</span>
      </div>

      <div class="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-12">
        <!-- 文字区 -->
        <div class="flex-1 text-white z-10 text-center lg:text-left">
          <div class="inline-block bg-white/20 border border-white/30 rounded-full px-4 py-1 text-xs tracking-widest uppercase mb-6 backdrop-blur-sm">
            中国国宝
          </div>
          <h1 class="font-serif text-6xl md:text-8xl font-bold mb-4 tracking-widest drop-shadow-lg animate-float">
            大 熊 猫
          </h1>
          <p class="italic text-lg opacity-80 mb-4 tracking-wider">Ailuropoda melanoleuca</p>
          <p class="text-lg opacity-90 leading-loose mb-10 max-w-lg mx-auto lg:mx-0">
            这片竹海深处，藏着地球上最温柔的黑白传奇。<br>了解这一珍稀物种背后的故事。
          </p>

          <!-- 统计数字 -->
          <div class="flex gap-4 justify-center lg:justify-start flex-wrap mb-10">
            <div v-for="stat in stats" :key="stat.label"
              class="bg-white/15 backdrop-blur border border-white/25 rounded-xl px-5 py-3 text-center min-w-28"
            >
              <span class="block font-serif text-3xl font-bold">{{ stat.value }}</span>
              <span class="block text-xs opacity-75 mt-1 leading-tight">{{ stat.label }}</span>
            </div>
          </div>

          <a href="#overview" class="inline-block bg-white text-panda-dark font-bold px-8 py-3.5 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
            探索更多 ↓
          </a>
        </div>

        <!-- 熊猫插画（CSS） -->
        <div class="flex-1 flex justify-center items-center z-10">
          <div class="animate-float text-center select-none">
            <!-- 头部 -->
            <div class="relative w-44 h-40 bg-white rounded-[50%] mx-auto shadow-2xl">
              <div class="absolute -top-5 left-3 w-12 h-12 bg-gray-900 rounded-full" />
              <div class="absolute -top-5 right-3 w-12 h-12 bg-gray-900 rounded-full" />
              <div class="absolute top-7 left-5 w-10 h-9 bg-gray-900 rounded-full">
                <div class="absolute top-2 left-2 w-3.5 h-3.5 bg-white rounded-full animate-blink" />
              </div>
              <div class="absolute top-7 right-5 w-10 h-9 bg-gray-900 rounded-full">
                <div class="absolute top-2 left-2 w-3.5 h-3.5 bg-white rounded-full animate-blink" />
              </div>
              <div class="absolute top-20 left-1/2 -translate-x-1/2 w-6 h-3.5 bg-gray-700 rounded-full" />
              <div class="absolute top-24 left-1/2 -translate-x-1/2 w-8 h-4 border-2 border-gray-700 border-t-0 rounded-b-full" />
            </div>
            <!-- 身体 -->
            <div class="relative w-48 h-36 bg-white rounded-[50%] mx-auto mt-2 shadow-2xl flex items-center justify-center">
              <div class="absolute top-8 -left-5 w-14 h-10 bg-gray-900 rounded-full rotate-[-20deg]" />
              <div class="absolute top-8 -right-5 w-14 h-10 bg-gray-900 rounded-full rotate-[20deg]" />
              <span class="text-5xl animate-munch">🎋</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== 概览板块 ===== -->
    <section id="overview" class="py-24 bg-white">
      <div class="container mx-auto px-4">
        <SectionHeader tag="基本档案" title="物种概览" desc="大熊猫属哺乳纲食肉目熊科，是中国特有的珍稀濒危动物，也是世界自然基金会的形象大使。" />
        <div class="grid md:grid-cols-3 gap-6 mt-12">
          <RevealCard>
            <div class="text-4xl mb-4">🔬</div>
            <h3 class="font-serif text-xl text-panda-dark mb-4">分类学地位</h3>
            <table class="w-full text-sm">
              <tr v-for="row in taxonomy" :key="row[0]" class="even:bg-panda-50">
                <td class="py-1.5 px-2 font-semibold text-panda-700 w-10">{{ row[0] }}</td>
                <td class="py-1.5 px-2">{{ row[1] }}</td>
              </tr>
            </table>
          </RevealCard>
          <RevealCard>
            <div class="text-4xl mb-4">📏</div>
            <h3 class="font-serif text-xl text-panda-dark mb-4">形态特征</h3>
            <div class="space-y-3">
              <div v-for="f in features" :key="f.label" class="grid grid-cols-[80px_1fr_70px] items-center gap-2">
                <span class="text-xs text-gray-500">{{ f.label }}</span>
                <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-panda-700 to-panda-400 rounded-full" :style="`width:${f.pct}%`" />
                </div>
                <span class="text-xs font-semibold text-panda-dark text-right">{{ f.val }}</span>
              </div>
            </div>
          </RevealCard>
          <RevealCard>
            <div class="text-4xl mb-4">🧬</div>
            <h3 class="font-serif text-xl text-panda-dark mb-4">演化历史</h3>
            <div class="space-y-3">
              <div v-for="e in evolution" :key="e.time" class="flex gap-3">
                <span class="text-xs font-bold text-panda-700 shrink-0 pt-0.5 w-20">{{ e.time }}</span>
                <span class="text-xs text-gray-700 leading-relaxed">{{ e.event }}</span>
              </div>
            </div>
          </RevealCard>
        </div>
      </div>
    </section>

    <!-- ===== 快速导航卡 ===== -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <SectionHeader tag="深入了解" title="探索各板块" desc="点击进入对应主题页面，了解更多关于大熊猫的详细信息。" />
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          <NuxtLink
            v-for="card in quickCards"
            :key="card.to"
            :to="card.to"
            class="group flex gap-4 items-start bg-white rounded-2xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all border border-transparent hover:border-panda-200"
          >
            <span class="text-3xl">{{ card.icon }}</span>
            <div>
              <h3 class="font-serif text-lg text-panda-dark group-hover:text-panda-700 transition-colors">{{ card.title }}</h3>
              <p class="text-sm text-gray-500 mt-1 leading-relaxed">{{ card.desc }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
usePandaSeo({
  title:       '大熊猫简介 — 中国最珍贵的国宝动物',
  description: '深入了解大熊猫的生活习性、栖息地、饮食、繁殖与保护现状。大熊猫是中国特有濒危动物，是全球生物多样性保护的标志性物种。',
  keywords:    ['大熊猫', 'giant panda', '濒危动物', '中国国宝', '竹子', '四川', '保护动物'],
  url:         '/',
})

defineOgImageComponent('NuxtSeo', {
  title: '大熊猫简介 — 中国最珍贵的国宝动物',
  description: '了解大熊猫的栖息地、饮食、繁殖和保护现状',
  theme: '#2e7d32',
})

const leaves = [
  { emoji: '🌿', style: 'top:15%;left:5%;animation:float 9s ease-in-out infinite' },
  { emoji: '🍃', style: 'top:60%;left:8%;animation:float 11s ease-in-out 2s infinite' },
  { emoji: '🌿', style: 'top:30%;right:5%;animation:float 8s ease-in-out 1s infinite' },
  { emoji: '🍀', style: 'top:70%;right:8%;animation:float 10s ease-in-out 3s infinite' },
  { emoji: '🌿', style: 'top:85%;left:40%;animation:float 12s ease-in-out 1.5s infinite' },
]

const stats = [
  { value: '1864+', label: '野生数量（只）' },
  { value: '99%',   label: '竹子占食物比' },
  { value: '67个',  label: '自然保护区数量' },
]

const taxonomy = [
  ['界', '动物界 Animalia'],
  ['门', '脊索动物门 Chordata'],
  ['纲', '哺乳纲 Mammalia'],
  ['目', '食肉目 Carnivora'],
  ['科', '熊科 Ursidae'],
  ['属', '大熊猫属 Ailuropoda'],
  ['种', '大熊猫 A. melanoleuca'],
]

const features = [
  { label: '体长', pct: 75, val: '120–180cm' },
  { label: '体重', pct: 60, val: '80–125kg'  },
  { label: '野生寿命', pct: 55, val: '14–20年' },
  { label: '圈养寿命', pct: 85, val: '可达30年' },
]

const evolution = [
  { time: '800万年前', event: '始熊猫出现于中国云南' },
  { time: '300万年前', event: '小种大熊猫在华南繁盛' },
  { time: '70万年前',  event: '武陵山大熊猫接近现代体型' },
  { time: '1万年前',   event: '冰期后分布范围急剧缩小' },
  { time: '今天',      event: '仅分布于川陕甘山地' },
]

const quickCards = [
  { to: '/habitat',      icon: '🏔️', title: '栖息地',   desc: '探索大熊猫的竹林家园，了解其海拔分布与保护区网络' },
  { to: '/diet',         icon: '🎋', title: '饮食习惯', desc: '揭秘大熊猫 99% 竹子食谱与神奇的伪拇指' },
  { to: '/lifecycle',    icon: '🐾', title: '生命周期', desc: '从 90 克的微小幼崽到独立个体的成长故事' },
  { to: '/conservation', icon: '🌿', title: '保护现状', desc: '从濒危到易危，了解保护奇迹背后的努力' },
  { to: '/gallery',      icon: '🖼️', title: '画廊',     desc: '用视觉感受大熊猫的黑白世界' },
  { to: '/facts',        icon: '💡', title: '趣味知识', desc: '9 个让你大吃一惊的大熊猫冷知识' },
]
</script>
