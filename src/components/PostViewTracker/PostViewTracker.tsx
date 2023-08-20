"use client";

import { useRef, useCallback, useMemo, useEffect, type FC } from "react";

export const PostViewTracker: FC<{ postId: string }> = ({ postId }) => {
  const ref = useRef<HTMLDivElement>(null);
  const trackView = useCallback(async () => {
    await fetch(`/api/posts/${postId}/view`, { method: "POST" });
  }, [postId]);
  const observer = useMemo(() => {
    if (typeof window !== "undefined") {
      return new IntersectionObserver(
        ([{ isIntersecting }]) => {
          if (isIntersecting) {
            trackView();
          }
        },
        {
          rootMargin: "0px",
          threshold: 1.0,
        },
      );
    }
  }, [trackView]);

  useEffect(() => {
    const current = ref.current;

    if (current && observer) {
      observer.observe(current);

      return () => {
        observer.unobserve(current);
      };
    }
  }, [observer]);

  return <div ref={ref} />;
};
