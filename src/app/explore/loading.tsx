export default function ExploreLoading() {
  return (
    <div className="min-h-screen bg-[#0d1117]">
      <div className="hidden lg:block fixed left-0 top-0 h-full w-60 border-r border-[#30363d] bg-[#161b22]">
        <div className="flex h-14 items-center border-b border-[#30363d] px-4">
          <div className="h-5 w-28 animate-pulse rounded bg-[#21262d]" />
        </div>
        <div className="p-3 space-y-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-9 animate-pulse rounded-lg bg-[#21262d]" />
          ))}
        </div>
      </div>

      <main className="min-h-screen lg:ml-60">
        <header className="sticky top-0 z-30 border-b border-[#30363d] bg-[#0d1117]/90 backdrop-blur-md">
          <div className="flex h-14 items-center justify-between px-4">
            <div className="h-5 w-28 animate-pulse rounded bg-[#21262d]" />
          </div>
          <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-7 w-24 animate-pulse rounded-lg bg-[#21262d]" />
              ))}
            </div>
            <div className="flex gap-2">
              <div className="h-9 w-56 animate-pulse rounded-lg bg-[#21262d]" />
              <div className="h-9 w-24 animate-pulse rounded-lg bg-[#21262d]" />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-xl border border-[#30363d] bg-[#161b22]"
            />
          ))}
        </div>
      </main>
    </div>
  );
}
