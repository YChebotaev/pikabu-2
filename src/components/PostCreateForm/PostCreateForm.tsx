"use client";

import { type FC } from "react";
import TextareaAutosize from "react-textarea-autosize";
import type { PostCreateErrorCodes } from "@/types";

export const PostCreateForm: FC<{
  errorCode?: PostCreateErrorCodes;
  initialTitle?: string;
  initialContent?: string;
}> = ({ errorCode, initialTitle, initialContent }) => (
  <form action="/api/posts/create" method="POST">
    <div>
      <label
        htmlFor="title"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Название поста
      </label>
      <input
        required
        defaultValue={initialTitle}
        type="text"
        name="title"
        id="title"
        className="block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      {errorCode === "title_empty" && (
        <div className="text-red-600 pt-2 text-sm">Укажите название поста</div>
      )}
      {errorCode === "title_exists" && (
        <div className="text-red-600 pt-2 text-sm">
          Пост с таким названием уже существует
        </div>
      )}
    </div>
    <div className="mt-2">
      <label
        htmlFor="content"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Содержимое поста
      </label>
      <TextareaAutosize
        required
        defaultValue={initialContent}
        name="content"
        id="content"
        className="block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <p className="text-sm mt-1 text-slate-500">Поддерживается markdown</p>
      {errorCode === "content_empty" && (
        <div className="text-red-600 pt-2 text-sm">
          Содержимое поста не может быть пустым
        </div>
      )}
      {errorCode === "content_wrong_markdown" && (
        <div className="text-red-600 pt-2 text-sm">
          Неверная разметка markdown
        </div>
      )}
    </div>
    <div className="mt-2">
      <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
      >
        Создать пост
      </button>
    </div>
  </form>
);
