import { cookies } from "next/headers";
import {
  getUserBySessionId,
  getUser,
  getPostsViewedByUser,
} from "@/services";
import { SiteLayout, TwoColumnsLayout } from "@/layouts";
import {
  PersonalControlPanel,
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
  const posts = await getPostsViewedByUser(user_id);

  return (
    <SiteLayout authenticated={authenticated}>
      <TwoColumnsLayout
        aside={
          <>
            {authenticated && (
              <PersonalControlPanel user={paramUser} menuActiveItem="visited" />
            )}
          </>
        }
      >
        <div className="text-2xl">Просмотренные посты</div>
        <UserPostsRibbon posts={posts} authenticated={authenticated} />
      </TwoColumnsLayout>
    </SiteLayout>
  );
}
