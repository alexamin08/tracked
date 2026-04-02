import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { ThemeLink } from "@/components/theme-link";

export default function SubscribeSuccessPage() {
  return (
    <>
      <Header />
      <main className="pt-24 min-h-screen flex items-center justify-center px-6" style={{ background: "var(--t-color-bg)" }}>
        <div className="max-w-md w-full text-center">
          <div
            className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-2xl"
            style={{
              borderRadius: "var(--t-radius-pill)",
              background: "color-mix(in srgb, var(--t-color-primary) 15%, transparent)",
              color: "var(--t-color-primary)",
            }}
          >
            ✓
          </div>

          <h1 className="t-display-sm mb-2" style={{ color: "var(--t-color-text)" }}>
            You&apos;re in
          </h1>
          <p className="t-body-lg mb-8" style={{ color: "var(--t-color-text-muted)" }}>
            Your 14-day trial is active. Describe your scene and start downloading broadcast-proven music.
          </p>

          <ThemeLink href="/">
            <Button size="lg">Describe your scene</Button>
          </ThemeLink>
        </div>
      </main>
    </>
  );
}
