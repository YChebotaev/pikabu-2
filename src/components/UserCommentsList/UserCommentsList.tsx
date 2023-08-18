import { type FC } from "react";
import { type Comment as CommentType } from "@/services";
import { Comment } from "./Comment";

export const UserCommentsList: FC<{
  comments: CommentType[];
  authenticated: boolean;
}> = ({ comments, authenticated }) => (
  <div className="flex flex-col gap-4">
    {comments.map(({ _id, author, content, votesBalance, createdAt }) => (
      <Comment
        key={_id}
        id={_id}
        author={author}
        content={content}
        votesBalance={votesBalance}
        createdAt={createdAt}
        authenticated={authenticated}
      />
    ))}
  </div>
);
