import { personsDetailsRoute } from './persons-details.route'
import { personsInfoPayloadRoute } from './persons-info.route'
import { personsRoute } from './persons.route'

export const indexRoutes = [
  ...personsRoute,
  ...personsInfoPayloadRoute,
  ...personsDetailsRoute
]