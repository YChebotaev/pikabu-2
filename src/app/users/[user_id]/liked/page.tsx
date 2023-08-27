import { cookies } from "next/headers";
import { getUserBySessionId, getUser, getUserPostsVotedFor } from "@/services";
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
  const posts = await getUserPostsVotedFor(user_id, sessionUser?._id);

  return (
    <SiteLayout authenticated={authenticated}>
      <TwoColumnsLayout
        aside={
          <>
            {authenticated && (
              <PersonalControlPanel user={paramUser} menuActiveItem="liked" />
            )}
          </>
        }
      >
        <div className="text-2xl">Оценки</div>
        <UserPostsRibbon posts={posts} authenticated={authenticated} />
      </TwoColumnsLayout>
    </SiteLayout>
  );
}
