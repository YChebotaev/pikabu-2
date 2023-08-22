import { type FC } from "react";
import { formatDistance } from "date-fns";
import ru from "date-fns/locale/ru";
import { type User } from "@/services";
import { Cover } from "./Cover";
import { Avatar } from "./Avatar";
import { Username } from "./Username";
import { VotesCount } from "./VotesCount";
import { Stats } from "./Stats";

const getLogningStr = (dateInt: number) => {
  return (
    formatDistance(new Date(), dateInt, {
      locale: ru,
    }) + " назад"
  );
};

export const Header: FC<{ editable: boolean; user: User }> = ({
  user,
  editable,
}) => (
  <div className="shadow rounded">
    <Cover src={user.cover.src} editable={editable} userId={user._id} />
    <div
      className="relative"
      style={{ top: "-80px", right: "-20px", height: 0 }}
    >
      <Avatar src={user.avatar.src} editable={editable} userId={user._id} />
    </div>
    <div className="mt-11 p-6">
      <Username username={user.username} />
      <div>Зарегистрировался {getLogningStr(user.createdAt)}</div>
    </div>
    <hr />
    <div className="p-6">
      <VotesCount
        votedUpCount={user.votedUpCount}
        votedDownCount={user.votedDownCount}
      />
    </div>
    <hr />
    <div className="p-6">
      <Stats
        rating={user.rating}
        followersCount={user.followersCount}
        followsCount={user.followsCount}
        postsCount={user.postsCount}
      />
    </div>
  </div>
);
