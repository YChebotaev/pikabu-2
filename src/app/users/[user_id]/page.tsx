import { cookies } from "next/headers";
import { getUserBySessionId, getUser, getUserPosts } from "@/services";
import { SiteLayout, TwoColumnsLayout } from "@/layouts";
import {
  PersonalControlPanel,
  UserPostsRibbon,
  UserProfileDetail,
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
  const userPosts = await getUserPosts(paramUser._id, { page: 0, limit: 100 });

  return (
    <SiteLayout authenticated={authenticated}>
      <div className="py-2">
        <TwoColumnsLayout
          aside={
            <>{authenticated && <PersonalControlPanel user={paramUser} />}</>
          }
        >
          <UserProfileDetail
            user={paramUser}
            editable={sessionUser?._id === user_id}
          />
          <div className="mt-4">
            <UserPostsRibbon posts={userPosts} authenticated={authenticated} />
          </div>
        </TwoColumnsLayout>
      </div>
    </SiteLayout>
  );
}
