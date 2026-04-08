import { verifyToken, extractToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const token = extractToken(event)
  if (!token) throw createError({ statusCode: 401, statusMessage: '未授权' })
  const payload = await verifyToken(token).catch(() => {
    throw createError({ statusCode: 401, statusMessage: 'Token 无效' })
  })
  if (payload.role !== 'ADMIN') {
    throw createError({ statusCode: 403, statusMessage: '仅管理员可修改 SEO 配置' })
  }

  const body = await readBody(event)
  const existing = await prisma.seoConfig.findFirst()

  if (existing) {
    return prisma.seoConfig.update({ where: { id: existing.id }, data: body })
  } else {
    return prisma.seoConfig.create({ data: body })
  }
})
