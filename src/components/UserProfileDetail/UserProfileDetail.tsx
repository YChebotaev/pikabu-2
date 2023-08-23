import { type FC } from "react";
import { type User } from "@/services";
import { Header } from "./Header";

export const UserProfileDetail: FC<{
  editable: boolean;
  user: User;
  iAmSubscribedToUser: boolean;
  itsMyself: boolean
}> = ({ editable, user, iAmSubscribedToUser, itsMyself }) => (
  <div>
    <Header
      user={user}
      editable={editable}
      itsMyself={itsMyself}
      iAmSubscribedToUser={iAmSubscribedToUser}
    />
  </div>
);
