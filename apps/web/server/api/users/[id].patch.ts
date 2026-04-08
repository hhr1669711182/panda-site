import { verifyToken, extractToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const token = extractToken(event)
  if (!token) throw createError({ statusCode: 401, statusMessage: '未授权' })
  const payload = await verifyToken(token).catch(() => {
    throw createError({ statusCode: 401, statusMessage: 'Token 无效' })
  })
  if (payload.role !== 'ADMIN') {
    throw createError({ statusCode: 403, statusMessage: '权限不足' })
  }

  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  return prisma.user.update({
    where: { id },
    data: {
      role:   body.role,
      active: body.active,
      name:   body.name,
    },
    select: { id: true, email: true, name: true, role: true, active: true },
  })
})
