import { verifyToken, extractToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const token = extractToken(event)
  if (!token) throw createError({ statusCode: 401, statusMessage: '未授权' })
  await verifyToken(token).catch(() => {
    throw createError({ statusCode: 401, statusMessage: 'Token 无效' })
  })

  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0)

  const [
    totalViews,
    todayViews,
    monthViews,
    lastMonthViews,
    totalArticles,
    publishedArticles,
    totalUsers,
  ] = await Promise.all([
    prisma.pageView.count(),
    prisma.pageView.count({ where: { createdAt: { gte: today } } }),
    prisma.pageView.count({ where: { createdAt: { gte: thisMonth } } }),
    prisma.pageView.count({ where: { createdAt: { gte: lastMonth, lte: lastMonthEnd } } }),
    prisma.article.count(),
    prisma.article.count({ where: { published: true } }),
    prisma.user.count({ where: { active: true } }),
  ])

  // 近 7 天每日 PV
  const sevenDaysAgo = new Date(today)
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6)
  const recentViews = await prisma.pageView.groupBy({
    by: ['createdAt'],
    _count: { id: true },
    where: { createdAt: { gte: sevenDaysAgo } },
    orderBy: { createdAt: 'asc' },
  })

  // Top 10 热门页面
  const topPages = await prisma.pageView.groupBy({
    by: ['path'],
    _count: { id: true },
    orderBy: { _count: { id: 'desc' } },
    take: 10,
  })

  return {
    totalViews,
    todayViews,
    monthViews,
    lastMonthViews,
    growthRate: lastMonthViews > 0
      ? Math.round(((monthViews - lastMonthViews) / lastMonthViews) * 100)
      : 100,
    totalArticles,
    publishedArticles,
    totalUsers,
    recentViews,
    topPages: topPages.map(p => ({ path: p.path, count: p._count.id })),
  }
})
