import { type FC } from "react";
import { Item } from "./Item";

export const Auth: FC<{ authenticated: boolean }> = ({ authenticated }) =>
  authenticated ? (
    <div className="flex gap-2">
      <Item primary href="/posts/create">
        Создать пост
      </Item>
    </div>
  ) : (
    <div className="flex gap-2">
      <Item href="/signin">Войти</Item>
      <Item primary href="/signup">
        Зарегистрироваться
      </Item>
    </div>
  );
