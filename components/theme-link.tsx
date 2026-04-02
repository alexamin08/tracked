"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { ComponentProps } from "react";

type ThemeLinkProps = ComponentProps<typeof Link>;

export function ThemeLink({ href, ...props }: ThemeLinkProps) {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme");

  let resolvedHref = href;
  if (theme && typeof href === "string") {
    const separator = href.includes("?") ? "&" : "?";
    resolvedHref = `${href}${separator}theme=${theme}`;
  }

  return <Link href={resolvedHref} {...props} />;
}
