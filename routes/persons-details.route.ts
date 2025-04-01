const routes = [
  {
      name: 'persons-details',
      path: '/persons/details/:id',
      component: () => import('~/pages/persons-details/person-details-list.vue')
  }
]

export const personsDetailsRoute = routes
