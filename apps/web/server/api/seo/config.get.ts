export default defineEventHandler(async () => {
  let config = await prisma.seoConfig.findFirst()
  if (!config) {
    config = await prisma.seoConfig.create({
      data: {
        siteName:     '大熊猫 · 中国国宝',
        defaultTitle: '大熊猫简介 — 中国最珍贵的国宝动物',
        defaultDesc:  '深入了解大熊猫的生活习性、栖息地、饮食、繁殖与保护现状。',
      },
    })
  }
  return config
})
