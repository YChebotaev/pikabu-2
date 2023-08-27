import { cookies } from "next/headers";
import { SiteLayout, TwoColumnsLayout } from "@/layouts";
import { getHotPosts, getUserBySessionId } from "@/services";
import { PersonalControlPanel, PostsRibbon } from "@/components";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    page: string;
  };
}) {
  const cookiesSessionId = cookies().get("session_id")?.value;
  const user = cookiesSessionId
    ? await getUserBySessionId(cookiesSessionId)
    : undefined;
  const page = Number(searchParams?.page ?? 0);
  const hotPosts = await getHotPosts({
    page,
    limit: 30,
    userId: user?._id
  });
  const authenticated = user != null;

  return (
    <SiteLayout authenticated={authenticated} topBarLinksActive="hot">
      <div className="py-2">
        <TwoColumnsLayout
          aside={<>{authenticated && <PersonalControlPanel user={user} />}</>}
        >
          <PostsRibbon
            page={page}
            ribbon="hot"
            posts={hotPosts}
            authenticated={user != null}
          />
        </TwoColumnsLayout>
      </div>
    </SiteLayout>
  );
}
