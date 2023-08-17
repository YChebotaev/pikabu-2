import { type FC } from "react";
import { type User } from "@/services";
import { Header } from "./Header";

export const UserProfileDetail: FC<{ editable: boolean; user: User }> = ({
  editable,
  user,
}) => (
  <div>
    <Header user={user} editable={editable} />
  </div>
);
