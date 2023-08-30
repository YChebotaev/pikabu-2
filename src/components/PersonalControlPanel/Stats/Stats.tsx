import { type FC } from "react";

export const Stats: FC<{ rating: number; followersCount: number }> = ({
  rating,
  followersCount,
}) => {
  return (
    <div>
      <dl className="grid grid-cols-2">
        <dt>Рейтинг</dt>
        <dd className="font-bold text-2xl text-right">{rating}</dd>
        <dt>Подписчиков</dt>
        <dd className="font-bold text-2xl text-right">{followersCount}</dd>
      </dl>
    </div>
  );
};
