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
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0d1117]">
      <span className="text-6xl">⚠️</span>
      <h1 className="mt-4 text-2xl font-bold text-[#e6edf3]">
        Failed to load projects
      </h1>
      <p className="mt-2 text-sm text-[#8b949e]">
        Something went wrong while loading the project list.
      </p>
      <button
        onClick={reset}
        className="mt-6 inline-flex items-center gap-2 rounded-lg border border-[#30363d] bg-[#161b22] px-4 py-2 text-sm text-[#58a6ff] transition-colors hover:bg-[#21262d]"
      >
        Retry
      </button>
    </div>
  );
}
