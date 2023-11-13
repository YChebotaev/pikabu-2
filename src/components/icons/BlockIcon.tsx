import { type FC } from "react";

export const BlockIcon: FC = (props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM4 12c0-1.846.634-3.542 1.688-4.897l11.209 11.209A7.946 7.946 0 0112 20c-4.411 0-8-3.589-8-8zm14.312 4.897L7.103 5.688A7.948 7.948 0 0112 4c4.411 0 8 3.589 8 8a7.954 7.954 0 01-1.688 4.897z" />
    </svg>
  );
};