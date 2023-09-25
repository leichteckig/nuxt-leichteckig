import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  ssr: true,
  app: {
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
        { property: 'og:title', hid: 'og:title', content: 'Ramona Schwering' },
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
        { name: 'twitter:card', hid:'twitter:card', content: 'summary_large_image' },
        { name: 'google-site-verification', content: 'ySo2miRK4qu8z_acSgFSPF7-HkA4TqcpydymQASt5gw' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // todo Mastodon be in the title
        { rel: 'me', href: 'https://vue.land/@leichteckig', title: 'Mastodon' }
      ]
    },
  },

  css: [
    '@/assets/main.css'
  ],

  modules: [
    '@nuxt/content',
    '@nuxtjs/color-mode',
    'nuxt-icons',
    ['@nuxtjs/i18n', {
      legacy: false,
      locales: [
        {
          code: 'en',
          name: 'EN',
          file: 'en-US.js'
        },
        {
          code: 'de',
          name: 'DE',
          file: 'de-DE.js'
        }
      ],
      lazy: true,
      langDir: 'locales/',
      defaultLocale: 'en',
      fallbackLocale: 'en',
      types: 'composition'
    }],
  ],  
})
