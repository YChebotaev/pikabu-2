import { type FC } from "react";
import Link from "next/link";
import ru from "date-fns/locale/ru";
import ReactMarkdown from "react-markdown";
import { formatDistance } from "date-fns";
import { type Content, type User } from "@/services";
import { PostViewTracker } from "../PostViewTracker";
import { AuthorityControl } from "../AuthorityControl";

export const Post: FC<{
  id: string;
  title: string;
  content: Content;
  author: User;
  votesBalance: number;
  createdAt: number;
  authenticated: boolean;
  trackView?: boolean;
  commentsCount: number | null
  bookmarkedByMe: boolean | null
  votedByMe: boolean | null
}> = ({
  id,
  title,
  content,
  author,
  votesBalance,
  createdAt,
  authenticated,
  trackView = false,
  commentsCount,
  bookmarkedByMe,
  votedByMe
}) => {
  const agoDisplayString =
    formatDistance(new Date(), createdAt, {
      locale: ru,
    }) + " назад";

  return (
    <div id={id} className="rounded shadow p-2">
      <div className="text-lg font-semibold">{title}</div>
      {trackView && <PostViewTracker postId={id} />}
      <div>
        {content.type === "markdown" && (
          <ReactMarkdown>{content.content}</ReactMarkdown>
        )}
      </div>
      <div className="flex gap-2 text-sm text-slate-700 mt-2">
        <AuthorityControl
          authenticated={authenticated}
          votesBalance={votesBalance}
          postId={id}
          authorId={author._id}
          authorUsername={author.username}
          authorAvatarSrc={author.avatar.src}
          votedByMe={votedByMe}
          bookmarkedByMe={bookmarkedByMe}
          votePlusRate={0.5}
          voteMinusRate={0.5}
        />
        {agoDisplayString}
        {" | "}
        <Link href={`/posts/${id}`} className="underline">
          Комментарии ({commentsCount})
        </Link>
      </div>
    </div>
  );
};
