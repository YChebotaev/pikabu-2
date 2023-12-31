import { cookies } from 'next/headers'
import { getUserBySessionId, voteForComment, getCommentVotesBalance } from '@/services'

export const POST = async (req: Request, { params: { comment_id } }: { params: { comment_id: string } }) => {
  const cookiesSessionId = cookies().get("session_id")?.value;
  const user = cookiesSessionId
    ? await getUserBySessionId(cookiesSessionId)
    : undefined;
  const { direction } = (await req.json()) as { direction: 'up' | 'down' }

  if (user && direction != null) {
    await voteForComment({
      commentId: comment_id,
      authorId: user._id,
      rate: direction === 'up' ? 0.5 : -0.5
    })
  }

  const votesBalance = await getCommentVotesBalance(comment_id)

  return new Response(JSON.stringify({
    rating: votesBalance
  }))
}
