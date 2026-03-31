export function Footer() {
  return (
    <footer className="bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <p className="font-bold text-lg">Tracked</p>
          <p className="text-sm text-gray-500 mt-1">
            AI music supervisor. Powered by Signature Tracks.
          </p>
        </div>

        <div className="flex gap-12 text-sm text-gray-500">
          <div className="space-y-2">
            <p className="font-semibold text-gray-900 text-xs uppercase tracking-wider">
              Product
            </p>
            <p>Pricing</p>
            <p>How it works</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-gray-900 text-xs uppercase tracking-wider">
              Legal
            </p>
            <p>Terms</p>
            <p>Privacy</p>
            <p>Licensing</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-200 text-xs text-gray-400">
        Fully licensed. Content ID protected. All compositions by Signature Tracks.
      </div>
    </footer>
  );
}
