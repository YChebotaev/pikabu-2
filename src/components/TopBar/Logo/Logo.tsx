import { type FC } from "react";
import Image from "next/image";
import logoSVG from "./logo.svg";

export const Logo: FC = () => (
  <div className="flex items-center h-full">
    <Image src={logoSVG} width={139} height={31} alt="" />
  </div>
);
