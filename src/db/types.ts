export type Content = {
  type: 'markdown'
  content: string
}

export type Comment = {
  postId: string
  authorId: string
  parentId: string | null
  content: Content
  createdAt: number
  updatedAt: number | null
}

export type Post = {
  title: string
  authorId: string
  content: Content
  ribbons: string[] | null
  createdAt: number
  updatedAt: number | null
}

export type User = {
  username: string
  sessionId: string
  email: string
  passwordHash: string
  passwordSalt: string
  avatar: {
    src: string
  }
  cover: {
    src: string
  }
  rating: number
  followersCount: number
  followsCount: number
  postsCount: {
    [key: string]: number
  }
  bio: string
  votedUpCount: number
  votedDownCount: number
  createdAt: number
  updatedAt: number | null
}

export type Vote = {
  type: 'post' | 'comment'
  postId: string | null
  commentId: string | null
  authorId: string
  rate: number
  createdAt: number
  updatedAt: number | null
}

export type Bookmark = {
  type: 'post'
  postId: string
  userId: string
}

export type View = {
  type: 'post'
  postId: string
  userId: string
}
