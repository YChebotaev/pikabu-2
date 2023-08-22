import { Buffer } from 'node:buffer'
import { writeFile } from 'node:fs/promises'
import { randomBytes } from 'node:crypto'
import path from 'node:path'
import process from 'node:process'
import { headers, cookies } from 'next/headers'
import { getUserBySessionId, updateUserAvatar } from '@/services'

export const POST = async (req: Request) => {
  const origin = headers().get("origin")!
  const cookiesSessionId = cookies().get("session_id")?.value;
  const user = cookiesSessionId
    ? await getUserBySessionId(cookiesSessionId)
    : undefined;

  if (user) {
    const formData = await req.formData()
    const avatar = formData.get('avatar')! as Blob
    const avatarBuffer = Buffer.from(await avatar.arrayBuffer())
    const fileName = randomBytes(20).toString('hex')
    const filePath = path.join(process.cwd(), '/public/avatars', fileName)

    await writeFile(filePath, avatarBuffer, { flag: 'w+' })
    await updateUserAvatar(user._id, fileName)

    return Response.redirect(origin + `/users/${user._id}`)
  }

  return new Response()
}
