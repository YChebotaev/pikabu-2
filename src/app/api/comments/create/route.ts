import { headers, cookies } from 'next/headers'
import { getUserBySessionId, createComment } from '@/services'
import type { CommentCreateErrorCodes } from '@/types'

export const POST = async (req: Request) => {
  const cookiesSessionId = cookies().get("session_id")?.value;
  const user = cookiesSessionId
    ? await getUserBySessionId(cookiesSessionId)
    : undefined;
  const formData = await req.formData()
  const origin = headers().get("origin")!
  const postId = String(formData.get('post_id')!)
  const parentId = String(formData.get('parent_id')!)
  const content = String(formData.get('content')!)
  let errorCode: CommentCreateErrorCodes | undefined = undefined

  do {
    if (user == null) {
      errorCode = 'not_authenticated'

      break
    }

    if (!content) {
      errorCode = 'content_empty'

      break
    }
  } while (false)

  if (errorCode) {
    const redirectURL = new URL(`/posts/${postId}`, origin)

    if (content) {
      redirectURL.searchParams.set('content', content)
    }

    redirectURL.searchParams.set('error_code', errorCode)

    return Response.redirect(redirectURL)
  } else {
    const commentId = await createComment({
      postId,
      authorId: user!._id,
      parentId,
      content: {
        type: 'markdown',
        content
      }
    })

    const redirectURL = new URL(`/posts/${postId}`, origin)

    redirectURL.searchParams.set('highlighted_comment', commentId)

    return Response.redirect(redirectURL)
  }
}
