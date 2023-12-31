import { type FC } from "react";
import Link from "next/link";
import cn from "classnames";

export const Item: FC<{
  href: string;
  primary?: boolean;
  children: string;
}> = ({ href, primary = false, children }) => (
  <Link
    href={href}
    className={cn(
      "py-1 px-2",
      primary && "text-neutral-50 bg-[#be3455] hover:bg-[#e54d71] rounded",
    )}
  >
    {children}
  </Link>
);
