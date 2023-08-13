"use client";

import { useState, type FC } from "react";
import { PlusIcon, MinusIcon } from '@/components/icons'

export const RatingControl: FC<{
  initialRating: number;
  commentId?: string;
  postId?: string;
}> = ({ initialRating, postId, commentId }) => {
  const [rating, setRating] = useState(initialRating);
  const createVoteHandler = (rate: number) => async () => {
    if (postId) {
      const res = await fetch(`/api/posts/${postId}/vote`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ rate }),
      });
      const { newPostVotesBalance } = (await res.json()) as {
        newPostVotesBalance: number;
      };

      setRating(newPostVotesBalance);
    } else if (commentId) {
      const res = await fetch(`/api/comments/${commentId}/vote`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ rate }),
      });
      const { newCommentVotesBalance } = (await res.json()) as {
        newCommentVotesBalance: number;
      };

      setRating(newCommentVotesBalance);
    }
  };

  return (
    <div className="inline-flex gap-1 rounded bg-slate-200 border border-slate-200 text-xs">
      <button
        className="px-1 rounded font-bold hover:bg-slate-300"
        onClick={createVoteHandler(1)}
      >
        <PlusIcon />
      </button>
      <div className="rounded px-2 bg-slate-50">{rating}</div>
      <button
        className="px-1 rounded font-bold hover:bg-slate-300"
        onClick={createVoteHandler(-1)}
      >
        <MinusIcon />
      </button>
    </div>
  );
};
