import { type FC } from "react";
import ReactMarkdown from "react-markdown";
import { formatDistance } from "date-fns";
import ru from "date-fns/locale/ru";
import { RatingControl } from "@/components/RatingControl";
import { type User, type Content } from "@/services";

export const Comment: FC<{
  id: string;
  author: User;
  content: Content;
  votesBalance: number;
  createdAt: number;
  authenticated: boolean;
  votedByMe: boolean;
}> = ({
  id,
  author,
  content,
  votesBalance,
  createdAt,
  authenticated,
  votedByMe,
}) => {
  const agoDisplayString =
    formatDistance(new Date(), createdAt, {
      locale: ru,
    }) + " назад";

  return (
    <div className="shadow rounded p-2">
      <div>
        {content.type === "markdown" && (
          <ReactMarkdown>{content.content}</ReactMarkdown>
        )}
      </div>
      <div>
        <div className="text-sm text-slate-700">
          {authenticated && (
            <RatingControl
              commentId={id}
              initialRating={votesBalance}
              voted={votedByMe}
            />
          )}{" "}
          Написал {author.username} {agoDisplayString}
        </div>
      </div>
    </div>
  );
};
