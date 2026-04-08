import { PrismaClient } from '@prisma/client'

// 全局单例，防止开发时热重载创建多个连接
declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined
}

export const prisma =
  global.__prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') {
  global.__prisma = prisma
}

export * from '@prisma/client'
