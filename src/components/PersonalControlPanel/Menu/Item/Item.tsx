import { type FC } from "react";
import Link from "next/link";

export const Item: FC<{ href: string; children: string }> = ({
  href,
  children,
}) => <Link href={href}>{children}</Link>;
