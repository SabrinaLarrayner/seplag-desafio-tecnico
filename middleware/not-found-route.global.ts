import { indexRoutes } from "~/routes/index.routes"

export default defineNuxtRouteMiddleware((to, from) => {
    const validRoutes = indexRoutes.map(route => route.name)
    
    if (!validRoutes.includes(to.name?.toString() || '')) {
      return navigateTo({ name: 'persons' })
    }
  })

