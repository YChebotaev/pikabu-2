import { createConnection } from '../createConnection'
import type { User } from '../types'

export const usersDb = createConnection().then(db => db.use<User>('users'))
