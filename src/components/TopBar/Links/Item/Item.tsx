import { type FC } from "react";
import Link from "next/link";
import cn from "classnames";

export const Item: FC<{ href: string; active?: boolean; children: string }> = ({
  href,
  active = false,
  children,
}) => (
  <Link
    href={href}
    className={cn(
      "p-2 flex items-center text-[#be3455] font-semibold",
      active && "border-b-2 border-[#be3455]",
    )}
  >
    {children}
  </Link>
);
