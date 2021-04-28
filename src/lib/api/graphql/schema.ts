import { join } from 'path'

import { makeSchema, fieldAuthorizePlugin } from 'nexus'

import * as Scalars from './types/scalars'
import * as User from './types/user'

const schema = makeSchema({
  types: [Scalars, User],
  plugins: [fieldAuthorizePlugin()],
  outputs: process.env.TS_NODE_DEV
    ? {
        typegen: join(__dirname, '../../../../node_modules/@types/nexus-typegen/index.d.ts'),
        schema: join(__dirname, 'schema.graphql'),
      }
    : {},
})

export default schema
