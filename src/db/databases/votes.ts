import { createConnection } from '../createConnection'
import type { Vote } from '../types'

export const votesDb = createConnection().then(db => db.use<Vote>('votes'))
