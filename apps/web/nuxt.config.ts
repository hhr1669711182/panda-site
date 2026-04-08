// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  // ===== 模块 =====
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-schema-org',
    'nuxt-simple-sitemap',
    '@nuxt/image',
  ],

  // ===== 运行时配置 =====
  runtimeConfig: {
    // 服务端私有
    jwtSecret: process.env.JWT_SECRET || 'default-secret-change-in-production',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
    databaseUrl: process.env.DATABASE_URL || '',
    uploadDir: process.env.UPLOAD_DIR || './public/uploads',
    adminOrigin: process.env.ADMIN_ORIGIN || 'http://localhost:5173',
    // 客户端公开
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      siteName: '大熊猫 · 中国国宝',
    },
  },

  // ===== SSR =====
  ssr: true,

  // ===== 头部默认 Meta =====
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: { lang: 'zh-CN' },
      meta: [
        { name: 'theme-color', content: '#2e7d32' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&family=Noto+Sans+SC:wght@300;400;500;700&display=swap',
        },
      ],
    },
  },

  // ===== Schema.org / SEO =====
  schemaOrg: {
    identity: {
      type: 'Organization',
      name: '大熊猫保护知识网',
      url: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      logo: '/logo.png',
    },
  },

  // ===== Sitemap =====
  sitemap: {
    siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    strictNuxtContentPaths: false,
    // 动态路由（文章）
    sources: ['/api/sitemap-urls'],
  },

  // ===== Tailwind =====
  tailwindcss: {
    configPath: '~/tailwind.config.ts',
  },

  // ===== NITRO（服务端） =====
  nitro: {
    experimental: {
      wasm: true,
    },
  },

  // ===== 跨域处理 =====
  routeRules: {
    '/api/**': {
      cors: true,
      headers: {
        'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
      },
    },
  },
})
