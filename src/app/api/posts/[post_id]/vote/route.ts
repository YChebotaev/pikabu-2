import { cookies } from 'next/headers'
import { getUserBySessionId, voteForPost, getPostVotesBalance } from '@/services'

export const POST = async (req: Request, { params: { post_id } }: { params: { post_id: string } }) => {
  const cookiesSessionId = cookies().get("session_id")?.value;
  const user = cookiesSessionId
    ? await getUserBySessionId(cookiesSessionId)
    : undefined;
  const { direction } = (await req.json()) as { direction: 'up' | 'down' }

  if (user && direction != null) {
    await voteForPost({
      postId: post_id,
      authorId: user._id,
      rate: direction === 'up' ? 1 : -1
    })
  }

  const votesBalance = await getPostVotesBalance(post_id)

  return new Response(JSON.stringify({
    rating: votesBalance
  }))
}
