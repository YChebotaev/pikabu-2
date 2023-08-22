"use client";

import { useRef, type FC } from "react";

export const ChangeAvatarButton: FC<{ userId: string; className?: string }> = ({
  userId,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <button
      className="text-sm text-white"
      onClick={() => {
        inputRef.current?.click();
      }}
    >
      Изменить аватар
      <form
        ref={formRef}
        action={`/api/users/${userId}/avatar`}
        method="POST"
        encType="multipart/form-data"
      >
        <input
          hidden
          ref={inputRef}
          type="file"
          name="avatar"
          onChange={() => {
            formRef.current?.submit();
          }}
        />
      </form>
    </button>
  );
};
