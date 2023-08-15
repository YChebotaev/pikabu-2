import { cookies } from "next/headers";
import { SiteLayout, TwoColumnsLayout } from "@/layouts";
import { getHotPosts, getUserBySessionId } from "@/services";
import { PostsRibbon } from "@/components";

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
  });

  return (
    <SiteLayout authenticated={user != null} topBarLinksActive="hot">
      <div className="py-2">
        <TwoColumnsLayout>
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
