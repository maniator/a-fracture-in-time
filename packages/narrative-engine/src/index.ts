export * from './ink-adapter';

import type { Choice, Condition, Effect, Scene, SceneGraph, TimelineState } from '@fractureline/shared-types';

export function evaluateCondition(condition: Condition, state: TimelineState): boolean {
  switch (condition.type) {
    case 'eq': return state[condition.key] === condition.value;
    case 'neq': return state[condition.key] !== condition.value;
    case 'gt': return state[condition.key] > condition.value;
    case 'gte': return state[condition.key] >= condition.value;
    case 'lt': return state[condition.key] < condition.value;
    case 'lte': return state[condition.key] <= condition.value;
    case 'flag': return state.flags[condition.key] === true;
    case 'notFlag': return state.flags[condition.key] !== true;
    case 'seenScene': return state.seenScenes.includes(condition.sceneId);
    case 'and': return condition.conditions.every((item) => evaluateCondition(item, state));
    case 'or': return condition.conditions.some((item) => evaluateCondition(item, state));
    default: return assertNever(condition);
  }
}

export function conditionsPass(conditions: Condition[] | undefined, state: TimelineState): boolean {
  return !conditions?.length || conditions.every((condition) => evaluateCondition(condition, state));
}

export function applyEffect(state: TimelineState, effect: Effect): TimelineState {
  switch (effect.type) {
    case 'increment':
      return { ...state, [effect.key]: state[effect.key] + effect.value };
    case 'decrement':
      return { ...state, [effect.key]: state[effect.key] - effect.value };
    case 'setNumber':
      return { ...state, [effect.key]: effect.value };
    case 'setFlag':
      return { ...state, flags: { ...state.flags, [effect.key]: true } };
    case 'unsetFlag': {
      const { [effect.key]: _removed, ...flags } = state.flags;
      return { ...state, flags };
    }
    case 'appendCodex':
      return state.codex.includes(effect.entry) ? state : { ...state, codex: [...state.codex, effect.entry] };
    case 'switchPOV':
      return { ...state, currentPOV: effect.pov };
    case 'setChapter':
      return { ...state, chapter: effect.chapter };
    case 'markSceneSeen':
      return state.seenScenes.includes(effect.sceneId) ? state : { ...state, seenScenes: [...state.seenScenes, effect.sceneId] };
    case 'setEnding':
      return { ...state, endingKey: effect.endingKey };
    default:
      return assertNever(effect);
  }
}

export function applyEffects(state: TimelineState, effects: Effect[] = []): TimelineState {
  return effects.reduce((nextState, effect) => applyEffect(nextState, effect), state);
}

export function getAvailableChoices(scene: Scene, state: TimelineState): Choice[] {
  return scene.choices.filter((choice) => conditionsPass(choice.conditions, state));
}

export function enterScene(scene: Scene, state: TimelineState): TimelineState {
  return applyEffects(
    {
      ...state,
      currentSceneId: scene.id,
      currentPOV: scene.pov,
      chapter: scene.chapter,
    },
    [{ type: 'markSceneSeen', sceneId: scene.id }, ...(scene.onEnterEffects ?? [])],
  );
}

export function resolveChoice(graph: SceneGraph, state: TimelineState, choiceId: string): TimelineState {
  const scene = graph[state.currentSceneId];
  if (!scene) {
    throw new Error(`Current scene not found: ${state.currentSceneId}`);
  }

  const choice = getAvailableChoices(scene, state).find((item) => item.id === choiceId);
  if (!choice) {
    throw new Error(`Choice not available: ${choiceId}`);
  }

  const afterChoice = applyEffects(state, choice.effects);
  const nextScene = graph[choice.nextSceneId];
  if (!nextScene) {
    throw new Error(`Next scene not found: ${choice.nextSceneId}`);
  }

  return enterScene(nextScene, afterChoice);
}

export function validateSceneGraph(graph: SceneGraph): string[] {
  const errors: string[] = [];
  const ids = new Set(Object.keys(graph));

  for (const scene of Object.values(graph)) {
    for (const choice of scene.choices) {
      if (!ids.has(choice.nextSceneId)) {
        errors.push(`${scene.id}.${choice.id} points to missing scene ${choice.nextSceneId}`);
      }
    }
  }

  return errors;
}

function assertNever(value: never): never {
  throw new Error(`Unhandled variant: ${JSON.stringify(value)}`);
}
