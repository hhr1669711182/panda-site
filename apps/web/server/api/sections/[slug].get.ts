export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) throw createError({ statusCode: 400, statusMessage: 'slug 不能为空' })

  const section = await prisma.section.findUnique({ where: { slug } })
  if (!section) throw createError({ statusCode: 404, statusMessage: '板块不存在' })

  return section
})
