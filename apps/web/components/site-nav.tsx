import Link from 'next/link';

export function SiteNav() {
  return (
    <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-5 text-sm text-ink/80">
      <Link href="/" className="font-semibold tracking-[0.3em] text-ink uppercase">
        Fractureline
      </Link>
      <div className="flex gap-4">
        <Link className="hover:text-ember" href="/play">Play</Link>
        <Link className="hover:text-ember" href="/help">Help</Link>
      </div>
    </nav>
  );
}
