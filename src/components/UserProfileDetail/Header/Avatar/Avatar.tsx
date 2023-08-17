import { type FC } from "react";
import Image from "next/image";

export const Avatar: FC<{ src: string }> = ({ src }) => (
  <div className="inline-block overflow-hidden rounded-full">
    <Image src={src} width={128} height={128} alt="" />
  </div>
);
