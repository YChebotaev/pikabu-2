import { createConnection } from '../createConnection'
import type { Post } from '../types'

export const postsDb = createConnection().then(db => db.use<Post>('posts'))
