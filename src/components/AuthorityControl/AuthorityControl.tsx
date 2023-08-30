import { type FC } from "react";
import { Username } from "./Username";
import { RatingControl } from "../RatingControl";
import { BookmarkControl } from "../BookmarkControl";

export const AuthorityControl: FC<{
  authenticated: boolean;
  votesBalance: number;
  postId: string;
  authorId: string;
  authorUsername: string;
  authorAvatarSrc: string;
  bookmarkedByMe: boolean | null;
  votedByMe: boolean | null;
  votePlusRate: number;
  voteMinusRate: number;
}> = ({
  authenticated,
  votesBalance,
  postId,
  authorId,
  authorUsername,
  authorAvatarSrc,
  bookmarkedByMe,
  votedByMe,
  votePlusRate,
  voteMinusRate,
}) => (
  <div className="flex gap-2 text-sm text-slate-700">
    {authenticated && (
      <RatingControl
        voted={votedByMe}
        postId={postId}
        initialRating={votesBalance}
        plusRate={votePlusRate}
        minusRate={voteMinusRate}
      />
    )}{" "}
    {authenticated && (
      <BookmarkControl bookmarked={bookmarkedByMe} postId={postId} />
    )}{" "}
    Написал{" "}
    <Username
      id={authorId}
      username={authorUsername}
      avatarSrc={authorAvatarSrc}
    />
  </div>
);
