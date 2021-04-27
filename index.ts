// import { nexusPrisma } from 'nexus-plugin-prisma'
// import { makeSchema } from 'nexus'

// import * as types from './types'

// const schema = makeSchema({
//   types,
//   plugins: [nexusPrisma()],
// })

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const createUser = async () => {
  return prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      posts: {
        create: { title: 'Hello World' },
      },
      profile: {
        create: { bio: 'I like turtles' },
      },
    },
  })
}

const getUsers = async () => {
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  })
  console.dir(allUsers, { depth: null })
  return allUsers
}

async function main() {
  await getUsers()
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
