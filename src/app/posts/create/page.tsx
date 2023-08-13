import { cookies } from "next/headers";
import Link from "next/link";
import { PostCreateForm } from "@/components";
import { SiteLayout, ErrorLayout, TwoColumnsLayout } from "@/layouts";
import { getUserBySessionId } from "@/services";
import type { PostCreateErrorCodes } from "@/types";

export default async function Page({
  searchParams: { error_code, title, content },
}: {
  searchParams: { error_code?: string; title?: string; content?: string };
}) {
  const cookiesSessionId = cookies().get("session_id")?.value;
  const user = cookiesSessionId
    ? await getUserBySessionId(cookiesSessionId)
    : undefined;

  if (user == null) {
    return (
      <ErrorLayout>
        <Link href="/signin" className="underline">
          Войдите
        </Link>
        , чтобы создать пост
      </ErrorLayout>
    );
  }

  return (
    <SiteLayout authenticated>
      <TwoColumnsLayout>
        <div className="mt-2">
          <PostCreateForm
            errorCode={error_code as PostCreateErrorCodes}
            initialTitle={title}
            initialContent={content}
          />
        </div>
      </TwoColumnsLayout>
    </SiteLayout>
  );
}
