"use client";

import { Lang, LANG_OPTIONS } from "@/lib/i18n";

interface LanguageSwitcherProps {
  lang: Lang;
  onChange?: (lang: Lang) => void;
}

export function LanguageSwitcher({ lang, onChange }: LanguageSwitcherProps) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-[#30363d] bg-[#0d1117] p-0.5">
      {LANG_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange?.(opt.value)}
          className={`rounded-md px-2 py-1 text-xs font-medium transition-all duration-200 ${
            lang === opt.value
              ? "bg-[#58a6ff] text-white shadow-sm"
              : "text-[#8b949e] hover:text-[#e6edf3]"
          }`}
          aria-label={`Switch to ${opt.label}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
