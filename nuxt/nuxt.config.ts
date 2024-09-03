// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  devServer: {
    port: 3001,
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@wagmi/vue/nuxt',
    '@pinia/nuxt',
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
  ],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  vue: {
    compilerOptions: {
      isCustomElement: tag => tag.startsWith('w3m-'),
    },
  },
  tailwindcss: {
    // Options
  },
  icon: {
    mode: 'svg',
    size: '1.5em',
  },
})
