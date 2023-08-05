import { type FC } from "react";
import { Item } from "./Item";

export const Links: FC<{
  active?: "hot" | "fresh";
  authenticated: boolean;
}> = ({ active, authenticated }) => (
  <div className="flex">
    <Item active={active === "hot"} href="/">
      Горячее
    </Item>
    {authenticated && (
      <Item active={active === "fresh"} href="/fresh">
        Свежее
      </Item>
    )}
  </div>
);
