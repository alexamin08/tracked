"use client";

import { useState, useEffect } from "react";

const THEMES = [
  { id: "cinematic", label: "CI", name: "Cinematic Intelligence", url: "https://tracked-phi.vercel.app" },
  { id: "warm-editorial", label: "WE", name: "Warm Editorial", url: "https://tracked-warm.vercel.app" },
  { id: "precision-utility", label: "PU", name: "Precision Intelligence", url: "https://tracked-precision.vercel.app" },
  { id: "simple", label: "SM", name: "Simple Mode", url: "https://tracked-simple.vercel.app" },
] as const;

function getActiveTheme() {
  if (typeof window === "undefined") return "cinematic";
  const host = window.location.hostname;
  if (host.includes("tracked-simple")) return "simple";
  if (host.includes("tracked-warm")) return "warm-editorial";
  if (host.includes("tracked-precision")) return "precision-utility";
  return "cinematic";
}

export function ThemeSwitcher() {
  const [active, setActive] = useState("cinematic");

  useEffect(() => {
    setActive(getActiveTheme());
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 9999,
        display: "flex",
        gap: 4,
        padding: "6px 8px",
        borderRadius: 9999,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {THEMES.map((t) => {
        const isActive = t.id === active;
        return (
          <a
            key={t.id}
            href={isActive ? undefined : t.url}
            title={t.name}
            style={{
              width: 32,
              height: 24,
              borderRadius: 4,
              border: isActive ? "2px solid rgba(255,255,255,0.8)" : "2px solid transparent",
              backgroundColor: isActive ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.05)",
              color: isActive ? "#fff" : "rgba(255,255,255,0.5)",
              fontFamily: "system-ui, sans-serif",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.05em",
              cursor: isActive ? "default" : "pointer",
              transition: "all 150ms ease",
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
            }}
          >
            {t.label}
          </a>
        );
      })}
    </div>
  );
}
