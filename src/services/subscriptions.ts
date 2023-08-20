import { subscriptionsDb } from '@/db'

export const userHaveSubscribedToUser = async (userId: string, targetUserId: string) => {
  const { docs: [subscription] } = await (await subscriptionsDb).find({
    selector: {
      userId,
      targetUserId
    }
  })

  return subscription != null
}

export const userSubscribeToUser = async (userId: string, targetUserId: string) => {
  await (await subscriptionsDb).insert({
    userId,
    targetUserId
  })
}

export const userUnsubscribeToUser = async (userId: string, targetUserId: string) => {
  const { docs: [subscription] } = await (await subscriptionsDb).find({
    selector: {
      userId,
      targetUserId
    }
  })

  if (subscription) {
    await (await subscriptionsDb).destroy(subscription._id, subscription._rev)
  }
}

export const getSubscriptionsOfUser = async (userId: string) => {
  const { docs: subscriptions } = await (await subscriptionsDb).find({
    selector: {
      userId
    }
  })

  return subscriptions
}
