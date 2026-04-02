"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { themes } from "@/lib/themes";

const themeList = Object.values(themes);

export function ThemeSwitcher() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentTheme = searchParams.get("theme");

  // Only show when ?theme= param is in use
  if (!currentTheme) return null;

  function switchTheme(id: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("theme", id);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "calc(var(--t-space-6, 24px) + 80px)",
        right: "var(--t-space-6, 24px)",
        zIndex: 100,
        display: "flex",
        gap: "8px",
        padding: "8px 12px",
        borderRadius: "var(--t-radius-pill, 9999px)",
        background: "var(--t-color-surface-highest)",
        opacity: 0.8,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "var(--t-shadow-ambient)",
      }}
    >
      {themeList.map((theme) => (
        <button
          key={theme.id}
          onClick={() => switchTheme(theme.id)}
          title={theme.name}
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            border:
              currentTheme === theme.id
                ? "2px solid var(--t-color-text)"
                : "2px solid transparent",
            background: theme.colors.dark.primary,
            cursor: "pointer",
            transition: "transform 0.15s ease",
            transform:
              currentTheme === theme.id ? "scale(1.15)" : "scale(1)",
          }}
        />
      ))}
    </div>
  );
}
