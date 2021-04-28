import { join } from 'path'

import { makeSchema } from 'nexus'

import * as Scalars from './types/scalars'
import * as User from './types/user'
import * as Auth from './types/auth'

const schema = makeSchema({
  types: [Scalars, User, Auth],
  outputs: process.env.TS_NODE_DEV
    ? {
        typegen: join(__dirname, '../../../../node_modules/@types/nexus-typegen/index-auth.d.ts'),
        schema: join(__dirname, 'schema-auth.graphql'),
      }
    : {},
})

export default schema
