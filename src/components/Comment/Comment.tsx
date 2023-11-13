"use client";

import { useState, type FC } from "react";
import ReactMarkdown from "react-markdown";
import { formatDistance } from "date-fns";
import ru from "date-fns/locale/ru";
import {
  type User,
  type Content,
  type Comment as CommentType,
  type Post,
} from "@/services";
import { Children } from "./Children";
import { CommentForm } from "../CommentForm";
import { AuthorityControl } from "../AuthorityControl";

export const Comment: FC<{
  id: string;
  author: User;
  content: Content;
  votesBalance: number;
  createdAt: number;
  comments: CommentType[];
  post: Post;
  authenticated: boolean;
  votedByMe: boolean;
}> = ({
  id,
  author,
  content,
  votesBalance,
  createdAt,
  comments,
  post,
  authenticated,
  votedByMe,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const agoDisplayString =
    formatDistance(new Date(), createdAt, {
      locale: ru,
    }) + " назад";

  return (
    <div>
      <div>
        {content.type === "markdown" && (
          <ReactMarkdown>{content.content}</ReactMarkdown>
        )}
      </div>
      <div>
        <div className="text-sm text-slate-700">
          <AuthorityControl
            authenticated={authenticated}
            votesBalance={votesBalance}
            postId={post._id}
            authorId={author._id}
            authorUsername={author.username}
            authorAvatarSrc={author.avatar.src}
            votedByMe={votedByMe}
          />
          {agoDisplayString}
          {" | "}
          <span
            className="underline cursor-pointer"
            onClick={() => setShowReplyForm(true)}
          >
            Ответить
          </span>
        </div>
      </div>
      {showReplyForm && (
        <div className="mt-2 pl-4">
          <CommentForm postId={post._id} parentId={id} />
        </div>
      )}
      <div className="mt-2">
        <Children
          post={post}
          comments={comments}
          authenticated={authenticated}
        />
      </div>
    </div>
  );
};
