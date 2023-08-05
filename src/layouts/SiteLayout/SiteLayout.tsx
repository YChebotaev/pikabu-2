import { type FC, type ReactNode } from "react";
import { Container, TopBar } from "@/components";
import classes from "./SiteLayout.module.css";

export const SiteLayout: FC<{
  authenticated: boolean;
  topBarLinksActive?: "fresh" | "hot";
  children: ReactNode;
}> = ({ authenticated, topBarLinksActive, children }) => (
  <div className={classes.siteLayout}>
    <TopBar authenticated={authenticated} linksActive={topBarLinksActive} />
    <Container>{children}</Container>
  </div>
);
