/**
 * 数据库种子数据
 * 运行: pnpm db:seed
 */
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 开始导入种子数据...')

  // ===== 创建管理员账号 =====
  const hashedPassword = await bcrypt.hash('admin123456', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@panda-site.com' },
    update: {},
    create: {
      email: 'admin@panda-site.com',
      password: hashedPassword,
      name: '超级管理员',
      role: 'ADMIN',
    },
  })
  console.log('✅ 创建管理员:', admin.email)

  // ===== SEO 默认配置 =====
  await prisma.seoConfig.upsert({
    where: { id: '000000000000000000000001' },
    update: {},
    create: {
      id: '000000000000000000000001',
      siteName: '大熊猫 · 中国国宝',
      defaultTitle: '大熊猫简介 — 中国最珍贵的国宝动物',
      defaultDesc: '深入了解大熊猫的生活习性、栖息地、饮食、繁殖与保护现状。大熊猫是中国特有濒危动物，是全球生物多样性保护的标志性物种。',
      keywords: ['大熊猫', 'giant panda', '濒危动物', '中国国宝', '竹林', '四川', '野生动物保护'],
      twitterCard: 'summary_large_image',
    },
  })
  console.log('✅ SEO 配置初始化完成')

  // ===== 板块内容种子 =====
  const sections = [
    {
      slug: 'overview',
      title: '物种概览',
      subtitle: '认识大熊猫这一古老而神秘的物种',
      order: 1,
      seoTitle: '大熊猫物种概览 — 分类学与形态特征',
      seoDesc: '了解大熊猫的分类学地位、体型特征、演化历史，从科学角度认识这一珍贵物种。',
      content: {
        blocks: [
          {
            type: 'text',
            data: '大熊猫（Ailuropoda melanoleuca），属哺乳纲食肉目熊科，是中国特有的珍稀濒危动物。成年体重 80–125 kg，体长 120–180 cm，以标志性的黑白毛色著称。',
          },
          {
            type: 'taxonomy',
            data: {
              kingdom: '动物界 Animalia',
              phylum: '脊索动物门 Chordata',
              class: '哺乳纲 Mammalia',
              order: '食肉目 Carnivora',
              family: '熊科 Ursidae',
              genus: '大熊猫属 Ailuropoda',
              species: '大熊猫 A. melanoleuca',
            },
          },
        ],
      },
    },
    {
      slug: 'habitat',
      title: '栖息地',
      subtitle: '竹海深处的温柔家园',
      order: 2,
      seoTitle: '大熊猫栖息地 — 四川秦岭竹林山地',
      seoDesc: '大熊猫栖息于中国四川、陕西、甘肃的高山竹林，海拔 1200–3400 米，了解其生存环境与保护区分布。',
      content: {
        blocks: [
          {
            type: 'text',
            data: '大熊猫生活在中国西南部温凉潮湿的山地竹林，海拔通常在 1200–3400 米之间，分布于秦岭、岷山等六大山系。',
          },
        ],
      },
    },
    {
      slug: 'diet',
      title: '饮食习惯',
      subtitle: '99% 竹子的独特食谱',
      order: 3,
      seoTitle: '大熊猫饮食 — 为什么大熊猫只吃竹子',
      seoDesc: '探索大熊猫独特的饮食习惯：每天进食 12–38 公斤竹子、神奇的假拇指、低效的竹子消化系统。',
      content: {
        blocks: [
          {
            type: 'text',
            data: '大熊猫食谱中 99% 是竹子，每天进食 12–38 公斤。尽管是食肉目动物，却演化出了高度特化的植食习性。',
          },
        ],
      },
    },
    {
      slug: 'lifecycle',
      title: '繁殖与生命周期',
      subtitle: '脆弱而珍贵的生命旅程',
      order: 4,
      seoTitle: '大熊猫繁殖 — 生命周期与延迟着床',
      seoDesc: '了解大熊猫独特的繁殖机制：每年仅 24–72 小时发情窗口、延迟着床现象、仅 90 克的微小新生儿。',
      content: {
        blocks: [
          {
            type: 'text',
            data: '大熊猫繁殖率极低，雌性每年仅有约 24–72 小时可受孕，新生幼崽体重仅 90–180 克，约为母亲体重的 1/900。',
          },
        ],
      },
    },
    {
      slug: 'conservation',
      title: '保护现状',
      subtitle: '从濒危到易危的保护奇迹',
      order: 5,
      seoTitle: '大熊猫保护现状 — IUCN 易危与中国保护行动',
      seoDesc: '大熊猫保护成果：2016年从濒危降级为易危，野生数量恢复至1864只，了解中国保护区体系与人工繁育项目。',
      content: {
        blocks: [
          {
            type: 'text',
            data: '2016年，大熊猫在 IUCN 红色名录中从「濒危」降为「易危」，野生种群恢复至 1864 只，这是几十年保护工作的重大成果。',
          },
        ],
      },
    },
    {
      slug: 'facts',
      title: '趣味知识',
      subtitle: '你不知道的大熊猫冷知识',
      order: 6,
      seoTitle: '大熊猫趣味冷知识 — 9 个你不知道的秘密',
      seoDesc: '大熊猫每天排便 40 次？不冬眠？WWF Logo 的灵感？揭开这些鲜为人知的大熊猫趣味知识。',
      content: {
        blocks: [
          {
            type: 'fact',
            data: { number: '01', title: '每天排便多达 40 次', body: '由于竹子难以消化，大熊猫每天需要排便 40 次左右，粪便中有大量未消化的竹纤维。' },
          },
          {
            type: 'fact',
            data: { number: '02', title: '不冬眠的熊', body: '与其他熊类不同，大熊猫不冬眠，因为竹子营养不足以积累冬眠所需脂肪。' },
          },
          {
            type: 'fact',
            data: { number: '03', title: 'WWF 的灵感来源', body: '1961 年 WWF 以大熊猫「姬姬」为原型设计了标志性的黑白 Logo。' },
          },
        ],
      },
    },
  ]

  for (const section of sections) {
    await prisma.section.upsert({
      where: { slug: section.slug },
      update: {},
      create: section,
    })
    console.log(`✅ 板块: ${section.title}`)
  }

  // ===== 示例文章 =====
  await prisma.article.upsert({
    where: { slug: 'giant-panda-conservation-2024' },
    update: {},
    create: {
      title: '2024 年大熊猫保护成果报告',
      slug: 'giant-panda-conservation-2024',
      excerpt: '详述近年来大熊猫保护工作的新进展，包括大熊猫国家公园建设、野化放归项目成果及科研新发现。',
      category: 'conservation',
      tags: ['保护', '国家公园', '野化放归', '种群恢复'],
      published: true,
      publishedAt: new Date(),
      seoTitle: '2024大熊猫保护报告 — 大熊猫国家公园建设新进展',
      seoDesc: '大熊猫国家公园成立以来的保护成果：种群数量变化、栖息地连通廊道建设、野化放归成功案例。',
      content: {
        blocks: [
          {
            type: 'paragraph',
            data: { text: '2021年正式挂牌的大熊猫国家公园，面积约 2.7 万平方公里，横跨四川、陕西、甘肃三省。' },
          },
          {
            type: 'paragraph',
            data: { text: '公园建设有效连接了此前破碎化的 13 个大熊猫局域种群，为基因交流创造了条件。' },
          },
        ],
      },
      authorId: admin.id,
    },
  })
  console.log('✅ 示例文章创建完成')

  console.log('\n🎉 种子数据导入完成!')
  console.log('   管理员邮箱: admin@panda-site.com')
  console.log('   管理员密码: admin123456')
}

main()
  .catch((e) => {
    console.error('❌ 种子数据导入失败:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
