import { type FC } from "react";
import { pluralize } from "pluralize-ru-ts";

const pluralizePlus = pluralize("плюс", "плюса", "плюсов");
const pluralizeMinus = pluralize("минус", "минуса", "минусов");

export const VotesCount: FC<{
  votedUpCount: number;
  votedDownCount: number;
}> = ({ votedUpCount, votedDownCount }) => (
  <div>
    Поставил <span className="font-semibold">{votedUpCount}</span>{" "}
    {pluralizePlus(votedUpCount)} и{" "}
    <span className="font-semibold">{votedDownCount}</span>{" "}
    {pluralizeMinus(votedDownCount)}
  </div>
);
