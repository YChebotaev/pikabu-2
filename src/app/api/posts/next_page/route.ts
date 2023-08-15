import { headers } from 'next/headers'

export const POST = async (req: Request) => {
  const origin = headers().get("origin")!
  const formData = await req.formData()
  const currentPage = Number(formData.get('current_page')!)
  const ribbon = String(formData.get('ribbon')!)

  if (ribbon === 'hot') {
    const url = new URL('/', origin)

    url.searchParams.set('page', String(currentPage + 1))

    return Response.redirect(url)
  } else {
    const url = new URL(`/${ribbon}`, origin)

    url.searchParams.set('page', String(currentPage + 1))

    return Response.redirect(url)
  }
}
