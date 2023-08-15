import { cookies } from "next/headers";
import { getUserBySessionId, getUser } from "@/services";
import { SiteLayout, TwoColumnsLayout } from "@/layouts";
import { UserProfile } from "@/components";

export default async function Page({
  params: { user_id },
}: {
  params: { user_id: string };
}) {
  const cookiesSessionId = cookies().get("session_id")?.value;
  const sessionUser = cookiesSessionId
    ? await getUserBySessionId(cookiesSessionId)
    : undefined;
  const paramUser = await getUser(user_id);

  return (
    <SiteLayout authenticated={sessionUser != null}>
      <div className="py-2">
        <TwoColumnsLayout>
          <UserProfile
            editable={sessionUser?._id === user_id}
            user={paramUser}
          />
        </TwoColumnsLayout>
      </div>
    </SiteLayout>
  );
}
