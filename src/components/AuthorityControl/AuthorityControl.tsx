import { type FC } from "react";
import Link from "next/link";
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
}> = ({
  authenticated,
  votesBalance,
  postId,
  authorId,
  authorUsername,
  authorAvatarSrc,
  bookmarkedByMe,
  votedByMe,
}) => (
  <div className="flex gap-2 text-sm text-slate-700">
    {authenticated && (
      <RatingControl
        voted={votedByMe}
        postId={postId}
        initialRating={votesBalance}
      />
    )}{" "}
    {authenticated && <BookmarkControl bookmarked={bookmarkedByMe} postId={postId} />} Написал{" "}
    <Username
      id={authorId}
      username={authorUsername}
      avatarSrc={authorAvatarSrc}
    />
  </div>
);
