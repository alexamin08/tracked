"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { trackAuthGateShown, trackDownload } from "@/lib/analytics";

interface DownloadButtonProps {
  trackId: string;
  versionId?: string;
}

export function DownloadButton({ trackId, versionId }: DownloadButtonProps) {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    if (!isSignedIn) {
      trackAuthGateShown();
      router.push(`/sign-in?redirect_url=/search`);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackId, versionId }),
      });

      if (res.status === 403) {
        router.push("/subscribe");
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        alert(data.error ?? "Download failed");
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `track-${trackId}.wav`;
      a.click();
      URL.revokeObjectURL(url);
      trackDownload(trackId, "wav");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button onClick={handleDownload} disabled={loading} size="sm">
      {loading ? "..." : "Download"}
    </Button>
  );
}
