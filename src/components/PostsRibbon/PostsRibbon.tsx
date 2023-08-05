import { type FC } from "react";
import { type Post as PostType } from "@/services";
import { Post } from "@/components";

export const PostsRibbon: FC<{ posts: PostType[]; authenticated: boolean }> = ({
  posts,
  authenticated,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <Post
          key={post._id}
          id={post._id}
          title={post.title}
          votesBalance={post.votesBalance}
          createdAt={post.createdAt}
          content={post.content}
          author={post.author}
          authenticated={authenticated}
        />
      ))}
    </div>
  );
};
