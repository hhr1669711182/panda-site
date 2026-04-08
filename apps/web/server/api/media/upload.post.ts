import { verifyToken, extractToken } from '~/server/utils/jwt'
import { writeFile, mkdir } from 'node:fs/promises'
import { join, extname } from 'node:path'
import { randomUUID } from 'node:crypto'

export default defineEventHandler(async (event) => {
  const token = extractToken(event)
  if (!token) throw createError({ statusCode: 401, statusMessage: '未授权' })
  await verifyToken(token).catch(() => {
    throw createError({ statusCode: 401, statusMessage: 'Token 无效' })
  })

  const config = useRuntimeConfig()
  const formData = await readMultipartFormData(event)
  if (!formData?.length) throw createError({ statusCode: 400, statusMessage: '未找到上传文件' })

  const file = formData[0]
  if (!file.filename || !file.type) throw createError({ statusCode: 400, statusMessage: '文件格式无效' })

  // 只允许图片
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
  if (!allowedTypes.includes(file.type)) {
    throw createError({ statusCode: 400, statusMessage: '仅支持图片格式' })
  }

  const ext = extname(file.filename)
  const filename = `${randomUUID()}${ext}`
  const uploadDir = join(process.cwd(), 'public/uploads')
  await mkdir(uploadDir, { recursive: true })
  await writeFile(join(uploadDir, filename), file.data)

  const url = `/uploads/${filename}`
  const media = await prisma.media.create({
    data: {
      filename: file.filename,
      url,
      mimeType: file.type,
      size:     file.data.length,
      alt:      formData.find(f => f.name === 'alt')?.data?.toString() || '',
    },
  })

  return media
})
