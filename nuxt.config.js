export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  generate: {
    fallback: true
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Ramona Schwering\'s Blog',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8'},
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Frontend Developer & Software Developer @shopware. International Speaker. Cypress Ambassador. OpenSource Lover.'
      },
      {property: 'og:title', hid: 'og:title', content: 'Ramona Schwering'},
      {
        property: 'og:description',
        hid: 'og:description',
        content: 'Frontend Developer & Software Developer @shopware. International Speaker. Cypress Ambassador. OpenSource Lover'
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:image', property: 'og:image', content: 'https://www.ramona.codes/ogimage.png' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@nuxt_js' },
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        content: 'https://www.ramona.codes',
      },
      { name: 'twitter:card', hid:'twitter:card', content: 'summary_large_image' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/svg',
    '@nuxtjs/google-fonts',
    '@/modules/sitemapRouteGenerator'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxt/content',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://www.ramona.codes',
    cacheTime: 1000 * 60 * 15,
    defaults: {
      lastmod: new Date(),
    }
  },

  robots: {
    UserAgent: 'Googlebot',
    Disallow: () => ' */smashing-',
    Sitemap: 'https://www.ramona.codes/sitemap.xml'
  },

  googleFonts: {
    download: true,
    base64: true,
    families: {
      Roboto: true,
      'Amatic+SC': true,
    }
  }
}
