export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page     = Number(query.page)     || 1
  const pageSize = Number(query.pageSize) || 10
  const category = query.category as string | undefined
  const tag      = query.tag      as string | undefined
  const keyword  = query.keyword  as string | undefined
  const all      = query.all === 'true' // 后台管理用，获取全部（含草稿）

  const where: any = {}
  if (!all) where.published = true
  if (category) where.category = category
  if (tag) where.tags = { has: tag }
  if (keyword) where.OR = [
    { title:   { contains: keyword } },
    { excerpt: { contains: keyword } },
  ]

  const [total, items] = await Promise.all([
    prisma.article.count({ where }),
    prisma.article.findMany({
      where,
      skip:    (page - 1) * pageSize,
      take:    pageSize,
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true, title: true, slug: true, excerpt: true,
        category: true, tags: true, coverImage: true,
        published: true, publishedAt: true, views: true,
        author: { select: { name: true } },
        updatedAt: true,
      },
    }),
  ])

  return { total, page, pageSize, items }
})
