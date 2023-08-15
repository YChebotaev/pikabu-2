import { cookies } from "next/headers";
import Link from "next/link";
import { SiteLayout, ErrorLayout, TwoColumnsLayout } from "@/layouts";
import { getFreshPosts, getUserBySessionId } from "@/services";
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

  if (user == null) {
    return (
      <ErrorLayout>
        <Link href="/signin" className="underline">
          Войдите
        </Link>
        , чтобы просмотреть «свежее»
      </ErrorLayout>
    );
  }

  const freshPosts = await getFreshPosts({
    page,
    limit: 30,
  });

  return (
    <SiteLayout authenticated={user != null} topBarLinksActive="fresh">
      <div className="py-2">
        <TwoColumnsLayout>
          <PostsRibbon
            page={page}
            ribbon="fresh"
            posts={freshPosts}
            authenticated={user != null}
          />
        </TwoColumnsLayout>
      </div>
    </SiteLayout>
  );
}
