import { cookies } from 'next/headers'
import { getUserBySessionId, voteForPost, getPostVotesBalance, addPostToUserBookmarks } from '@/services'

export const POST = async (req: Request, { params: { post_id } }: { params: { post_id: string } }) => {
  const cookiesSessionId = cookies().get("session_id")?.value;
  const user = cookiesSessionId
    ? await getUserBySessionId(cookiesSessionId)
    : undefined;

  if (user) {
    await addPostToUserBookmarks(user._id, post_id)
  }


  return new Response()
}
