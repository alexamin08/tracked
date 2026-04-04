import Link from "next/link";
import { TopNav } from "@/components/nav/TopNav";

export default function SubscribeSuccessPage() {
  return (
    <>
      <TopNav />
      <main style={{ backgroundColor: "var(--color-surface)", minHeight: "100vh", paddingTop: 112, display: "flex", alignItems: "center", justifyContent: "center", padding: "112px 32px 96px" }}>
        <div style={{ maxWidth: 440, width: "100%", textAlign: "center" }}>
          <div style={{ width: 64, height: 64, margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "color-mix(in srgb, var(--color-primary) 15%, transparent)", borderRadius: "50%" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
          </div>

          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: "var(--color-on-surface)", marginBottom: 12 }}>
            You&apos;re in
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.7, color: "var(--color-on-surface-variant)", marginBottom: 40 }}>
            Your 14-day trial is active. Describe your scene and start downloading broadcast-proven music.
          </p>

          <Link href="/" style={{ display: "inline-block", backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)", padding: "16px 40px", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
            Describe your scene
          </Link>
        </div>
      </main>
    </>
  );
}
