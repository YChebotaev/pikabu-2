import { type FC } from "react";
import dynamic from "next/dynamic";
import { Post, type Comment as CommentType } from "@/services";

const Comment = dynamic(() =>
  import("@/components/Comment").then((m) => m.Comment),
);

export const Children: FC<{
  post: Post;
  comments: CommentType[];
  authenticated: boolean;
}> = ({ post, comments, authenticated }) => (
  <div className="pl-4 flex flex-col gap-y-2">
    {comments.map((comment) => (
      <Comment
        key={comment._id}
        id={comment._id}
        author={comment.author}
        content={comment.content}
        votesBalance={comment.votesBalance}
        createdAt={comment.createdAt}
        comments={comment.comments}
        post={post}
        authenticated={authenticated}
      />
    ))}
  </div>
);
