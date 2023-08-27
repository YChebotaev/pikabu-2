import { cookies } from 'next/headers'
import { getUserBySessionId, addPostToUserBookmarks, removePostFromUserBookmarks } from '@/services'

export const POST = async (req: Request, { params: { post_id } }: { params: { post_id: string } }) => {
  const cookiesSessionId = cookies().get("session_id")?.value;
  const user = cookiesSessionId
    ? await getUserBySessionId(cookiesSessionId)
    : undefined;
  const { bookmarked } = (await req.json()) as { bookmarked: boolean }

  if (user) {
    if (bookmarked) {
      await addPostToUserBookmarks(user._id, post_id)

      return new Response(JSON.stringify({
        bookmarked: true
      }))
    } else {
      await removePostFromUserBookmarks(user._id, post_id)

      return new Response(JSON.stringify({
        bookmarked: false
      }))
    }
  }


  return new Response()
}
