export type Content = {
  type: 'markdown'
  content: string
}

export type Comment = {
  _id: string
  author: User
  content: Content
  votesBalance: number
  comments: Comment[]
  createdAt: number
  updatedAt: number | null
}

export type Post = {
  _id: string
  title: string
  author: User
  content: Content
  votesBalance: number
  ribbons: string[] | null
  comments: Comment[]
  createdAt: number
  updatedAt: number | null
}

export type User = {
  _id: string
  username: string
  sessionId: string
  passwordHash: string
  passwordSalt: string
  email: string
  avatar: {
    src: string
  }
  cover: {
    src: string
  }
  votedUpCount: number
  votedDownCount: number
  followersCount: number
  followsCount: number
  postsCount: {
    [key: string]: number
  }
  rating: number
  createdAt: number
  updatedAt: number | null
}
