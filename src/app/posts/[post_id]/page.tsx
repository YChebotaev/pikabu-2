import { ErrorLayout, SiteLayout, TwoColumnsLayout } from "@/layouts";
import { cookies } from "next/headers";
import { Post, PostComments } from "@/components";
import { getPost, getUserBySessionId } from "@/services";
import { CommentForm } from "@/components/CommentForm";

export default async function Page({
  params: { post_id },
}: {
  params: { post_id: string };
}) {
  const cookiesSessionId = cookies().get("session_id")?.value;
  const user = cookiesSessionId
    ? await getUserBySessionId(cookiesSessionId)
    : undefined;
  const post = await getPost(post_id);

  if (post == null) {
    return <ErrorLayout>Такого поста нет</ErrorLayout>;
  }

  return (
    <SiteLayout authenticated={user != null}>
      <div className="py-2">
        <TwoColumnsLayout>
          <Post
            id={post._id}
            title={post.title}
            content={post.content}
            author={post.author}
            votesBalance={post.votesBalance}
            createdAt={post.createdAt}
            authenticated={user != null}
          />
          <div className="mt-2">
            <PostComments
              post={post}
              comments={post.comments}
              authenticated={user != null}
            />
          </div>
          <div className="mt-2">
            <CommentForm postId={post._id} />
          </div>
        </TwoColumnsLayout>
      </div>
    </SiteLayout>
  );
}
