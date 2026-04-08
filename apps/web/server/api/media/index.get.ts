import { verifyToken, extractToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const token = extractToken(event)
  if (!token) throw createError({ statusCode: 401, statusMessage: '未授权' })
  await verifyToken(token).catch(() => {
    throw createError({ statusCode: 401, statusMessage: 'Token 无效' })
  })

  const query = getQuery(event)
  const page     = Number(query.page)     || 1
  const pageSize = Number(query.pageSize) || 20

  const [total, items] = await Promise.all([
    prisma.media.count(),
    prisma.media.findMany({
      skip:    (page - 1) * pageSize,
      take:    pageSize,
      orderBy: { createdAt: 'desc' },
    }),
  ])

  return { total, page, pageSize, items }
})
