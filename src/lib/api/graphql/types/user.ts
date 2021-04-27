import { objectType, extendType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition: t => {
    t.string('name')
  },
})

export const UserQueries = extendType({
  type: 'Query',
  definition: t => {
    t.nonNull.list.field('users', {
      type: 'User',
      resolve: () => [{ name: 'Foo' }],
    })
  },
})
