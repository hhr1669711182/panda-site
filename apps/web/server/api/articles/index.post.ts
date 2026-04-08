import { verifyToken, extractToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const token = extractToken(event)
  if (!token) throw createError({ statusCode: 401, statusMessage: '未授权' })
  const payload = await verifyToken(token).catch(() => {
    throw createError({ statusCode: 401, statusMessage: 'Token 无效' })
  })

  const body = await readBody(event)
  if (!body.title || !body.slug) {
    throw createError({ statusCode: 400, statusMessage: '标题和 slug 必填' })
  }

  return prisma.article.create({
    data: {
      title:       body.title,
      slug:        body.slug,
      excerpt:     body.excerpt,
      content:     body.content || {},
      category:    body.category || 'general',
      tags:        body.tags    || [],
      coverImage:  body.coverImage,
      seoTitle:    body.seoTitle,
      seoDesc:     body.seoDesc,
      published:   body.published || false,
      publishedAt: body.published ? new Date() : null,
      authorId:    payload.sub,
    },
  })
})
