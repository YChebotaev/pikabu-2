import { type FC } from "react";

export const Username: FC<{ username: string }> = ({ username }) => (
  <div className="text-2xl font-semibold">{username}</div>
);
