export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  ssr: false,
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  tailwindcss: {
    exposeConfig: true
  },
  pages: true,
  css: ['element-plus/dist/index.css'],
  components: [
    { path: '~/pages', pathPrefix: false },
    { path: '~/components', pathPrefix: false },
    { path: '~/middleware', pathPrefix: false } 
  ],
  app: {
    head: {
      title: 'Pessoas Desaparecidas',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  }
})
