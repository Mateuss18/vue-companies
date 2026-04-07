export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  app: {
    head: {
      htmlAttrs: {
        lang: 'pt-BR',
      },
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
        {
          name: 'google-site-verification',
          content: 'pGqHUvMe7RilAm4KtG-aA-2lNDNXEyryG2O_gQmc2nc',
        },
      ],
    },
  },
  devtools: { enabled: false },
  modules: ['@nuxt/eslint', '@nuxt/ui', 'nuxt-gtag', '@nuxtjs/i18n'],
  vite: {
    build: {
      sourcemap: false,
    },
  },
  gtag: {
    id: 'G-8J3T67YX11',
    config: {
      debug_mode: process.env.NODE_ENV === 'development',
    },
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
  css: ['~/assets/css/main.css', 'flag-icons/css/flag-icons.min.css'],
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
  plugins: ['~/plugins/i18n-iso-countries.ts'],
  i18n: {
    defaultLocale: 'pt-BR',
    strategy: 'no_prefix',
    restructureDir: 'app/i18n',
    langDir: 'locales',
    locales: [
      {
        code: 'pt-BR',
        language: 'pt-BR',
        file: 'pt-BR.ts',
        name: 'Português',
      },
      {
        code: 'en',
        language: 'en-US',
        file: 'en.ts',
        name: 'English',
      },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    vueI18n: 'app/i18n/i18n.confi.ts',
  },
})
