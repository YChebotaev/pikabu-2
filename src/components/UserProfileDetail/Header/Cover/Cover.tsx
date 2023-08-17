import { type FC } from "react";
import Image from "next/image";

export const Cover: FC<{ src: string }> = ({ src }) => (
  <div className="rounded-t overflow-hidden">
    <Image src={src} width={700} height={140} alt="" />
  </div>
);
