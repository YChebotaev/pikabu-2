import { type FC } from "react";

const getTotalPostsCount = (postsCount: { [key: string]: number }) =>
  Object.values(postsCount).reduce((sum, count) => sum + count, 0);

export const Stats: FC<{
  rating: number;
  followersCount: number;
  followsCount: number;
  postsCount: {
    [key: string]: number;
  };
}> = ({ rating, followersCount, followsCount, postsCount }) => (
  <div>
    <dl className="grid grid-cols-5">
      <dt>Рейтинг</dt>
      <dt>Подписчиков</dt>
      <dt>Подписок</dt>
      <dt>Поста</dt>
      <dt>В горячем</dt>
      <dd className="text-xl font-semibold">{rating}</dd>
      <dd className="text-xl font-semibold">{followersCount}</dd>
      <dd className="text-xl font-semibold">{followsCount}</dd>
      <dd className="text-xl font-semibold">
        {getTotalPostsCount(postsCount)}
      </dd>
      <dd className="text-xl font-semibold">{postsCount["hot"] ?? 0}</dd>
    </dl>
  </div>
);
