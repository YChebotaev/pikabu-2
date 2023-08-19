import { createConnection } from '../createConnection'
import type { View } from '../types'

export const viewsDb = createConnection().then(db => db.use<View>('views'))
