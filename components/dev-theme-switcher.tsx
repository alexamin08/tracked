"use client";

import { useState, useEffect } from "react";

const THEMES = [
  { id: "cinematic", label: "CI", color: "#E1BDCD" },
  { id: "warm-editorial", label: "WE", color: "#994123" },
  { id: "precision-utility", label: "PU", color: "#C3F5FF" },
] as const;

export function DevThemeSwitcher() {
  const [current, setCurrent] = useState("cinematic");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    setVisible(process.env.NODE_ENV === "development");
    const theme = document.documentElement.getAttribute("data-theme") ?? "cinematic";
    setCurrent(theme);
  }, []);

  if (!visible) return null;

  function switchTheme(id: string) {
    document.documentElement.setAttribute("data-theme", id);
    setCurrent(id);
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        left: 16,
        zIndex: 9999,
        display: "flex",
        gap: 4,
        padding: "6px 8px",
        borderRadius: 9999,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {THEMES.map((t) => (
        <button
          key={t.id}
          onClick={() => switchTheme(t.id)}
          style={{
            width: 32,
            height: 24,
            borderRadius: 4,
            border: current === t.id ? `2px solid ${t.color}` : "2px solid transparent",
            backgroundColor: current === t.id ? t.color : "rgba(255,255,255,0.1)",
            color: current === t.id ? "#000" : "rgba(255,255,255,0.6)",
            fontFamily: "system-ui, sans-serif",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.05em",
            cursor: "pointer",
            transition: "all 150ms ease",
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          title={t.id}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
