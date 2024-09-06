// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  devServer: {
    port: 3001,
  },

  modules: [
    '@wagmi/vue/nuxt',
    '@pinia/nuxt',
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
  ],
  colorMode: {
    preference: 'dark',
    dataValue: 'theme',
    classSuffix: '',
  },
  tailwindcss: {
    exposeConfig: true,
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
  vue: {
    compilerOptions: {
      isCustomElement: tag => tag.startsWith('w3m-'),
    },
  },
  icon: {
    customCollections: [
      {
        prefix: 'my-icon',
        dir: './assets/my-icons',
      },
    ],
    mode: 'svg',
    size: '1.5em',
  },
})
