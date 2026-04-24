export type POV = 'protector' | 'dissenter';

export type TimelineVariable =
  | 'stability'
  | 'controlIndex'
  | 'rebellion'
  | 'memoryFracture'
  | 'magicEntropy';

export type TimelineState = Record<TimelineVariable, number> & {
  flags: Record<string, boolean>;
  seenScenes: string[];
  codex: string[];
  chapter: number;
  currentSceneId: string;
  currentPOV: POV;
  endingKey?: string;
};

export type NumericConditionOperator = 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte';

export type NumericCondition = {
  type: NumericConditionOperator;
  key: TimelineVariable;
  value: number;
};

export type FlagCondition = {
  type: 'flag' | 'notFlag';
  key: string;
};

export type SeenSceneCondition = {
  type: 'seenScene';
  sceneId: string;
};

export type CompoundCondition = {
  type: 'and' | 'or';
  conditions: Condition[];
};

export type Condition = NumericCondition | FlagCondition | SeenSceneCondition | CompoundCondition;

export type Effect =
  | { type: 'increment' | 'decrement'; key: TimelineVariable; value: number }
  | { type: 'setNumber'; key: TimelineVariable; value: number }
  | { type: 'setFlag' | 'unsetFlag'; key: string }
  | { type: 'appendCodex'; entry: string }
  | { type: 'switchPOV'; pov: POV }
  | { type: 'setChapter'; chapter: number }
  | { type: 'markSceneSeen'; sceneId: string }
  | { type: 'setEnding'; endingKey: string };

export type Choice = {
  id: string;
  label: string;
  effects?: Effect[];
  conditions?: Condition[];
  nextSceneId: string;
};

export type Scene = {
  id: string;
  chapter: number;
  pov: POV;
  speaker?: string;
  text: string[];
  choices: Choice[];
  conditions?: Condition[];
  onEnterEffects?: Effect[];
  nextSceneId?: string;
  tags?: string[];
};

export type SceneGraph = Record<string, Scene>;

export const initialTimelineState: TimelineState = {
  stability: 0,
  controlIndex: 0,
  rebellion: 0,
  memoryFracture: 0,
  magicEntropy: 0,
  flags: {},
  seenScenes: [],
  codex: [],
  chapter: 1,
  currentSceneId: 'ch1_p_001',
  currentPOV: 'protector',
};
