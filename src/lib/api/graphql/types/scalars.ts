import { VoidResolver } from 'graphql-scalars'
import { asNexusMethod } from 'nexus'

export const VoidScalar = asNexusMethod(VoidResolver, 'void')
