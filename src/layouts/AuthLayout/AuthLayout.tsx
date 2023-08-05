import { type FC, type ReactNode } from "react";
import cn from 'classnames'
import classes from './AuthLayout.module.css'

export const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <div className={cn(classes.authLayout)}>
    {children}
  </div>
);
