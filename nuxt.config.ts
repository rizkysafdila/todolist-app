// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/image',
    '@pinia/nuxt',
  ],

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2025-07-16',

  eslint: {
    config: {
      standalone: false,
    },
  },

  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET,
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
    },
  },
})
