import { type FC } from "react";
import { type User as UserType } from "@/services";
import { User } from "./User";
import { Stats } from "./Stats";
import { Menu } from "./Menu";

export const PersonalControlPanel: FC<{ user: UserType }> = ({ user }) => (
  <div className="shadow rounded">
    <div className="p-4">
      <User
        id={user._id}
        username={user.username}
        avatarSrc={user.avatar.src}
      />
    </div>
    <hr />
    <div className="p-4">
      <Stats rating={user.rating} followersCount={user.followersCount} />
    </div>
    <hr />
    <div className="p-4">
      <Menu userId={user._id} />
    </div>
  </div>
);
