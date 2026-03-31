"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { SUGGESTED_PROMPTS, SEARCH } from "@/lib/constants";

export function SearchInput({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed.length < SEARCH.minQueryLength) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  function handlePromptClick(prompt: string) {
    setQuery(prompt);
    router.push(`/search?q=${encodeURIComponent(prompt)}`);
  }

  return (
    <div className="w-full max-w-[680px]">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value.slice(0, SEARCH.maxQueryLength))}
          placeholder="Describe your scene..."
          className="w-full px-6 py-5 pr-14 rounded-pill glass-surface text-white text-base placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-azure-300/50"
        />
        <button
          type="submit"
          disabled={query.trim().length < SEARCH.minQueryLength}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-pill bg-azure text-white flex items-center justify-center disabled:opacity-30 transition-opacity"
          aria-label="Search"
        >
          →
        </button>
      </form>

      <div className="flex gap-2 flex-wrap justify-center mt-5">
        {SUGGESTED_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handlePromptClick(prompt)}
            className="px-4 py-2 rounded-pill glass-surface text-white/50 text-[13px] hover:text-white/80 hover:bg-white/10 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {query.length > 0 && (
        <p className="text-center text-white/30 text-xs mt-3">
          {query.length}/{SEARCH.maxQueryLength}
        </p>
      )}
    </div>
  );
}
