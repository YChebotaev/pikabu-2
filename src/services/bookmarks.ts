import { bookmarksDb } from '@/db'

export const hasPostBookmarkedByUser = async (userId: string, postId: string) => {
  const { docs: [bookmark] } = await (await bookmarksDb).find({
    selector: {
      type: 'post',
      userId,
      postId
    }
  })

  return bookmark != null
}

export const addPostToUserBookmarks = async (userId: string, postId: string) => {
  await (await bookmarksDb).insert({
    type: 'post',
    postId,
    userId
  })
}

export const removePostFromUserBookmarks = async (userId: string, postId: string) => {
  const { docs: [bookmark] } = await (await bookmarksDb).find({
    selector: {
      type: 'post',
      userId,
      postId
    }
  })

  if (bookmark) {
    await (await bookmarksDb).destroy(bookmark._id, bookmark._rev)

    return true
  }

  return false
}
