"use client";

import { ErrorLayout } from "@/layouts";

export default function Error({ error }: { error: Error }) {
  let message = error.message;

  do {
    if (message.includes("ECONNREFUSED")) {
      message = "Нет соединения с базой данных";

      break;
    }
  } while (false);

  return <ErrorLayout>{message}</ErrorLayout>;
}
