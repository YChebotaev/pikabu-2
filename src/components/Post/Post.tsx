"use client";

import { useState, type FC } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import { type Content, type User } from "@/services";

export const Post: FC<{
  id: string;
  title: string;
  content: Content;
  author: User;
  votesBalance: number;
  createdAt: number;
  authenticated: boolean;
}> = ({
  id,
  title,
  content,
  author,
  votesBalance: initialVotesBalance,
  createdAt,
  authenticated,
}) => {
  const [votesBalance, setVotesBalance] = useState(initialVotesBalance);
  const createVoteHandler = (rate: number) => async () => {
    const res = await fetch(`/api/posts/${id}/vote`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        rate,
      }),
    });
    const { newPostVotesBalance } = (await res.json()) as {
      newPostVotesBalance: number;
    };

    setVotesBalance(newPostVotesBalance);
  };

  return (
    <div id={id} className="rounded shadow p-2">
      <div className="text-lg font-semibold">{title}</div>
      <div>
        {content.type === "markdown" && (
          <ReactMarkdown>{content.content}</ReactMarkdown>
        )}
      </div>
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
        <Link href={`/posts/${id}`} className="underline">
          Комментарии
        </Link>
      </div>
    </div>
  );
};
