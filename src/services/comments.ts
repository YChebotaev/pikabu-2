import { commentsDb, type Content } from '@/db'
import { getUser } from './users'
import { getCommentVotesBalance } from './votes'
import type { Comment } from './types'

export const getComment = async (commentId: string): Promise<Comment> => {
  const data = await (await commentsDb).get(commentId)

  return {
    ...data,
    author: await getUser(data.authorId),
    votesBalance: await getCommentVotesBalance(commentId),
    comments: await getChildrenComments(commentId)
  }
}

export const getRootCommentsOfPost = async (postId: string) => {
  const { docs } = await (await commentsDb).find({
    selector: {
      postId,
      parentId: ''
    },
    sort: ['createdAt']
  })

  return Promise.all(docs.map(comment => getComment(comment._id)))
}

export const getCommentsCountOfPost = async (postId: string) => {
  const { docs } = await (await commentsDb).find({
    selector: {
      postId
    }
  })

  return docs ? docs.length : 0
}

export const getCommentsOfUser = async (authorId: string) => {
  const { docs } = await (await commentsDb).find({
    selector: {
      authorId
    },
    sort: ['createdAt']
  })

  return Promise.all(docs.map(comment => getComment(comment._id)))
}

export const getChildrenComments = async (parentId: string) => {
  const { docs } = await (await commentsDb).find({
    selector: {
      parentId
    },
    sort: ['createdAt']
  })

  return Promise.all(docs.map(comment => getComment(comment._id)))
}

export const getResponsesForComment = async (parentId: string) => {
  const { docs } = await (await commentsDb).find({
    selector: {
      parentId
    }
  })

  return Promise.all(docs.map(comment => getComment(comment._id)))
}

export const getUserResponsesForAllComments = async (authorId: string) => {
  const userComments = await getCommentsOfUser(authorId)
  const commentsResponses = await Promise.all(userComments.map(({ _id }) => getResponsesForComment(_id)))

  return commentsResponses.flat()
}

export const createComment = async ({
  postId,
  authorId,
  parentId,
  content
}: {
  postId: string
  authorId: string
  parentId: string | null
  content: Content
}) => {
  const { id } = await (await commentsDb).insert({
    postId,
    authorId,
    parentId: parentId ?? null,
    content,
    createdAt: new Date().getTime(),
    updatedAt: null
  })

  return id
}

export const updateComment = async (commentId: string, {
  content
}: {
  content: Content
}) => {
  const oldComment = await (await commentsDb).get(commentId)

  await (await commentsDb).insert({
    ...oldComment,
    content,
    updatedAt: new Date().getTime()
  })
}
