export default defineEventHandler(async () => {
  return prisma.section.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
    select: {
      id: true, slug: true, title: true, subtitle: true,
      seoTitle: true, seoDesc: true, ogImage: true, updatedAt: true,
    },
  })
})
