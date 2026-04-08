import { verifyToken, extractToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const token = extractToken(event)
  if (!token) throw createError({ statusCode: 401, statusMessage: '未登录' })

  try {
    const payload = await verifyToken(token)
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, name: true, role: true, avatar: true },
    })
    if (!user) throw createError({ statusCode: 401, statusMessage: '用户不存在' })
    return user
  } catch {
    throw createError({ statusCode: 401, statusMessage: 'Token 无效或已过期' })
  }
})
