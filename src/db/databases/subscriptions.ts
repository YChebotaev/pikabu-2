import { createConnection } from '../createConnection'
import type { Subscription } from '../types'

export const subscriptionsDb = createConnection().then(db => db.use<Subscription>('subscriptions'))
