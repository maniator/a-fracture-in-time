'use client';

import { useMemo } from 'react';
import { getAvailableChoices } from '@fractureline/narrative-engine';
import { chapterOne } from '@/content/chapter-one';
import { useGameStore } from '@/store/game-store';

export function SceneRenderer() {
  const { state, choose, reset } = useGameStore();
  const scene = chapterOne[state.currentSceneId];

  const choices = useMemo(() => {
    if (!scene) return [];
    return getAvailableChoices(scene, state);
  }, [scene, state]);

  if (!scene) {
    return (
      <section className="rounded-3xl border border-red-400/30 bg-red-950/20 p-6">
        <p className="text-lg text-red-100">Scene not found: {state.currentSceneId}</p>
        <button className="mt-4 rounded-full bg-ink px-4 py-2 text-void" onClick={reset}>Restart</button>
      </section>
    );
  }

  const chapterComplete = state.flags['chapter-one-complete'];

  return (
    <section aria-labelledby="scene-title" className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur md:p-10">
      <div className="mb-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-ink/60">
        <span>Chapter {scene.chapter}</span>
        <span className="rounded-full border border-fracture/50 px-3 py-1 text-fracture">{scene.pov}</span>
      </div>

      <h1 id="scene-title" className="text-2xl font-semibold text-ink md:text-4xl">{scene.speaker ?? 'Unknown'}</h1>

      <div className="mt-6 space-y-5 text-lg leading-8 text-ink/90 md:text-xl md:leading-9">
        {scene.text.map((paragraph) => (
          <p key={paragraph} className="motion-safe:animate-[fadeIn_600ms_ease-out]">{paragraph}</p>
        ))}
      </div>

      <div className="mt-10 grid gap-3" aria-label="Choices">
        {choices.map((choice) => (
          <button
            key={choice.id}
            onClick={() => choose(choice.id)}
            className="rounded-2xl border border-white/15 bg-void/50 px-5 py-4 text-left text-base text-ink transition hover:border-ember hover:bg-ember/10 focus:outline-none focus:ring-2 focus:ring-ember"
          >
            {choice.label}
          </button>
        ))}
      </div>

      {chapterComplete ? (
        <div className="mt-8 rounded-2xl border border-ember/40 bg-ember/10 p-5 text-ink">
          <p className="font-semibold">Chapter 1 complete.</p>
          <p className="mt-2 text-ink/75">The next chapter will build from this state and the contradiction you exposed.</p>
          <button className="mt-4 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-void" onClick={reset}>Replay Chapter 1</button>
        </div>
      ) : null}

      <dl className="mt-10 grid grid-cols-2 gap-3 text-sm text-ink/70 md:grid-cols-5">
        <Metric label="Stability" value={state.stability} />
        <Metric label="Control" value={state.controlIndex} />
        <Metric label="Rebellion" value={state.rebellion} />
        <Metric label="Memory" value={state.memoryFracture} />
        <Metric label="Entropy" value={state.magicEntropy} />
      </dl>

      {state.codex.length ? (
        <aside className="mt-8 rounded-2xl border border-white/10 bg-void/40 p-5">
          <h2 className="text-sm uppercase tracking-[0.25em] text-ink/60">Codex</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-ink/80">
            {state.codex.map((entry) => <li key={entry}>{entry}</li>)}
          </ul>
        </aside>
      ) : null}
    </section>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-void/30 p-3">
      <dt className="text-xs uppercase tracking-[0.2em]">{label}</dt>
      <dd className="mt-1 text-2xl text-ink">{value}</dd>
    </div>
  );
}
