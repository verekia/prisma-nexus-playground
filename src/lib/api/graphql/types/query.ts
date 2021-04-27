import { queryType } from 'nexus'

export const Query = queryType({
  definition: t => {
    t.boolean('ok', { resolve: () => true })
    t.void('void', { resolve: () => console.log('Custom Void scalar OK') })
  },
})
