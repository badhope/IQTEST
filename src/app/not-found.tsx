import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0d1117]">
      <span className="text-6xl">🔍</span>
      <h1 className="mt-4 text-2xl font-bold text-[#e6edf3]">
        404 - Page Not Found
      </h1>
      <p className="mt-2 text-sm text-[#8b949e]">This category or page does not exist</p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-lg border border-[#30363d] bg-[#161b22] px-4 py-2 text-sm text-[#58a6ff] transition-colors hover:bg-[#21262d]"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
