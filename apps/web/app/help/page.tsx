import { SiteNav } from '@/components/site-nav';
import { PwaRegister } from '@/components/pwa-register';

const sections = [
  {
    title: 'How choices work',
    body: 'Every choice can adjust timeline variables, set story flags, unlock codex notes, and move the active scene forward.',
  },
  {
    title: 'The two viewpoints',
    body: 'Protector scenes lean toward order and preservation. Dissenter scenes lean toward memory, disruption, and uncovering hidden causes.',
  },
  {
    title: 'Offline play',
    body: 'The app is structured as an installable PWA. After the first visit, the shell and offline page can be cached by the service worker.',
  },
  {
    title: 'Testing strategy',
    body: 'Unit tests cover the narrative engine. Playwright e2e tests cover the home page, help page, play flow, PWA manifest, and screenshot captures.',
  },
];

export default function HelpPage() {
  return (
    <main className="min-h-screen text-ink">
      <PwaRegister />
      <SiteNav />
      <section className="mx-auto w-full max-w-5xl px-6 py-12">
        <p className="text-sm uppercase tracking-[0.4em] text-ember">Help</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">Playing Fractureline</h1>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {sections.map((section) => (
            <article key={section.title} className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              <p className="mt-3 leading-7 text-ink/75">{section.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
