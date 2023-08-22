import { type FC } from "react";
import Image from "next/image";
import { ChangeAvatarButton } from './ChangeAvatarButton'

export const Avatar: FC<{ src: string; editable: boolean; userId: string }> = ({
  src,
  editable,
  userId,
}) =>
  editable ? (
    <div className="inline-block" style={{ width: 128, height: 128 }}>
      <Image
        src={src}
        width={128}
        height={128}
        quality={100}
        alt=""
        className="absolute object-cover w-full h-full overflow-hidden rounded-full"
        style={{ width: 128, height: 128 }}
      />
      <div className="flex justify-center align-center absolute w-full h-full" style={{ width: 128, height: 128 }}>
        <ChangeAvatarButton userId={userId} />
      </div>
    </div>
  ) : (
    <div className="inline-block overflow-hidden rounded-full">
      <Image src={src} width={128} height={128} alt="" className="object-cover" style={{ width: 128, height: 128 }} />
    </div>
  );
