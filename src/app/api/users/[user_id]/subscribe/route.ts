import { headers, cookies } from 'next/headers'
import { getUserBySessionId, userSubscribeToUser } from '@/services'

export const POST = async (req: Request, { params: { user_id } }: { params: { user_id: string } }) => {
  const origin = headers().get("origin")!
  const cookiesSessionId = cookies().get("session_id")?.value;
  const user = cookiesSessionId
    ? await getUserBySessionId(cookiesSessionId)
    : undefined;

  if (user) {
    await userSubscribeToUser(user._id, user_id)

    return Response.redirect(origin + `/users/${user_id}`)
  }

  return new Response()
}
