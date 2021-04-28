import { ApolloServer } from 'apollo-server-micro'

import authSchema from '../../lib/api/graphql/schema-auth'

export const config = {
  api: { bodyParser: false },
}

export default new ApolloServer({ schema: authSchema }).createHandler({
  path: '/api/graphql-auth',
})
