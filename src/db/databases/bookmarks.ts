import { createConnection } from '../createConnection'
import type { Bookmark } from '../types'

export const bookmarksDb = createConnection().then(db => db.use<Bookmark>('bookmarks'))
