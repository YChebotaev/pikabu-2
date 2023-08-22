import { type FC } from "react";
import Link from "next/link";
import Image from "next/image";

export const Username: FC<{
  id: string;
  username: string;
  avatarSrc: string;
}> = ({ id, username, avatarSrc }) => (
  <div className="flex gap-1">
    <Image
      src={avatarSrc}
      width={20}
      height={20}
      quality={70}
      alt=""
      className="rounded-full object-cover"
      style={{ width: 20, height: 20 }}
    />
    <Link href={`/users/${id}`}>{username}</Link>{" "}
  </div>
);
