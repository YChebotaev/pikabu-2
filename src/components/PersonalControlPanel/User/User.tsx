import { type FC } from "react";
import Image from "next/image";
import Link from "next/link";

export const User: FC<{ id: string; username: string; avatarSrc: string }> = ({
  id,
  username,
  avatarSrc,
}) => (
  <div className="flex justify-between items-center">
    <div className="overflow-hidden rounded-full">
      <Link href={`/users/${id}`}>
        <Image
          src={avatarSrc}
          alt=""
          width={48}
          height={48}
          className="object-cover"
          style={{ width: 48, height: 48 }}
        />
      </Link>
    </div>
    <div className="grow ps-2">
      <Link href={`/users/${id}`} className="font-bold">
        {username}
      </Link>
    </div>
  </div>
);
