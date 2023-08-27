"use client";

import { useState, type FC } from "react";
import { BookmarkCheckFillIcon, BookmarkIcon } from "../icons";

export const BookmarkControl: FC<{
  postId: string;
  bookmarked: boolean | null;
}> = ({ postId, bookmarked }) => {
  const [checked, setChecked] = useState(bookmarked);

  return (
    <a
      href="#"
      className="inline-block rounded bg-slate-200 border border-slate-200 text-xs p-0.5 cursor-pointer"
      onClick={async (e) => {
        e.preventDefault();

        const res = await fetch(`/api/posts/${postId}/bookmark`, {
          method: "POST",
          body: JSON.stringify({
            bookmarked: !checked,
          }),
        });

        const { bookmarked } = (await res.json()) as { bookmarked: boolean };

        setChecked(bookmarked);
      }}
    >
      {checked ? <BookmarkCheckFillIcon /> : <BookmarkIcon />}
    </a>
  );
};
