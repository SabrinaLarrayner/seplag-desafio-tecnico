const routes = [
  {
      name: 'persons-info-payload',
      path: '/persons/details/:id/persons-info-payload',
      component: () => import('~/pages/persons-info-payload/persons-payload-info.vue')
  }
]

export const personsInfoPayloadRoute = routes
