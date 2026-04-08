/**
 * 为 nuxt-simple-sitemap 提供动态 URL
 */
export default defineEventHandler(async () => {
  const articles = await prisma.article.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  })

  return articles.map(a => ({
    loc:        `/articles/${a.slug}`,
    lastmod:    a.updatedAt.toISOString(),
    changefreq: 'weekly',
    priority:   0.8,
  }))
})
