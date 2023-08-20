export type SignupErrorCodes =
  | 'username_pattern'
  | 'email_pattern'
  | 'passwords_not_match'
  | 'username_empty'
  | 'email_empty'
  | 'password_empty'
  | 'username_taken'
  | 'email_taken'

export type SigninErrorCodes =
  | 'identity_empty'
  | 'identity_pattern'
  | 'password_mismatch'

export type PostCreateErrorCodes =
  | 'not_authenticated'
  | 'title_empty'
  | 'title_exists'
  | 'content_empty'
  | 'content_wrong_markdown'

export type CommentCreateErrorCodes =
  | 'content_empty'
  | 'not_authenticated'
