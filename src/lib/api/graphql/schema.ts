import { join } from 'path'

import { makeSchema } from 'nexus'

import * as types from './types'

const schema = makeSchema({
  types,
  outputs: process.env.TS_NODE_DEV
    ? {
        typegen: join(__dirname, '../../../../node_modules/@types/nexus-typegen/index.d.ts'),
        schema: join(__dirname, 'schema.graphql'),
      }
    : {},
})

export default schema
