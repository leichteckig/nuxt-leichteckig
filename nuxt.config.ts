export default defineNuxtConfig({
  compatibilityDate: '2026-07-17',

  ssr: true,

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      failOnError: false
    }
  },

  site: {
    url: 'https://www.ramona.codes'
  },

  app: {
    head: {
      title: 'Ramona Schwering\'s Blog',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'color-scheme', content: 'light dark' },
        {
          name: 'description',
          content: 'Frontend Developer & Developer Relations Engineer @mittwald. International Speaker. Cypress Ambassador. OpenSource Lover.'
        },
        { property: 'og:title', content: 'Ramona Schwering' },
        {
          property: 'og:description',
          content: 'Frontend Developer & Developer Relations Engineer @mittwald. International Speaker. Cypress Ambassador. OpenSource Lover'
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: 'https://www.ramona.codes/ogimage.png' },
        { name: 'twitter:site', content: '@nuxt_js' },
        { name: 'twitter:url', content: 'https://www.ramona.codes' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'google-site-verification', content: 'ySo2miRK4qu8z_acSgFSPF7-HkA4TqcpydymQASt5gw' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'me', href: 'https://hachyderm.io/@leichteckig' }
      ]
    }
  },

  css: [
    '~/assets/main.css'
  ],

  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    'nuxt-svgo'
  ],

  i18n: {
    locales: [
      {
        code: 'en',
        language: 'en-US',
        name: 'EN',
        file: 'en-US.js'
      },
      {
        code: 'de',
        language: 'de-DE',
        name: 'DE',
        file: 'de-DE.js'
      }
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    trailingSlash: true
  },

  colorMode: {
    // main.css and the Cypress tests expect `light-mode` / `dark-mode` classes
    classSuffix: '-mode'
  },

  robots: {
    disallow: ['*/smashing-', '/imprint', '/privacy']
  },

  googleFonts: {
    // Roboto is intentionally not downloaded: --font-family-default is a
    // system font stack that only lists it as a late fallback.
    download: true,
    subsets: 'latin',
    display: 'swap',
    preload: true,
    families: {
      'Amatic+SC': [400, 700]
    }
  },

  svgo: {
    // keep `import Icon from '~/assets/icons/foo.svg'` returning a component
    defaultImport: 'component'
  }
})
