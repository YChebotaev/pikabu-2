import { headers, cookies } from 'next/headers'
import type { SignupErrorCodes } from '@/types'
import { getUser, registerUser } from '@/services'
import { usersDb } from '@/db'

export const POST = async (req: Request) => {
  const origin = headers().get("origin")!
  const formData = await req.formData()
  const username = String(formData.get('username')!)
  const email = String(formData.get("email")!)
  const password = String(formData.get('password')!)
  const password2 = String(formData.get('password_2')!)
  let errorCode: SignupErrorCodes | undefined = undefined

  do {
    if (!username) {
      errorCode = 'username_empty'

      break
    }

    if (!/^[a-zA-Z0-9\-\_\$]{3,}$/.test(username)) {
      errorCode = 'username_pattern'

      break
    }

    if (!email) {
      errorCode = 'email_empty'

      break
    }

    if (!password) {
      errorCode = 'password_empty'

      break
    }

    if (password !== password2) {
      errorCode = 'passwords_not_match'

      break
    }

    if (!email.includes('@')) {
      errorCode = 'email_pattern'

      break
    }
  } while (false)

  if (errorCode) {
    const redirectURL = new URL('/signup', origin)

    redirectURL.searchParams.set('error_code', errorCode)

    if (username) {
      redirectURL.searchParams.set('username', username)
    }

    if (email) {
      redirectURL.searchParams.set('email', email)
    }

    return Response.redirect(redirectURL)
  } else {
    const userId = await registerUser({
      username,
      email,
      rawPassword: password
    })
    const { sessionId } = await (await usersDb).get(userId)

    cookies().set('session_id', sessionId)

    return Response.redirect(origin + '/fresh')
  }
}
