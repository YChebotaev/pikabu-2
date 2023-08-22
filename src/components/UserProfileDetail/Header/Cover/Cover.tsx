import { type FC } from "react";
import Image from "next/image";
import { ChangeCoverButton } from "./ChangeCoverButton";

export const Cover: FC<{ src: string; editable: boolean, userId: string }> = ({
  src,
  editable,
  userId
}) =>
  editable ? (
    <div
      className="relative rounded-t overflow-hidden"
      style={{ width: "100%", height: 140 }}
    >
      <Image
        src={src}
        width={700}
        height={140}
        alt=""
        className="absolute w-full h-full"
      />
      <div className="absolute w-full h-full">
        <ChangeCoverButton userId={userId} className="absolute" />
      </div>
    </div>
  ) : (
    <div className="rounded-t overflow-hidden">
      <Image src={src} width={700} height={140} alt="" quality={100} />
    </div>
  );
