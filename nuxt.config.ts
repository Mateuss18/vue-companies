// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
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
