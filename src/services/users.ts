import { createHash, randomBytes } from 'node:crypto'
import { omit } from 'lodash'
import { usersDb } from '@/db'
import type { User } from './types'

export const getUser = async (userId: string): Promise<User> => {
  const user = await (await usersDb).get(userId)

  return omit(user, ['passwordHash', 'passwordSalt', 'sessionId'])
}

export const getUserBySessionId = async (sessionId: string) => {
  const { docs: [user] } = await (await usersDb).find({
    selector: {
      sessionId
    }
  })

  return user
}

export const getUserByEmail = async (email: string): Promise<User> => {
  const { docs: [user] } = await (await usersDb).find({
    selector: {
      email
    }
  })

  return user
}

export const getUserByUsername = async (username: string): Promise<User> => {
  const { docs: [user] } = await (await usersDb).find({
    selector: {
      username
    }
  })

  return user
}

export const registerUser = async ({ username, email, rawPassword }: { username: string, email: string, rawPassword: string }) => {
  const passwordSalt = randomBytes(20).toString('hex')
  const passwordHash = createHash('sha256').update(rawPassword).update(passwordSalt).digest('hex')
  const sessionId = randomBytes(20).toString('hex')

  const { id } = await (await usersDb).insert({
    username,
    sessionId,
    email,
    passwordHash,
    passwordSalt,
    createdAt: new Date().getTime(),
    updatedAt: null
  })

  return id
}
