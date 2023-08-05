import { createConnection } from '../createConnection'
import type { Comment } from '../types'

export const commentsDb = createConnection().then(db => db.use<Comment>('comments'))
