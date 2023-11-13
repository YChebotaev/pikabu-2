import { cookies } from 'next/headers'
import { getUserBySessionId, removeVoteForComment, getCommentVotesBalance } from '@/services'

export const POST = async (req: Request, { params: { comment_id } }: { params: { comment_id: string } }) => {
  const cookiesSessionId = cookies().get("session_id")?.value;
  const user = cookiesSessionId
    ? await getUserBySessionId(cookiesSessionId)
    : undefined;

  if (user) {
    await removeVoteForComment({
      commentId: comment_id,
      authorId: user._id,
    })
  }

  const votesBalance = await getCommentVotesBalance(comment_id)

  return new Response(JSON.stringify({
    rating: votesBalance
  }))
}
