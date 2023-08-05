import { cookies } from 'next/headers'
import { getUserBySessionId, voteForPost, getPostVotesBalance } from '@/services'

export const POST = async (req: Request, { params: { post_id } }: { params: { post_id: string } }) => {
  const cookiesSessionId = cookies().get("session_id")?.value;
  const user = cookiesSessionId
    ? await getUserBySessionId(cookiesSessionId)
    : undefined;
  const { rate } = (await req.json()) as { rate: number }

  if (user && rate != null) {
    await voteForPost({
      postId: post_id,
      authorId: user._id,
      rate
    })
  }

  const votesBalance = await getPostVotesBalance(post_id)

  return new Response(JSON.stringify({
    newPostVotesBalance: votesBalance
  }))
}
