import { cookies } from "next/headers";
import {
  getUserBySessionId,
  getUser,
  getPostsBookmarkedByUser,
} from "@/services";
import { SiteLayout, TwoColumnsLayout } from "@/layouts";
import {
  PersonalControlPanel,
  UserCommentsList,
  UserPostsRibbon,
} from "@/components";

export default async function Page({
  params: { user_id },
}: {
  params: { user_id: string };
}) {
  const cookiesSessionId = cookies().get("session_id")?.value;
  const sessionUser = cookiesSessionId
    ? await getUserBySessionId(cookiesSessionId)
    : undefined;
  const authenticated = sessionUser != null;
  const paramUser = await getUser(user_id);
  const posts = await getPostsBookmarkedByUser(user_id);

  return (
    <SiteLayout authenticated={authenticated}>
      <TwoColumnsLayout
        aside={
          <>
            {authenticated && (
              <PersonalControlPanel user={paramUser} menuActiveItem="saved" />
            )}
          </>
        }
      >
        <div className="text-2xl">Сохраненные посты</div>
        <UserPostsRibbon posts={posts} authenticated={authenticated} />
      </TwoColumnsLayout>
    </SiteLayout>
  );
}
