import { type FC } from "react";
import { type User } from "@/services";

export const UserProfile: FC<{ editable: boolean; user?: User }> = ({
  editable,
  user,
}) => <div>{null}</div>;
