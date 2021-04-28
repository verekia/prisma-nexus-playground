import { extendType } from 'nexus'

// Use https://github.com/nextauthjs/adapters/blob/canary/packages/prisma/src/index.ts

export const AuthQueries = extendType({
  type: 'Query',
  definition: t => {
    t.boolean('getUser', {
      resolve: () => true,
    })
    t.boolean('getUserByEmail', {
      resolve: () => true,
    })
    t.boolean('getUserByProviderAccountId', {
      resolve: () => true,
    })
    t.boolean('getSession', {
      resolve: () => true,
    })
    t.boolean('getVerificationRequest', {
      resolve: () => true,
    })
  },
})

export const AuthMutations = extendType({
  type: 'Mutation',
  definition: t => {
    t.boolean('createUser', {
      resolve: () => true,
    })
    t.boolean('updateUser', {
      resolve: () => true,
    })
    t.boolean('deleteUser', {
      resolve: () => true,
    })
    t.boolean('linkAccount', {
      resolve: () => true,
    })
    t.boolean('unlinkAccount', {
      resolve: () => true,
    })
    t.boolean('createSession', {
      resolve: () => true,
    })
    t.boolean('updateSession', {
      resolve: () => true,
    })
    t.boolean('deleteSession', {
      resolve: () => true,
    })
    t.boolean('createVerificationRequest', {
      resolve: () => true,
    })
    t.boolean('deleteVerificationRequest', {
      resolve: () => true,
    })
  },
})
