// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  devServer: {
    port: 3001,
  },

  modules: [
    '@unocss/nuxt',
    '@nuxt/ui',
    '@wagmi/vue/nuxt',
    '@pinia/nuxt',
  ],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  vue: {
    compilerOptions: {
      isCustomElement: tag => tag.startsWith('w3m-'),
    },
  },
})
