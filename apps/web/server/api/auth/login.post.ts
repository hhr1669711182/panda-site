import bcrypt from 'bcryptjs'
import { signToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: '邮箱和密码不能为空' })
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !user.active) {
    throw createError({ statusCode: 401, statusMessage: '邮箱或密码错误' })
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    throw createError({ statusCode: 401, statusMessage: '邮箱或密码错误' })
  }

  const token = await signToken({
    sub:   user.id,
    email: user.email,
    role:  user.role,
    name:  user.name,
  })

  return {
    token,
    user: {
      id:    user.id,
      email: user.email,
      name:  user.name,
      role:  user.role,
    },
  }
})
