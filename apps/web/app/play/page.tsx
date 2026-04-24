import { SceneRenderer } from '@/components/scene-renderer';
import { SiteNav } from '@/components/site-nav';
import { PwaRegister } from '@/components/pwa-register';

export default function PlayPage() {
  return (
    <main className="min-h-screen text-ink">
      <PwaRegister />
      <SiteNav />
      <section className="mx-auto w-full max-w-5xl px-6 py-10">
        <SceneRenderer />
      </section>
    </main>
  );
}
