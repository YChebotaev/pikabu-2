import { cookies } from 'next/headers'
import { getUserBySessionId, voteForComment, getCommentVotesBalance } from '@/services'

export const POST = async (req: Request, { params: { comment_id } }: { params: { comment_id: string } }) => {
  const cookiesSessionId = cookies().get("session_id")?.value;
  const user = cookiesSessionId
    ? await getUserBySessionId(cookiesSessionId)
    : undefined;
  const { rate } = (await req.json()) as { rate: number }

  if (user && rate != null) {
    await voteForComment({
      commentId: comment_id,
      authorId: user._id,
      rate
    })
  }

  const votesBalance = await getCommentVotesBalance(comment_id)

  return new Response(JSON.stringify({
    newCommentVotesBalance: votesBalance
  }))
}
