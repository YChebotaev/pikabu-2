import { cookies } from "next/headers";
import {
  getUserBySessionId,
  getUser,
  getUserResponsesForAllComments,
} from "@/services";
import { SiteLayout, TwoColumnsLayout } from "@/layouts";
import { PersonalControlPanel, UserCommentsList } from "@/components";

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
  const comments = await getUserResponsesForAllComments(user_id, sessionUser?._id);

  return (
    <SiteLayout authenticated={authenticated}>
      <TwoColumnsLayout
        aside={
          <>
            {authenticated && (
              <PersonalControlPanel user={paramUser} menuActiveItem="answers" />
            )}
          </>
        }
      >
        <div className="text-2xl">Ответы</div>
        <UserCommentsList comments={comments} authenticated={authenticated} />
      </TwoColumnsLayout>
    </SiteLayout>
  );
}
