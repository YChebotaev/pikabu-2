"use client";

import { useState, type FC } from "react";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import {
  type User,
  type Content,
  type Comment as CommentType,
  type Post,
} from "@/services";
import { Children } from "./Children";
import { CommentForm } from "../CommentForm";

export const Comment: FC<{
  id: string;
  author: User;
  content: Content;
  votesBalance: number;
  createdAt: number;
  comments: CommentType[];
  post: Post;
  authenticated: boolean;
}> = ({
  id,
  author,
  content,
  votesBalance: initialVotesBalance,
  createdAt,
  comments,
  post,
  authenticated,
}) => {
  const [votesBalance, setVotesBalance] = useState(initialVotesBalance);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const createVoteHandler = (rate: number) => async () => {
    const res = await fetch(`/api/comments/${id}/vote`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        rate,
      }),
    });
    const { newCommentVotesBalance } = (await res.json()) as {
      newCommentVotesBalance: number;
    };

    setVotesBalance(newCommentVotesBalance);
  };

  return (
    <div>
      <div>
        {content.type === "markdown" && (
          <ReactMarkdown>{content.content}</ReactMarkdown>
        )}
      </div>
      <div>
        <div className="text-sm text-slate-700">
          Написал {author.username} {format(createdAt, "dd.MM.yyyy в HH:mm")} (
          {votesBalance}){" "}
          {authenticated && (
            <>
              <span
                className="underline cursor-pointer"
                onClick={createVoteHandler(+1)}
              >
                +1
              </span>{" "}
              |{" "}
              <span
                className="underline cursor-pointer"
                onClick={createVoteHandler(-1)}
              >
                -1
              </span>{" "}
              |{" "}
            </>
          )}
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
