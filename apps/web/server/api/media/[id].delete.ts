import { verifyToken, extractToken } from '~/server/utils/jwt'
import { unlink } from 'node:fs/promises'
import { join } from 'node:path'

export default defineEventHandler(async (event) => {
  const token = extractToken(event)
  if (!token) throw createError({ statusCode: 401, statusMessage: '未授权' })
  const payload = await verifyToken(token).catch(() => {
    throw createError({ statusCode: 401, statusMessage: 'Token 无效' })
  })
  if (payload.role !== 'ADMIN') {
    throw createError({ statusCode: 403, statusMessage: '仅管理员可删除媒体' })
  }

  const id = getRouterParam(event, 'id')
  const media = await prisma.media.findUnique({ where: { id } })
  if (!media) throw createError({ statusCode: 404, statusMessage: '文件不存在' })

  // 删除物理文件
  const filePath = join(process.cwd(), 'public', media.url)
  await unlink(filePath).catch(() => {})
  await prisma.media.delete({ where: { id } })

  return { success: true }
})
