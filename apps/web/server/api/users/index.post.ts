import { verifyToken, extractToken } from '~/server/utils/jwt'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const token = extractToken(event)
  if (!token) throw createError({ statusCode: 401, statusMessage: '未授权' })
  const payload = await verifyToken(token).catch(() => {
    throw createError({ statusCode: 401, statusMessage: 'Token 无效' })
  })
  if (payload.role !== 'ADMIN') {
    throw createError({ statusCode: 403, statusMessage: '仅管理员可创建用户' })
  }

  const body = await readBody(event)
  if (!body.email || !body.password || !body.name) {
    throw createError({ statusCode: 400, statusMessage: '邮箱、密码、姓名必填' })
  }

  const exists = await prisma.user.findUnique({ where: { email: body.email } })
  if (exists) throw createError({ statusCode: 409, statusMessage: '邮箱已存在' })

  const hashed = await bcrypt.hash(body.password, 10)
  return prisma.user.create({
    data: {
      email:    body.email,
      password: hashed,
      name:     body.name,
      role:     body.role || 'EDITOR',
    },
    select: { id: true, email: true, name: true, role: true, active: true, createdAt: true },
  })
})
