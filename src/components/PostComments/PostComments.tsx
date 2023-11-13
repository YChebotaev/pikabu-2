import { type FC } from "react";
import { type Comment as CommentType, type Post } from "@/services";
import { Comment } from "@/components";

export const PostComments: FC<{
  post: Post;
  comments: CommentType[];
  authenticated: boolean;
}> = ({ post, comments, authenticated }) => (
  <div className="flex flex-col gap-y-2">
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
        votedByMe={comment.votedByMe!}
      />
    ))}
  </div>
);
