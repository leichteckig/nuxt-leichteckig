export default defineNuxtConfig({
  compatibilityDate: '2026-07-17',

  ssr: true,

  features: {
    // Inline all styles into the HTML: the CSS is tiny (a few KB) and the
    // separate per-component files each cost a render-blocking round-trip
    inlineStyles: true
  },

  vite: {
    build: {
      // One CSS bundle instead of per-chunk files, so inlineStyles catches
      // everything and no render-blocking stylesheet links remain
      cssCodeSplit: false
    }
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      failOnError: false
    }
  },

  site: {
    url: 'https://www.ramona.codes',
    name: 'Ramona Schwering',
    description: 'Frontend Developer & Developer Relations Engineer @mittwald. International Speaker. Cypress Ambassador. OpenSource Lover.'
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
    // Umbrella: pulls in sitemap, robots, schema-org, og-image,
    // link-checker and seo-utils (replaces the standalone sitemap/robots)
    '@nuxtjs/seo',
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
    // Republished/syndicated articles (canonical points to the original) are
    // kept out of the index via their slug prefix: smashing-, auth0-, devto-.
    disallow: ['*/smashing-', '*/auth0-', '*/devto-', '/imprint', '/privacy']
  },

  schemaOrg: {
    // Site-wide identity: emits a Person node linked into every page's graph,
    // so search engines and AI answer engines resolve the author consistently.
    identity: {
      type: 'Person',
      name: 'Ramona Schwering',
      description: 'Frontend Developer & Developer Relations Engineer @mittwald. International Speaker. Cypress Ambassador. OpenSource Lover.',
      image: 'https://www.ramona.codes/Moe-Profile.jpg',
      sameAs: [
        'https://github.com/leichteckig',
        'https://twitter.com/leichteckig',
        'https://www.linkedin.com/in/ramona-schwering/',
        'https://www.xing.com/profile/Ramona_Schwering2/cv',
        'https://hachyderm.io/@leichteckig'
      ]
    }
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
