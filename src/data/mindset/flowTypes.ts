/** Declarative step schema for Mindset Level 3 skill flows (U5–U8). */

export type McOption = { id: string; text: string };

export type McItem = {
  id: string;
  stem: string;
  options: McOption[];
  key: string;
  tip?: string;
};

export type YnngItem = {
  id: string;
  stem: string;
  key: "Yes" | "No" | "Not Given" | "True" | "False";
  tip?: string;
};

export type MatchItem = {
  id: string;
  stem: string;
  key: string;
  tip?: string;
};

export type GapItem = {
  id: string;
  /** Full stem with __________ for the gap (display only). */
  stem: string;
  key: string;
  altKeys?: string[];
  tip?: string;
};

export type KeysItem = {
  id: string;
  label: string;
  key: string;
  altKeys?: string[];
};

export type FlowStep =
  | {
      kind: "intro";
      badge?: string;
      goals?: string[];
      instruction?: string;
      discuss?: string[];
      tips?: string[];
      passage?: string;
    }
  | {
      kind: "mc";
      badge?: string;
      instruction: string;
      tip?: string;
      passage?: string;
      items: McItem[];
      /** When true, several answers may be selected (multi-select). */
      multi?: boolean;
      /** For multi: correct option ids per question id. */
      multiKeys?: Record<string, string[]>;
    }
  | {
      kind: "ynng";
      badge?: string;
      instruction: string;
      tip?: string;
      passage?: string;
      labels?: string[];
      items: YnngItem[];
    }
  | {
      kind: "match";
      badge?: string;
      instruction: string;
      tip?: string;
      passage?: string;
      bank: { id: string; text: string }[];
      items: MatchItem[];
    }
  | {
      kind: "gaps";
      badge?: string;
      instruction: string;
      tip?: string;
      passage?: string;
      /** Chips shown in bank (click → place). */
      bank: string[];
      items: GapItem[];
    }
  | {
      kind: "oddOut";
      badge?: string;
      instruction: string;
      tip?: string;
      groups: {
        id: string;
        words: string[];
        key: string;
        reason: string;
      }[];
    }
  | {
      kind: "passageExam";
      badge?: string;
      instruction: string;
      passage: string;
      ynng?: {
        instruction: string;
        items: YnngItem[];
      };
      match?: {
        instruction: string;
        bank: { id: string; text: string }[];
        items: MatchItem[];
      };
      mc?: {
        instruction: string;
        items: McItem[];
      };
      gaps?: {
        instruction: string;
        bank: string[];
        items: GapItem[];
      };
    }
  | {
      kind: "writing";
      badge?: string;
      instruction: string;
      prompt: string;
      tableNote?: string;
      minWords: number;
      sample: string;
      cue?: string;
      /** Mindset Task 1 chart id rendered by MindsetFlowTrainer. */
      chart?: "u5-workforce-bars" | "u7-news-pies";
    }
  | {
      kind: "keysOnly";
      badge?: string;
      instruction: string;
      tip?: string;
      note?: string;
      bank: string[];
      items: KeysItem[];
      mc?: McItem[];
    }
  | {
      kind: "speak";
      badge?: string;
      instruction: string;
      card?: string;
      prompts?: string[];
      tips?: string[];
      samples?: string[];
    }
  | {
      kind: "reveal";
      badge?: string;
      instruction: string;
      blocks: { title: string; lines: string[] }[];
    };

export type MindsetFlowData = {
  id: string;
  bookPages: string;
  sectionTitle: string;
  unitGoals: string[];
  steps: string[];
  nextLabels: string[];
  panels: FlowStep[];
};
