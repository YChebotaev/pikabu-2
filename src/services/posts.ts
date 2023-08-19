import { postsDb, type Content, votesDb, bookmarksDb, viewsDb } from '@/db'
import { getUser } from './users'
import { getPostVotesBalance } from './votes'
import { getCommentsOfPost } from './comments'
import type { Post } from './types'

export const getPost = async (postId: string): Promise<Post> => {
  const data = await (await postsDb).get(postId)

  return {
    ...data,
    votesBalance: await getPostVotesBalance(postId),
    author: await getUser(data.authorId),
    comments: await getCommentsOfPost(postId)
  }
}

export const getPostByTitle = async (title: string): Promise<Post | undefined> => {
  const { docs: [post] } = await (await postsDb).find({
    selector: {
      title
    }
  })

  return post ? getPost(post._id) : undefined
}

export const getHotPosts = async ({ page, limit }: { page: number, limit: number }) => {
  const { docs } = await (await postsDb).find({
    selector: {
      ribbon: {
        $elemMatch: {
          $eq: 'hot'
        }
      }
    },
    sort: [{
      createdAt: 'desc'
    }],
    limit,
    skip: page * limit
  })

  return Promise.all(docs.map(post => getPost(post._id)))
}

export const getFreshPosts = async ({ page, limit }: { page: number, limit: number }) => {
  const { docs } = await (await postsDb).find({
    selector: {
      ribbons: {
        $elemMatch: {
          $eq: 'fresh'
        }
      }
    },
    sort: [{
      createdAt: 'desc'
    }],
    limit,
    skip: page * limit
  })

  return Promise.all(docs.map(post => getPost(post._id)))
}

export const getUserPosts = async (authorId: string, { page, limit }: { page: number, limit: number }) => {
  const { docs } = await (await postsDb).find({
    selector: {
      authorId
    },
    sort: [{
      createdAt: 'desc'
    }],
    limit,
    skip: page * limit
  })

  return Promise.all(docs.map(post => getPost(post._id)))
}

export const getUserPostsVotedFor = async (authorId: string) => {
  const { docs } = await (await votesDb).find({
    selector: {
      type: 'post',
      authorId
    }
  })

  return Promise.all(docs.map(({ postId }) => getPost(postId!)))
}

export const getPostsBookmarkedByUser = async (userId: string) => {
  const { docs: bookmarks } = await (await bookmarksDb).find({
    selector: {
      type: 'post',
      userId,
    }
  })

  return Promise.all(bookmarks.map(({ postId }) => getPost(postId)))
}

export const getPostsViewedByUser = async (userId: string) => {
  const { docs: views } = await (await viewsDb).find({
    selector: {
      type: 'post',
      userId
    }
  })

  return Promise.all(views.map(({ postId }) => getPost(postId)))
}

export const createPost = async ({ title, authorId, content, ribbons }: { title: string, authorId: string, content: Content, ribbons?: string[] }) => {
  const { id } = await (await postsDb).insert({
    title,
    authorId,
    content,
    ribbons: ribbons ?? null,
    createdAt: new Date().getTime(),
    updatedAt: null
  })

  return id
}

export const updatePost = async (postId: string, { title, content, ribbons }: { title?: string, content?: Content, ribbons?: string[] | null }) => {
  const oldPost = await (await postsDb).get(postId)

  await (await postsDb).insert({
    ...oldPost,
    title: title ?? oldPost.title,
    content: content ?? oldPost.content,
    ribbons: ribbons === null ? null : ribbons ?? oldPost.ribbons,
    updatedAt: new Date().getTime()
  })
}
