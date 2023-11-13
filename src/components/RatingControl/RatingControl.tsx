"use client";

import { useState, type FC } from "react";
import { PlusIcon, MinusIcon, BlockIcon } from "@/components/icons";

const createVoteHandler = <
  R = { rating: number },
  B = { direction: "up" | "down" },
>({
  url,
  body,
  onSuccess,
  onFail,
  onComplete,
}: {
  url: string;
  body?: B;
  onSuccess?(r: R): void;
  onFail?(e: unknown): void;
  onComplete?(): void;
}) => {
  return async () => {
    try {
      const res = await fetch(url, {
        method: "POST",
        ...(body
          ? {
              body: JSON.stringify(body),
            }
          : {}),
      });
      const data = (await res.json()) as R;

      if (typeof onSuccess === "function") {
        await onSuccess(data);
      }
    } catch (e) {
      if (typeof onFail === "function") {
        await onFail(e);
      }
    } finally {
      if (typeof onComplete === "function") {
        await onComplete();
      }
    }
  };
};

export const RatingControl: FC<{
  initialRating: number;
  commentId?: string;
  postId?: string;
  voted: boolean | null;
}> = ({ initialRating, postId, commentId, voted: initialVoted }) => {
  const [rating, setRating] = useState(initialRating);
  const [voted, setVoted] = useState(initialVoted);

  const votePlusHandler = createVoteHandler({
    url: postId
      ? `/api/posts/${postId}/vote`
      : `/api/comments/${commentId}/vote`,
    body: { direction: "up" },
    onSuccess({ rating }) {
      setRating(rating);
      setVoted(true);
    },
  });

  const voteMinusHandler = createVoteHandler({
    url: postId
      ? `/api/posts/${postId}/vote`
      : `/api/comments/${commentId}/vote`,
    body: { direction: "down" },
    onSuccess({ rating }) {
      setRating(rating);
      setVoted(true);
    },
  });

  const unvoteHandler = createVoteHandler({
    url: postId
      ? `/api/posts/${postId}/unvote`
      : `/api/comments/${commentId}/unvote`,
    onSuccess({ rating }) {
      setRating(rating);
      setVoted(false);
    },
  });

  return (
    <div className="inline-flex gap-1 rounded bg-slate-200 border border-slate-200 text-xs">
      {voted ? (
        <>
          <button
            className="px-1 rounded font-bold hover:bg-slate-300"
            onClick={unvoteHandler}
          >
            <BlockIcon />
          </button>
          <div className="rounded px-2 bg-slate-50">{rating}</div>
          <button
            className="px-1 rounded font-bold hover:bg-slate-300"
            onClick={unvoteHandler}
          >
            <BlockIcon />
          </button>
        </>
      ) : (
        <>
          <button
            className="px-1 rounded font-bold hover:bg-slate-300"
            onClick={votePlusHandler}
          >
            <PlusIcon />
          </button>
          <div className="rounded px-2 bg-slate-50">{rating}</div>
          <button
            className="px-1 rounded font-bold hover:bg-slate-300"
            onClick={voteMinusHandler}
          >
            <MinusIcon />
          </button>
        </>
      )}
    </div>
  );
};
