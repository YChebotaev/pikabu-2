"use client";

import { type FC } from "react";
import TextareaAutosize from "react-textarea-autosize";

export const CommentForm: FC<{ postId: string; parentId?: string }> = ({
  postId,
  parentId,
}) => (
  <form action="/api/comments/create" method="POST">
    <input type="hidden" name="post_id" defaultValue={postId} />
    <input type="hidden" name="parent_id" defaultValue={parentId} />
    <div>
      <label
        htmlFor="content"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Коммент
      </label>
      <TextareaAutosize
        required
        name="content"
        id="content"
        className="block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <p className="text-sm mt-1 text-slate-500">Поддерживается markdown</p>
    </div>
    <div className="mt-2">
      <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-[#be3455] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#e54d71] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e54d71]"
      >
        Ответить {parentId ? "на комментарий" : "на пост"}
      </button>
    </div>
  </form>
);
