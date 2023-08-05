import { type FC, type ReactNode } from "react";
import cn from "classnames";
import classes from "./Container.module.css";

export const Container: FC<{ className?: string; children: ReactNode }> = ({
  className,
  children,
}) => <div className={cn(classes.container, className)}>{children}</div>;
