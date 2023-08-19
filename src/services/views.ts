import { viewsDb } from '@/db'

export const markUserViewedPost = async (userId: string, postId: string) => {
  const { docs: [oldView] } = await (await viewsDb).find({
    selector: {
      type: 'post',
      postId,
      userId
    }
  })

  if (oldView) {
    // Do nothing
  } else {
    await (await viewsDb).insert({
      type: 'post',
      postId,
      userId
    })
  }
}
