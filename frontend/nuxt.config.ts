// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@vueuse/nuxt', '@pinia/nuxt', '@unocss/nuxt', '@nuxtjs/color-mode'],
  colorMode: {
      preference: 'light', // Default theme: light
      fallback: 'light',
      classSuffix: '',
    },
})
