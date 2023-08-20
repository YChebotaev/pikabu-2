import { type FC } from "react";
import Link from "next/link";
import ru from "date-fns/locale/ru";
import ReactMarkdown from "react-markdown";
import { formatDistance } from "date-fns";
import { RatingControl } from "@/components/RatingControl";
import { type Content, type User } from "@/services";
import { BookmarkControl } from "../BookmarkControl";
import { PostViewTracker } from "../PostViewTracker";

export const Post: FC<{
  id: string;
  title: string;
  content: Content;
  author: User;
  votesBalance: number;
  createdAt: number;
  authenticated: boolean;
  trackView?: boolean;
}> = ({
  id,
  title,
  content,
  author,
  votesBalance,
  createdAt,
  authenticated,
  trackView = false,
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
        {authenticated && (
          <RatingControl postId={id} initialRating={votesBalance} />
        )}{" "}
        {authenticated && <BookmarkControl postId={id} />} Написал{" "}
        <Link href={`/users/${author._id}`}>{author.username}</Link>{" "}
        {agoDisplayString}
        {" | "}
        <Link href={`/posts/${id}`} className="underline">
          Комментарии
        </Link>
      </div>
    </div>
  );
};
