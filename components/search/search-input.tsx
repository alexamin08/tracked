"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SUGGESTED_PROMPTS, SEARCH } from "@/lib/constants";

export function SearchInput({ initialQuery = "", showCharCount = false }: { initialQuery?: string; showCharCount?: boolean }) {
  const [query, setQuery] = useState(initialQuery);
  const [focused, setFocused] = useState(false);
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
    <div className="w-full max-w-[720px] relative z-10">
      <form onSubmit={handleSubmit} className="relative">
        {/* Resting glow ring around entire input */}
        <div
          style={{
            position: "absolute",
            inset: "-1px",
            borderRadius: "var(--t-radius-pill)",
            border: focused
              ? "1.5px solid var(--t-color-primary)"
              : "1px solid color-mix(in srgb, var(--t-color-primary) 20%, transparent)",
            transition: "border-color 0.2s ease, box-shadow 0.2s ease",
            boxShadow: focused
              ? "0 0 0 4px color-mix(in srgb, var(--t-color-primary) 15%, transparent)"
              : "none",
            pointerEvents: "none",
          }}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value.slice(0, SEARCH.maxQueryLength))}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Describe your scene..."
          className="w-full t-body-lg"
          style={{
            padding: "1.25rem 4rem 1.25rem 1.75rem",
            borderRadius: "var(--t-radius-pill)",
            background: "var(--t-color-surface-highest)",
            color: "var(--t-color-text)",
            border: "none",
            outline: "none",
            fontFamily: "var(--t-font-body)",
            fontSize: "1.0625rem",
          }}
        />
        <button
          type="submit"
          disabled={query.trim().length < SEARCH.minQueryLength}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center disabled:opacity-30 transition-opacity"
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "var(--t-radius-pill)",
            background: "var(--t-color-primary)",
            color: "var(--t-color-on-primary)",
            border: "none",
            cursor: "pointer",
            fontSize: "1.125rem",
          }}
          aria-label="Search"
        >
          →
        </button>
      </form>

      {/* Prompt pills — generous spacing */}
      <div
        className="flex gap-3 flex-wrap justify-center"
        style={{ marginTop: "var(--t-space-8)" }}
      >
        {SUGGESTED_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handlePromptClick(prompt)}
            className="t-body-sm transition-colors"
            style={{
              padding: "10px 20px",
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

      {showCharCount && query.length > 0 && (
        <p
          className="text-center t-body-sm"
          style={{ color: "var(--t-color-text-muted)", marginTop: "var(--t-space-3)" }}
        >
          {query.length}/{SEARCH.maxQueryLength}
        </p>
      )}
    </div>
  );
}
