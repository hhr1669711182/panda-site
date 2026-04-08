import { verifyToken, extractToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const token = extractToken(event)
  if (!token) throw createError({ statusCode: 401, statusMessage: '未授权' })
  await verifyToken(token).catch(() => {
    throw createError({ statusCode: 401, statusMessage: 'Token 无效' })
  })

  const slug = getRouterParam(event, 'slug')
  const body = await readBody(event)

  const existing = await prisma.article.findUnique({ where: { slug: slug! } })
  if (!existing) throw createError({ statusCode: 404, statusMessage: '文章不存在' })

  return prisma.article.update({
    where: { slug: slug! },
    data: {
      title:       body.title,
      slug:        body.slug,
      excerpt:     body.excerpt,
      content:     body.content,
      category:    body.category,
      tags:        body.tags,
      coverImage:  body.coverImage,
      seoTitle:    body.seoTitle,
      seoDesc:     body.seoDesc,
      published:   body.published,
      publishedAt: body.published && !existing.publishedAt ? new Date() : existing.publishedAt,
    },
  })
})
