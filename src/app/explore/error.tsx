"use client";

import { useEffect } from "react";

export default function ExploreError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 text-center">
      <div className="mb-6 flex items-center gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          Folio — explore / error
        </span>
        <span className="h-px w-12 bg-dim" />
      </div>
      <h1 className="font-display text-4xl leading-tight text-fg sm:text-5xl">
        Failed to <span className="italic text-accent">load</span>
      </h1>
      <p className="mt-6 max-w-sm text-sm leading-relaxed text-fg-2">
        Something went wrong while loading the project list.
      </p>
      <button
        onClick={reset}
        className="group mt-10 inline-flex items-center gap-3 border-b border-accent pb-1 font-display text-lg text-accent transition-colors hover:text-accent-hover"
      >
        <span>Retry</span>
        <svg
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="square"
            d="M5 12h14M13 6l6 6-6 6"
          />
        </svg>
      </button>
    </div>
  );
}
