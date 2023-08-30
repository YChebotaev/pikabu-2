import { createHash, randomBytes } from 'node:crypto'
import { subscriptionsDb, usersDb } from '@/db'
import type { User } from './types'
import { getAllUserComments, getAllUserPosts, getAllVotesForComment, getAllVotesForPost, getAllVotesOfUser } from '.'

export const getUser = async (userId: string): Promise<User> => {
  const user = await (await usersDb).get(userId)

  return {
    ...user,
    rating: await getUserRating(userId),
    followersCount: await getUserFollowersCount(userId),
    followsCount: await getUserFollowsCount(userId),
    postsCount: await getUserPostsCountByRibbons(userId),
    votedUpCount: await getUserVotedCount(userId, 'up'),
    votedDownCount: await getUserVotedCount(userId, 'down')
  }
}

export const getUserBySessionId = async (sessionId: string) => {
  const { docs: [user] } = await (await usersDb).find({
    selector: {
      sessionId
    }
  })

  return user == null ? undefined : getUser(user._id)
}

export const getUserByEmail = async (email: string) => {
  const { docs: [user] } = await (await usersDb).find({
    selector: {
      email
    }
  })

  return user == null ? undefined : getUser(user._id)
}

export const getUserByUsername = async (username: string) => {
  const { docs: [user] } = await (await usersDb).find({
    selector: {
      username
    }
  })

  return user == null ? undefined : getUser(user._id)
}

export const getUserRating = async (userId: string) => {
  let rating = 0
  const userPosts = await getAllUserPosts(userId)
  const userPostsVotes = (await Promise.all(
    userPosts.map(({ _id }) => getAllVotesForPost(_id))
  )).flat()
  rating = userPostsVotes.reduce((finalRating, vote) => finalRating + vote.rate, rating)
  const userComments = await getAllUserComments(userId)
  const userCommentsVotes = (await Promise.all(
    userComments.map(({ _id }) => getAllVotesForComment(_id))
  )).flat()
  rating = userCommentsVotes.reduce((finalRating, vote) => finalRating + vote.rate, rating)

  return rating
}

export const getUserFollowersCount = async (targetUserId: string) => {
  const { docs } = await (await subscriptionsDb).find({
    selector: {
      targetUserId
    }
  })

  return docs.length
}

export const getUserFollowsCount = async (userId: string) => {
  const { docs } = await (await subscriptionsDb).find({
    selector: {
      userId
    }
  })

  return docs.length
}

export const getUserPostsCountByRibbons = async (userId: string) => {
  const posts = await getAllUserPosts(userId)
  const dict: { [key: string]: number } = {}

  for (const { ribbons } of posts) {
    if (ribbons == null) continue

    for (const ribbon of ribbons) {
      if (dict[ribbon] == null) {
        dict[ribbon] = 1
      } else {
        dict[ribbon] += 1
      }
    }
  }

  return dict
}

export const getUserVotedCount = async (userId: string, dir: 'up' | 'down') => {
  const votes = await getAllVotesOfUser(userId)

  return votes.reduce((count, { rate }) => {
    switch (dir) {
      case 'up':
        return rate > 0 ? count + 1 : count
      case 'down':
        return rate < 0 ? count + 1 : count
      default:
        return count
    }
  }, 0)
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
    avatar: {
      src: '/avatars/__dummy__.png'
    },
    cover: {
      src: '/covers/__dummy__.png'
    },
    bio: '',
    createdAt: new Date().getTime(),
    updatedAt: null
  })

  return id
}

export const updateUserCover = async (userId: string, fileName: string) => {
  const user = await (await usersDb).get(userId)

  await (await usersDb).insert({
    ...user,
    cover: {
      src: `/covers/${fileName}`
    },
    updatedAt: new Date().getTime()
  })
}

export const updateUserAvatar = async (userId: string, fileName: string) => {
  const user = await (await usersDb).get(userId)

  await (await usersDb).insert({
    ...user,
    avatar: {
      src: `/avatars/${fileName}`
    },
    updatedAt: new Date().getTime()
  })
}
