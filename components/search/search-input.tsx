"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SUGGESTED_PROMPTS, SEARCH } from "@/lib/constants";

export function SearchInput({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme");

  function buildUrl(path: string) {
    return theme ? `${path}&theme=${theme}` : path;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed.length < SEARCH.minQueryLength) return;
    router.push(buildUrl(`/search?q=${encodeURIComponent(trimmed)}`));
  }

  function handlePromptClick(prompt: string) {
    setQuery(prompt);
    router.push(buildUrl(`/search?q=${encodeURIComponent(prompt)}`));
  }

  return (
    <div className="w-full max-w-[680px] relative z-10">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value.slice(0, SEARCH.maxQueryLength))}
          placeholder="Describe your scene..."
          className="w-full px-6 py-5 pr-14 t-body-lg focus-glow"
          style={{
            borderRadius: "var(--t-radius-pill)",
            background: "var(--t-color-surface-highest)",
            color: "var(--t-color-text)",
            border: "none",
            outline: "none",
            fontFamily: "var(--t-font-body)",
          }}
        />
        <button
          type="submit"
          disabled={query.trim().length < SEARCH.minQueryLength}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center disabled:opacity-30 transition-opacity"
          style={{
            borderRadius: "var(--t-radius-pill)",
            background: "var(--t-color-primary)",
            color: "var(--t-color-on-primary)",
            border: "none",
          }}
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
            className="t-body-sm px-4 py-2 transition-colors"
            style={{
              borderRadius: "var(--t-radius-pill)",
              background: "var(--t-color-surface-high)",
              color: "var(--t-color-text-muted)",
              border: "none",
              cursor: "pointer",
            }}
          >
            {prompt}
          </button>
        ))}
      </div>

      {query.length > 0 && (
        <p className="text-center t-body-sm mt-3" style={{ color: "var(--t-color-text-muted)" }}>
          {query.length}/{SEARCH.maxQueryLength}
        </p>
      )}
    </div>
  );
}
