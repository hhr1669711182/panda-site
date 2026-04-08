<template>
  <div class="pt-16">
    <!-- 页头 -->
    <div class="bg-gradient-to-br from-panda-dark to-panda-700 text-white py-20 text-center">
      <span class="text-5xl block mb-4">🏔️</span>
      <h1 class="font-serif text-5xl font-bold mb-3">栖息地</h1>
      <p class="opacity-80 text-lg">竹海深处的温柔家园</p>
    </div>

    <div class="py-20 bg-white">
      <div class="container mx-auto px-4 max-w-5xl">
        <div class="grid md:grid-cols-2 gap-8">
          <RevealCard v-for="card in habitatCards" :key="card.icon">
            <div class="flex gap-4 items-start">
              <span class="text-3xl">{{ card.icon }}</span>
              <div>
                <h3 class="font-serif text-lg text-panda-dark mb-2">{{ card.title }}</h3>
                <p class="text-sm text-gray-600 leading-relaxed">{{ card.body }}</p>
              </div>
            </div>
          </RevealCard>
        </div>

        <!-- 分布区域 -->
        <div class="mt-16">
          <h2 class="font-serif text-2xl text-panda-dark text-center mb-8">主要自然保护区</h2>
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div v-for="reserve in reserves" :key="reserve.name"
              class="bg-panda-50 rounded-xl p-4 text-center"
            >
              <div class="text-2xl mb-2">{{ reserve.icon }}</div>
              <div class="font-semibold text-panda-dark text-sm">{{ reserve.name }}</div>
              <div class="text-xs text-gray-500 mt-1">{{ reserve.province }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
usePandaSeo({
  title:       '大熊猫栖息地 — 四川秦岭竹林山地',
  description: '大熊猫栖息于中国四川、陕西、甘肃的高山竹林，海拔 1200–3400 米，了解其生存环境与保护区分布。',
  url:         '/habitat',
  keywords:    ['大熊猫栖息地', '四川竹林', '秦岭', '岷山', '保护区', '大熊猫国家公园'],
})

const habitatCards = [
  { icon: '🌡️', title: '气候条件',   body: '年均温 2–16°C，年降雨量 1000–1800 mm，常年多雾，空气湿度 80% 以上，是大熊猫理想的生存环境。' },
  { icon: '🏔️', title: '地形特征',   body: '主要栖息于秦岭、岷山、邛崃山、大相岭、小相岭及凉山六大山系，山势陡峻，沟谷纵横，海拔 1200–3400 米。' },
  { icon: '🎋', title: '植被环境',   body: '以箭竹、冷箭竹、巴山木竹等竹类为主，混生冷杉、云杉等常绿针叶林，林下阴湿。' },
  { icon: '🏠', title: '领地范围',   body: '雄性个体领地约 4–7 km²，雌性约 4–5 km²，通过气味标记（腺体分泌物）界定边界。' },
  { icon: '❄️', title: '季节性迁移', body: '夏季在高海拔（2600–3400m）凉爽区域活动；冬季下移至 1400–2000m 低海拔越冬，不冬眠。' },
  { icon: '⚠️', title: '栖息地威胁', body: '栖息地碎片化是最大威胁——人类农业扩张、道路修建将原本连续的森林分割成孤立小块，使种群隔离。' },
]

const reserves = [
  { icon: '🏞️', name: '卧龙国家级自然保护区', province: '四川省' },
  { icon: '🏞️', name: '唐家河国家级自然保护区', province: '四川省' },
  { icon: '🏞️', name: '佛坪国家级自然保护区',  province: '陕西省' },
  { icon: '🏞️', name: '白水江国家级自然保护区', province: '甘肃省' },
  { icon: '🏞️', name: '王朗国家级自然保护区',   province: '四川省' },
  { icon: '🏞️', name: '蜂桶寨自然保护区',       province: '四川省' },
  { icon: '🏞️', name: '陕西长青国家级保护区',   province: '陕西省' },
  { icon: '🌏', name: '大熊猫国家公园（2021）',  province: '川陕甘' },
]
</script>
