const routes = [
  {
      name: 'persons',
      path: '/persons',
      component: () => import('~/pages/persons/persons.vue')
  }
]

export const personsRoute = routes
