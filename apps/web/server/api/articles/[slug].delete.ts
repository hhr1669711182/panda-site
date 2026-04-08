import { verifyToken, extractToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const token = extractToken(event)
  if (!token) throw createError({ statusCode: 401, statusMessage: '未授权' })
  const payload = await verifyToken(token).catch(() => {
    throw createError({ statusCode: 401, statusMessage: 'Token 无效' })
  })
  if (payload.role !== 'ADMIN') {
    throw createError({ statusCode: 403, statusMessage: '仅管理员可删除文章' })
  }

  const slug = getRouterParam(event, 'slug')
  await prisma.article.delete({ where: { slug: slug! } })
  return { success: true }
})
