import { type FC } from "react";
import { type Post as PostType } from "@/services";
import { Post } from "@/components";

export const PostsRibbon: FC<{
  page: number;
  posts: PostType[];
  ribbon: string;
  authenticated: boolean;
}> = ({ page, posts, ribbon, authenticated }) => {
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
      {posts.length > 0 && (
        <form action={"/api/posts/next_page"} method="POST">
          <input type="hidden" name="current_page" value={page} />
          <input type="hidden" name="ribbon" value={ribbon} />
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-[#be3455] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#e54d71] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#be3455]"
          >
            Еще посты
          </button>
        </form>
      )}
    </div>
  );
};
