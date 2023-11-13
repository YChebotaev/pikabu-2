import { type FC, type ReactNode } from "react";
import QRCode from "react-qr-code";
import classes from "./ErrorLayout.module.css";

export const ErrorLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <div className={classes.errorLayout}>
    <div className="text-red-600">{children}</div>
    {typeof children === "string" && (
      <div className="mt-2">
        <QRCode fgColor="#dc2626" value={children} />
      </div>
    )}
  </div>
);
