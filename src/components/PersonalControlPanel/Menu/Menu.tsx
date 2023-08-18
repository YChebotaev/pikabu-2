import { type FC } from "react";
import { Item } from "./Item";

export const Menu: FC<{
  userId: string;
  activeItem?:
    | "answers"
    | "comments"
    | "liked"
    | "saved"
    | "visited"
    | "subs"
    | "donations";
}> = ({ userId, activeItem }) => (
  <div className="flex flex-col gap-y-2">
    <Item href={`/users/${userId}/answers`} active={activeItem === "answers"}>
      Ответы
    </Item>
    <Item href={`/users/${userId}/comments`} active={activeItem === "comments"}>
      Комментарии
    </Item>
    <Item href={`/users/${userId}/liked`} active={activeItem === "liked"}>
      Оценки
    </Item>
    <Item href={`/users/${userId}/saved`} active={activeItem === "saved"}>
      Сохраненные
    </Item>
    <Item href={`/users/${userId}/visited`} active={activeItem === "visited"}>
      Просмотренные
    </Item>
    <Item href={`/users/${userId}/subs`} active={activeItem === "subs"}>
      Подписки
    </Item>
    <Item
      href={`/users/${userId}/donations`}
      active={activeItem === "donations"}
    >
      Монетизация
    </Item>
  </div>
);
