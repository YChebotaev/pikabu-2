import { type FC } from "react";
import Link from "next/link";
import ru from "date-fns/locale/ru";
import ReactMarkdown from "react-markdown";
import { formatDistance } from "date-fns";
import { RatingControl } from "@/components/RatingControl";
import { type Content, type User } from "@/services";

export const Post: FC<{
  id: string;
  title: string;
  content: Content;
  author: User;
  votesBalance: number;
  createdAt: number;
  authenticated: boolean;
}> = ({
  id,
  title,
  content,
  author,
  votesBalance,
  createdAt,
  authenticated,
}) => {
  const agoDisplayString =
    formatDistance(new Date(), createdAt, {
      locale: ru,
    }) + " назад";

  return (
    <div id={id} className="rounded shadow p-2">
      <div className="text-lg font-semibold">{title}</div>
      <div>
        {content.type === "markdown" && (
          <ReactMarkdown>{content.content}</ReactMarkdown>
        )}
      </div>
      <div className="text-sm text-slate-700 mt-2">
        {authenticated && (
          <RatingControl postId={id} initialRating={votesBalance} />
        )}{" "}
        Написал {author.username} {agoDisplayString}{" | "}
        <Link href={`/posts/${id}`} className="underline">
          Комментарии
        </Link>
      </div>
    </div>
  );
};
