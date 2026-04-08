/**
 * 访问统计中间件 — 记录每次页面请求
 * 仅统计非 API、非静态资源的请求
 */
export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  const path = url.pathname

  // 跳过 API 请求、静态资源、_nuxt 内部路径
  if (
    path.startsWith('/api/') ||
    path.startsWith('/_nuxt/') ||
    path.startsWith('/__nuxt/') ||
    path.match(/\.(ico|png|jpg|jpeg|svg|css|js|woff|woff2|ttf|map)$/)
  ) {
    return
  }

  // 异步写入，不阻塞响应
  setImmediate(async () => {
    try {
      await prisma.pageView.create({
        data: {
          path,
          ua:      getRequestHeader(event, 'user-agent') || null,
          ip:      getRequestHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim() || null,
          referer: getRequestHeader(event, 'referer') || null,
        },
      })
    } catch {
      // 统计失败不影响正常请求
    }
  })
})
