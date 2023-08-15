import { type FC } from "react";
import { Item } from "./Item";

export const Menu: FC<{ userId: string }> = ({ userId }) => (
  <div className="flex flex-col gap-y-2">
    <Item href={`/users/${userId}/answers`}>Ответы</Item>
    <Item href={`/users/${userId}/comments`}>Комментарии</Item>
    <Item href={`/users/${userId}/liked`}>Оценки</Item>
    <Item href={`/users/${userId}/saved`}>Сохраненные</Item>
    <Item href={`/users/${userId}/visited`}>Просмотренные</Item>
    <Item href={`/users/${userId}/subs`}>Подписки</Item>
    <Item href={`/users/${userId}/donations`}>Монетизация</Item>
  </div>
);
