import { type FC } from "react";
import { formatDistance } from "date-fns";
import ru from "date-fns/locale/ru";
import { type User } from "@/services";
import { Cover } from "./Cover";
import { Avatar } from "./Avatar";
import { Username } from "./Username";
import { VotesCount } from "./VotesCount";
import { Stats } from "./Stats";
import { SubscribeButton } from "./SubscribeButton";

const getLogningStr = (dateInt: number) => {
  return (
    formatDistance(new Date(), dateInt, {
      locale: ru,
    }) + " назад"
  );
};

export const Header: FC<{
  editable: boolean;
  user: User;
  itsMyself: boolean;
  iAmSubscribedToUser: boolean;
}> = ({ user, editable, itsMyself, iAmSubscribedToUser }) => (
  <div className="shadow rounded">
    <Cover src={user.cover.src} editable={editable} userId={user._id} />
    <div
      className="relative"
      style={{ top: "-80px", right: "-20px", height: 0 }}
    >
      <Avatar src={user.avatar.src} editable={editable} userId={user._id} />
    </div>
    {itsMyself || (
      <div data-itsmyself={itsMyself} className="p-3 height-0">
        <div className="float-right">
          <SubscribeButton subscribed={iAmSubscribedToUser} userId={user._id} />
        </div>
        <div className="clearfix" />
      </div>
    )}
    <div className="mt-5 p-6">
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
