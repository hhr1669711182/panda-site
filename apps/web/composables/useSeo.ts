/**
 * SEO Composable
 * 封装 useHead / useSeoMeta / useSchemaOrg 统一调用
 */

interface SeoOptions {
  title:       string
  description: string
  image?:      string
  url?:        string
  type?:       'website' | 'article'
  publishedAt?: string
  author?:     string
  keywords?:   string[]
}

export function usePandaSeo(opts: SeoOptions) {
  const config = useRuntimeConfig()
  const siteUrl  = config.public.siteUrl  as string
  const siteName = config.public.siteName as string

  const fullTitle = opts.title.includes(siteName) ? opts.title : `${opts.title} — ${siteName}`
  const ogImage   = opts.image || `${siteUrl}/og-default.png`
  const pageUrl   = opts.url   ? `${siteUrl}${opts.url}` : siteUrl

  useSeoMeta({
    title:               fullTitle,
    description:         opts.description,
    keywords:            opts.keywords?.join(','),
    ogTitle:             fullTitle,
    ogDescription:       opts.description,
    ogImage,
    ogUrl:               pageUrl,
    ogType:              opts.type || 'website',
    ogSiteName:          siteName,
    ogLocale:            'zh_CN',
    twitterCard:         'summary_large_image',
    twitterTitle:        fullTitle,
    twitterDescription:  opts.description,
    twitterImage:        ogImage,
    articlePublishedTime: opts.publishedAt,
    articleAuthor:       opts.author,
  })

  useHead({
    link: [{ rel: 'canonical', href: pageUrl }],
  })
}
