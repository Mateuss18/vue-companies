// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  app: {
    head: {
      title: 'Vue Companies',
      meta: [
        {
          name: 'description',
          content:
            'Trabalhe onde o Vue.js é valorizado, descubra aqui empresas brasileiras e internacionais que desenvolvem com Vue',
        },
        { property: 'og:title', content: 'Vue Companies' },
        {
          property: 'og:description',
          content: 'Descubra aqui empresas brasileiras e internacionais que desenvolvem com Vue',
        },
        { property: 'og:image', content: '/imgs/og-image.png' },
        { property: 'og:type', content: 'website' },
      ],
    },
  },
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/ui'],
  eslint: {
    config: {
      standalone: false,
    },
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },
  runtimeConfig: {
    logoDevPublicKey: process.env.LOGO_DEV_PUBLIC_KEY,
    public: {
      logoDevPublicKey: process.env.LOGO_DEV_PUBLIC_KEY,
    },
  },
})
