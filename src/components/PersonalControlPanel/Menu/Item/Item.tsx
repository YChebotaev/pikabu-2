import { type FC } from "react";
import cn from "classnames";
import Link from "next/link";

export const Item: FC<{ href: string; active: boolean; children: string }> = ({
  href,
  active,
  children,
}) => (
  <Link href={href} className={cn(active && "text-[#be3455]")}>
    {children}
  </Link>
);
