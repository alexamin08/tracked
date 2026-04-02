import { ThemeLink } from "@/components/theme-link";

export function Footer() {
  return (
    <footer style={{ background: "var(--t-color-surface-lowest)" }} className="py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <ThemeLink
            href="/"
            className="t-headline-md"
            style={{
              fontFamily: "var(--t-logo-font)",
              fontStyle: "var(--t-logo-style)",
              color: "var(--t-color-primary)",
            }}
          >
            Tracked.
          </ThemeLink>
          <p className="t-body-sm mt-1" style={{ color: "var(--t-color-text-muted)" }}>
            AI music supervisor. Powered by Signature Tracks.
          </p>
        </div>

        <div className="flex gap-12">
          <div className="space-y-2">
            <p className="t-label-sm" style={{ color: "var(--t-color-text-muted)" }}>
              Product
            </p>
            <ThemeLink href="/pricing" className="t-body-sm block" style={{ color: "var(--t-color-text-muted)" }}>
              Pricing
            </ThemeLink>
            <ThemeLink href="/how-it-works" className="t-body-sm block" style={{ color: "var(--t-color-text-muted)" }}>
              How it works
            </ThemeLink>
            <ThemeLink href="/about" className="t-body-sm block" style={{ color: "var(--t-color-text-muted)" }}>
              About
            </ThemeLink>
          </div>
          <div className="space-y-2">
            <p className="t-label-sm" style={{ color: "var(--t-color-text-muted)" }}>
              Legal
            </p>
            <ThemeLink href="/legal/terms" className="t-body-sm block" style={{ color: "var(--t-color-text-muted)" }}>
              Terms
            </ThemeLink>
            <ThemeLink href="/legal/privacy" className="t-body-sm block" style={{ color: "var(--t-color-text-muted)" }}>
              Privacy
            </ThemeLink>
            <ThemeLink href="/legal/licensing" className="t-body-sm block" style={{ color: "var(--t-color-text-muted)" }}>
              Licensing
            </ThemeLink>
          </div>
        </div>
      </div>

      <div
        className="max-w-6xl mx-auto mt-8 pt-8 t-body-sm"
        style={{
          borderTop: "1px solid var(--t-color-border)",
          color: "var(--t-color-text-muted)",
        }}
      >
        Fully licensed. Content ID protected. All compositions by Signature Tracks.
      </div>
    </footer>
  );
}
