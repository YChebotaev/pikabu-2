import { type FC } from "react";
import { Container } from "@/components";
import { Logo } from "./Logo";
import { Links } from "./Links";
import { Auth } from "./Auth";

export const TopBar: FC<{
  authenticated: boolean;
  linksActive?: "hot" | "fresh";
}> = ({ authenticated, linksActive }) => (
  <div className="bg-slate-400">
    <Container className="flex">
      <div className="p-2">
        <Logo />
      </div>
      <Links authenticated={authenticated} active={linksActive} />
      <div className="flex-1" />
      <div className="p-2">
        <Auth authenticated={authenticated} />
      </div>
    </Container>
  </div>
);
