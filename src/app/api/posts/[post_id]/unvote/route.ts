import { cookies } from 'next/headers'
import { getUserBySessionId, removeVoteForPost, getCommentVotesBalance } from '@/services'

export const POST = async (req: Request, { params: { post_id } }: { params: { post_id: string } }) => {
  const cookiesSessionId = cookies().get("session_id")?.value;
  const user = cookiesSessionId
    ? await getUserBySessionId(cookiesSessionId)
    : undefined;

  if (user) {
    await removeVoteForPost({
      postId: post_id,
      authorId: user._id,
    })
  }

  const votesBalance = await getCommentVotesBalance(post_id)

  return new Response(JSON.stringify({
    rating: votesBalance
  }))
}
