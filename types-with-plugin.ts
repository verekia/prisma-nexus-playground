import { join } from 'path'

import { PrismaClient } from '@prisma/client'
import { DateTimeResolver, JSONObjectResolver } from 'graphql-scalars'
import { asNexusMethod, makeSchema, mutationType, objectType, queryType } from 'nexus'
import { nexusPrisma } from 'nexus-plugin-prisma'

const prisma = new PrismaClient()

export const schema = makeSchema({
  shouldExitAfterGenerateArtifacts:
    process.env.NEXUS_SHOULD_EXIT_AFTER_GENERATE_ARTIFACTS === 'true',
  // contextType: {
  //   module: require.resolve('.prisma/client/index.d.ts'),
  //   export: 'PrismaClient',
  // },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
  types: [
    asNexusMethod(JSONObjectResolver, 'json'),
    asNexusMethod(DateTimeResolver, 'date'),
    queryType({
      definition(t) {
        t.crud.user()
        t.crud.users({ ordering: true })
        t.crud.post()
        t.crud.posts({ filtering: true })
      },
    }),
    mutationType({
      definition(t) {
        t.crud.createOneUser({
          async resolve(root, args, ctx, info, originalResolve) {
            const data = originalResolve(root, args, ctx, info)
            await pubsub.publish('user_added', { data })
            return data
          },
        })
        t.crud.createOnePost()
        t.crud.deleteOneUser()
        t.crud.deleteOnePost()
      },
    }),
    objectType({
      name: 'User',
      definition(t) {
        t.model.id()
        t.model.metadata()
        t.model.email()
        t.model.birthDate()
        t.model.posts()
      },
    }),
    objectType({
      name: 'Post',
      definition(t) {
        t.model.id()
        t.model.authors()
      },
    }),
  ],
  plugins: [nexusPrisma({ experimentalCRUD: true, prismaClient: ctx => (ctx.prisma = prisma) })],
  outputs: {
    typegen: join(__dirname, 'node_modules/@types/typegen-nexus/index.d.ts'),
    schema: join(__dirname, './schema.graphql'),
  },
  // outputs: process.env.TS_NODE_DEV
  //   ? {
  //       typegen: join(__dirname, 'node_modules/@types/typegen-nexus/index.d.ts'),
  //       schema: join(__dirname, './schema.graphql'),
  //     }
  //   : {},
})

export default schema
