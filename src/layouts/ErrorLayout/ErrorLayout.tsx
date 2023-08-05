import { type FC, type ReactNode } from "react";
import cn from "classnames";
import classes from "./AuthLayout.module.css";

export const ErrorLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <div className={cn("text-red-600", classes.errorLayout)}>{children}</div>
);
