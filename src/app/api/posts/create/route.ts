import { headers, cookies } from 'next/headers'
import { getPostByTitle, getUserBySessionId, createPost } from '@/services'
import type { PostCreateErrorCodes } from '@/types'

export const POST = async (req: Request) => {
  const cookiesSessionId = cookies().get("session_id")?.value;
  const user = cookiesSessionId
    ? await getUserBySessionId(cookiesSessionId)
    : undefined;
  const formData = await req.formData()
  const origin = headers().get("origin")!
  const title = String(formData.get('title')!)
  const content = String(formData.get('content')!)
  let errorCode: PostCreateErrorCodes | undefined = undefined

  do {
    if (user == null) {
      errorCode = 'not_authenticated'

      break
    }

    if (!title) {
      errorCode = 'title_empty'

      break
    }

    const maybeExistingPost = await getPostByTitle(title)

    if (maybeExistingPost != null) {
      errorCode = 'title_exists'

      break
    }

    if (!content) {
      errorCode = 'content_empty'

      break
    }
  } while (false)

  if (errorCode) {
    const redirectURL = new URL('/posts/create', origin)

    if (title) {
      redirectURL.searchParams.set('title', title)
    }

    if (content) {
      redirectURL.searchParams.set('content', content)
    }

    redirectURL.searchParams.set('error_code', errorCode)

    return Response.redirect(redirectURL)
  } else {
    const postId = await createPost({
      authorId: user!._id,
      title,
      content: {
        type: 'markdown',
        content
      },
      ribbons: ['fresh']
    })

    const redirectURL = new URL(`/posts/${postId}`, origin)

    return Response.redirect(redirectURL)
  }
}
