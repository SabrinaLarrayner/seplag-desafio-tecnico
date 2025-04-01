import { defineNuxtPlugin, useRouter } from '#app'
import { indexRoutes } from '~/routes/index.routes'

export default defineNuxtPlugin(() => {
  const router = useRouter()
  indexRoutes.forEach(route => router.addRoute(route))
})