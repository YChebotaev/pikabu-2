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
  votedByMe: boolean | null;
  bookmarkedByMe?: boolean | null;
}> = ({
  authenticated,
  votesBalance,
  postId,
  authorId,
  authorUsername,
  authorAvatarSrc,
  votedByMe,
  bookmarkedByMe,
}) => (
  <div className="flex gap-2 text-sm text-slate-700">
    {authenticated && (
      <RatingControl
        voted={votedByMe}
        postId={postId}
        initialRating={votesBalance}
      />
    )}{" "}
    {authenticated && bookmarkedByMe != null && (
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
