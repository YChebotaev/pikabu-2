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
  username: string
  sessionId: string
  passwordHash: string
  passwordSalt: string
  email: string
  createdAt: number
  updatedAt: number | null
}
