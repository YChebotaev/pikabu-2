"use client";

import { useState, type FC } from "react";
import { BookmarkCheckFillIcon, BookmarkIcon } from "../icons";

export const BookmarkControl: FC<{ postId: string }> = ({ postId }) => {
  const [checked, setChecked] = useState(false);

  const clickHandler = async () => {
    await fetch(`/api/posts/${postId}/bookmark`, {
      method: "POST",
    });

    setChecked(true);
  };

  return (
    <div
      className="inline-block rounded bg-slate-200 border border-slate-200 text-xs p-0.5 cursor-pointer"
      onClick={clickHandler}
    >
      {checked ? <BookmarkCheckFillIcon /> : <BookmarkIcon />}
    </div>
  );
};
