export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) throw createError({ statusCode: 400, statusMessage: 'slug 不能为空' })

  const article = await prisma.article.findUnique({
    where: { slug },
    include: { author: { select: { name: true, avatar: true } } },
  })
  if (!article) throw createError({ statusCode: 404, statusMessage: '文章不存在' })

  // 异步增加浏览量
  setImmediate(() => {
    prisma.article.update({ where: { slug }, data: { views: { increment: 1 } } }).catch(() => {})
  })

  return article
})
