import { postsDb, votesDb } from '@/db'
import { updatePost } from './posts'
import { uniq } from 'lodash'

export const getUserHasVotedForPost = async (postId: string, userId: string) => {
  const { docs: [vote] } = await (await votesDb).find({
    selector: {
      postId,
      authorId: userId
    }
  })

  return vote != null
}

export const getUserHasVotedForComment = async (commentId: string, userId: string) => {
  const { docs: [vote] } = await (await votesDb).find({
    selector: {
      commentId,
      authorId: userId
    }
  })

  return vote != null
}

export const getAllVotesForPost = async (postId: string) => {
  const { docs } = await (await votesDb).find({
    selector: {
      type: 'post',
      postId
    }
  })

  return docs
}

export const getAllVotesForComment = async (commentId: string) => {
  const { docs } = await (await votesDb).find({
    selector: {
      type: 'comment',
      commentId
    }
  })

  return docs
}

export const voteForPost = async ({ postId, authorId, rate }: { postId: string, authorId: string, rate: number }) => {
  const { docs: [oldVote] } = await (await votesDb).find({
    selector: {
      postId,
      authorId
    }
  })

  if (oldVote) {
    await (await votesDb).insert({
      ...oldVote,
      rate,
      updatedAt: new Date().getTime()
    })
  } else {
    await (await votesDb).insert({
      type: 'post',
      postId,
      commentId: null,
      authorId,
      rate,
      createdAt: new Date().getTime(),
      updatedAt: null
    })
  }

  {
    const post = await (await postsDb).get(postId)

    if (post.ribbons && !post.ribbons.includes('hot')) {
      const postVotesCount = await getPostVotesCount(postId)

      if (postVotesCount > 10) {
        const postVotesBalance = await getPostVotesBalance(postId)

        if (postVotesBalance > 7) {
          await updatePost(postId, {
            ribbons: uniq([...post.ribbons ?? [], 'hot'])
          })
        }
      }
    }
  }
}

export const removeVoteForPost = async ({ postId, authorId }: { postId: string, authorId: string }) => {
  const { docs: [vote] } = await (await votesDb).find({
    selector: {
      postId,
      authorId
    }
  })

  if (vote) {
    await (await votesDb).destroy(vote._id, vote._rev)
  }
}

export const voteForComment = async ({ commentId, authorId, rate }: { commentId: string, authorId: string, rate: number }) => {
  const { docs: [oldVote] } = await (await votesDb).find({
    selector: {
      commentId,
      authorId
    }
  })

  if (oldVote) {
    await (await votesDb).insert({
      ...oldVote,
      rate,
      updatedAt: new Date().getTime()
    })
  } else {
    const { id } = await (await votesDb).insert({
      type: 'comment',
      postId: null,
      commentId,
      authorId,
      rate,
      createdAt: new Date().getTime(),
      updatedAt: null
    })
  }
}

export const getAllVotesOfUser = async (authorId: string) => {
  const { docs } = await (await votesDb).find({
    selector: {
      authorId
    }
  })

  return docs
}

export const removeVoteForComment = async ({ commentId, authorId }: { commentId: string, authorId: string }) => {
  const { docs: [vote] } = await (await votesDb).find({
    selector: {
      commentId,
      authorId
    }
  })

  if (vote) {
    await (await votesDb).destroy(vote._id, vote._rev)
  }
}

export const getPostVotesBalance = async (postId: string) => {
  const { docs } = await (await votesDb).find({
    selector: {
      postId
    }
  })

  let balance = 0

  for (const vote of docs) {
    balance += vote.rate
  }

  return balance
}

export const getPostVotesCount = async (postId: string) => {
  const { docs } = await (await votesDb).find({
    selector: {
      postId
    }
  })

  return docs.length
}

export const getCommentVotesBalance = async (commentId: string) => {
  const { docs } = await (await votesDb).find({
    selector: {
      commentId
    }
  })

  let balance = 0

  for (const vote of docs) {
    balance += vote.rate
  }

  return balance
}
