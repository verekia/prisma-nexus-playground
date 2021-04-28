import http from 'http'

import { ApolloServer } from 'apollo-server-micro'

import schema from '../../lib/api/graphql/schema'

export const config = {
  api: { bodyParser: false },
}

const server = new ApolloServer({
  schema,
  subscriptions: {
    path: '/api/graphql',
    keepAlive: 9000,
    onConnect: () => console.log('connected'),
    onDisconnect: () => console.log('disconnected'),
  },
})
const handler = server.createHandler({ path: '/api/graphql' })
const httpServer = new http.Server(handler)
server.installSubscriptionHandlers(httpServer)

export default handler
