import { createHash } from 'node:crypto'
import { headers, cookies } from 'next/headers'
import type { SigninErrorCodes } from '@/types'
import { getUserByEmail, getUserByUsername } from '@/services'

const getUserByIdentity = async (identityType: 'email' | 'username', identity: string) => {
  if (identityType === 'email') {
    return getUserByEmail(identity)
  }

  if (identityType === 'username') {
    return getUserByUsername(identity)
  }
}

export const POST = async (req: Request) => {
  const origin = headers().get("origin")!
  const formData = await req.formData()
  const identity = String(formData.get('identity')!)
  const identityType: 'email' | 'username' = identity.includes('@') ? 'email' : 'username'
  const password = String(formData.get('password')!)
  let errorCode: SigninErrorCodes | undefined = undefined

  do {
    if (!identity) {
      errorCode = 'identity_empty'

      break
    }

    if (identityType === 'username') {
      if (!/^[a-zA-Z0-9\-\_\$]{3,}$/.test(identity)) {
        errorCode = 'identity_pattern'

        break
      }
    }

    const user = await getUserByIdentity(identityType, identity)

    if (user == null) {
      errorCode = 'password_mismatch'

      break
    }

    const passwordHash = createHash('sha256').update(password).update(user.passwordSalt).digest('hex')

    if (passwordHash !== user.passwordHash) {
      errorCode = 'password_mismatch'

      break
    }
  } while (false)

  if (errorCode) {
    const redirectURL = new URL('/signin', origin)

    redirectURL.searchParams.set('error_code', errorCode)

    if (identity) {
      redirectURL.searchParams.set('identity', identity)
    }

    return Response.redirect(redirectURL)
  } else {
    const user = await getUserByIdentity(identityType, identity)

    if (user) {
      cookies().set('session_id', user.sessionId)

      return Response.redirect(origin + '/fresh')
    } else {
      return new Response("Cannot get user")
    }
  }
}
