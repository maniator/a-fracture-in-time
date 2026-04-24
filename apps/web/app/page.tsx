import Link from 'next/link';
import { SiteNav } from '@/components/site-nav';
import { PwaRegister } from '@/components/pwa-register';

export default function HomePage() {
  return (
    <main className="min-h-screen text-ink">
      <PwaRegister />
      <SiteNav />
      <section className="mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-5xl flex-col justify-center px-6 py-16">
        <p className="text-sm uppercase tracking-[0.4em] text-ember">Dual timeline narrative game</p>
        <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-tight md:text-7xl">
          Two choices. Two futures. One fractureline.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/75 md:text-xl">
          Alternate between the Protector and the Dissenter as each choice reshapes the other timeline. Preserve the beautiful lie, uncover the hidden truth, or find a third path forward.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/play" className="rounded-full bg-ember px-6 py-3 font-semibold text-void shadow-lg shadow-ember/20">
            Start Chapter 1
          </Link>
          <Link href="/help" className="rounded-full border border-white/20 px-6 py-3 font-semibold text-ink hover:border-ember">
            How it works
          </Link>
        </div>
      </section>
    </main>
  );
}
