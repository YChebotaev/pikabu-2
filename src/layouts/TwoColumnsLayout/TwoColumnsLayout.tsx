import { type FC, type ReactNode } from "react";
import classes from "./TwoColumnsLayout.module.css";

export const TwoColumnsLayout: FC<{
  aside?: ReactNode;
  children: ReactNode;
}> = ({ aside, children }) => (
  <div className={classes.twoColumnsLayout}>
    <main className={classes.firstColumn}>{children}</main>
    <aside className={classes.secondColumn}>{aside}</aside>
  </div>
);
