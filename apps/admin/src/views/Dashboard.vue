<template>
  <div>
    <h2 class="page-title">📊 数据看板</h2>

    <el-row :gutter="16" class="mb-5">
      <el-col :span="6" v-for="card in statCards" :key="card.label">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-icon" :style="`background:${card.color}22`">{{ card.icon }}</div>
          <div class="stat-body">
            <div class="stat-val">{{ card.val ?? '—' }}</div>
            <div class="stat-label">{{ card.label }}</div>
          </div>
          <div class="stat-badge" :style="`color:${card.color}`">
            <span v-if="card.growth">{{ card.growth > 0 ? '+' : '' }}{{ card.growth }}%</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="16">
      <!-- 近期访问趋势 -->
      <el-col :span="16">
        <el-card shadow="hover">
          <template #header><span class="card-title">近 7 天 PV 趋势</span></template>
          <div ref="chartRef" style="height:280px" />
        </el-card>
      </el-col>

      <!-- 热门页面 -->
      <el-col :span="8">
        <el-card shadow="hover" style="height:100%">
          <template #header><span class="card-title">热门页面 TOP 10</span></template>
          <div v-if="stats" class="top-pages">
            <div v-for="(p, i) in stats.topPages" :key="p.path" class="top-page-item">
              <span class="rank" :class="`rank-${i+1}`">{{ i + 1 }}</span>
              <span class="path">{{ p.path }}</span>
              <span class="count">{{ p.count }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import request from '@/utils/request'
import dayjs from 'dayjs'

const stats     = ref<any>(null)
const chartRef  = ref<HTMLElement>()
let   chart: any = null

onMounted(async () => {
  try {
    stats.value = await request.get('/stats/overview')
    nextTick(() => initChart())
  } catch {}
})

const statCards = computed(() => [
  { icon: '👁', label: '今日 PV',     val: stats.value?.todayViews,  color: '#2e7d32', growth: null },
  { icon: '📅', label: '本月 PV',     val: stats.value?.monthViews,  color: '#1565c0', growth: stats.value?.growthRate },
  { icon: '📰', label: '已发布文章',  val: stats.value?.publishedArticles, color: '#e65100', growth: null },
  { icon: '👤', label: '管理员账号',  val: stats.value?.totalUsers,  color: '#880e4f', growth: null },
])

function initChart() {
  if (!chartRef.value || !stats.value?.recentViews) return
  chart = echarts.init(chartRef.value)

  // 生成近 7 天日期标签
  const labels = Array.from({ length: 7 }, (_, i) =>
    dayjs().subtract(6 - i, 'day').format('MM-DD')
  )
  const values = labels.map(() => Math.floor(Math.random() * 200 + 50)) // mock data

  chart.setOption({
    tooltip: { trigger: 'axis' },
    xAxis:   { type: 'category', data: labels },
    yAxis:   { type: 'value' },
    series: [{
      data: values,
      type: 'line',
      smooth: true,
      areaStyle: { color: { type: 'linear', x:0, y:0, x2:0, y2:1, colorStops: [
        { offset: 0, color: 'rgba(46,125,50,.35)' },
        { offset: 1, color: 'rgba(46,125,50,.02)' },
      ]}},
      lineStyle: { color: '#2e7d32' },
      itemStyle:  { color: '#2e7d32' },
    }],
  })
}

onUnmounted(() => chart?.dispose())
</script>

<style scoped>
.page-title { font-size: 20px; font-weight: bold; color: #1b5e20; margin-bottom: 20px; }
.card-title { font-weight: 600; color: #333; }

.stat-card  { display: flex; align-items: center; gap: 14px; padding: 4px 0; }
.stat-icon  { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
.stat-body  { flex: 1; }
.stat-val   { font-size: 26px; font-weight: bold; color: #222; line-height: 1.2; }
.stat-label { font-size: 12px; color: #999; margin-top: 2px; }
.stat-badge { font-size: 12px; font-weight: 600; }

.top-pages { display: flex; flex-direction: column; gap: 8px; max-height: 240px; overflow-y: auto; }
.top-page-item { display: flex; align-items: center; gap: 8px; font-size: 12px; }
.rank { width: 20px; height: 20px; border-radius: 4px; background: #e8f5e9; color: #2e7d32; font-weight: bold; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 11px; }
.rank-1 { background: #ff8f00; color: #fff; }
.rank-2 { background: #9e9e9e; color: #fff; }
.rank-3 { background: #a1887f; color: #fff; }
.path  { flex: 1; color: #555; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.count { color: #2e7d32; font-weight: 600; flex-shrink: 0; }
</style>
