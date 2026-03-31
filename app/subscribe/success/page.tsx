import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";

export default function SubscribeSuccessPage() {
  return (
    <>
      <Header />
      <main className="pt-24 min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-pill bg-azure-50 text-azure mx-auto mb-6 flex items-center justify-center text-2xl">
            ✓
          </div>

          <h1 className="text-2xl font-bold mb-2">You&apos;re in</h1>
          <p className="text-gray-500 text-sm mb-8">
            Your 14-day trial is active. Describe your scene and start
            downloading broadcast-proven music.
          </p>

          <Link href="/">
            <Button size="lg">Describe your scene</Button>
          </Link>
        </div>
      </main>
    </>
  );
}
