import { type FC } from "react";

const BUTTON_CLASSNAME =
  "rounded-md bg-[#be3455] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#e54d71] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#be3455]";

export const SubscribeButton: FC<{ subscribed: boolean; userId: string }> = ({
  subscribed,
  userId,
}) => (
  <form
    action={`/api/users/${userId}/${subscribed ? "unsubscribe" : "subscribe"}`}
    method="POST"
  >
    {subscribed ? (
      <button className={BUTTON_CLASSNAME}>Отписаться</button>
    ) : (
      <button className={BUTTON_CLASSNAME}>Подписаться</button>
    )}
  </form>
);
