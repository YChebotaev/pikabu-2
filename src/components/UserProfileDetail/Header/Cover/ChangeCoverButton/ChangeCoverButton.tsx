"use client";

import { useRef, type FC } from "react";
import cn from "classnames";

export const ChangeCoverButton: FC<{ userId: string; className?: string }> = ({
  userId,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <button
      className={cn("text-sm rounded shadow px-4 py-1 text-white", className)}
      style={{ right: 15, top: 15 }}
      onClick={() => {
        inputRef.current?.click();
      }}
    >
      Изменить фон
      <form
        ref={formRef}
        action={`/api/users/${userId}/cover`}
        method="POST"
        encType="multipart/form-data"
      >
        <input
          hidden
          ref={inputRef}
          type="file"
          name="cover"
          onChange={() => {
            formRef.current?.submit();
          }}
        />
      </form>
    </button>
  );
};
