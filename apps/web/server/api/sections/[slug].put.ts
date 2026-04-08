import { verifyToken, extractToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  // 鉴权
  const token = extractToken(event)
  if (!token) throw createError({ statusCode: 401, statusMessage: '未授权' })
  const payload = await verifyToken(token).catch(() => {
    throw createError({ statusCode: 401, statusMessage: 'Token 无效' })
  })
  if (payload.role !== 'ADMIN' && payload.role !== 'EDITOR') {
    throw createError({ statusCode: 403, statusMessage: '权限不足' })
  }

  const slug = getRouterParam(event, 'slug')
  const body = await readBody(event)

  return prisma.section.update({
    where: { slug: slug! },
    data: {
      title:     body.title,
      subtitle:  body.subtitle,
      content:   body.content,
      seoTitle:  body.seoTitle,
      seoDesc:   body.seoDesc,
      ogImage:   body.ogImage,
      published: body.published,
      order:     body.order,
    },
  })
})
