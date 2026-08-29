import type { ComponentType } from "react";
import { ListeningU1Trainer } from "./mindset/ListeningU1Trainer";
import { ListeningU2Trainer } from "./mindset/ListeningU2Trainer";
import { ListeningU3Trainer } from "./mindset/ListeningU3Trainer";
import { ListeningU4Trainer } from "./mindset/ListeningU4Trainer";
import { ListeningU5Trainer } from "./mindset/ListeningU5Trainer";
import { ListeningU6Trainer } from "./mindset/ListeningU6Trainer";
import { ListeningU7Trainer } from "./mindset/ListeningU7Trainer";
import { ListeningU8Trainer } from "./mindset/ListeningU8Trainer";
import { ReadingU1Trainer } from "./mindset/ReadingU1Trainer";
import { ReadingU2Trainer } from "./mindset/ReadingU2Trainer";
import { ReadingU3Trainer } from "./mindset/ReadingU3Trainer";
import { ReadingU4Trainer } from "./mindset/ReadingU4Trainer";
import { ReadingU5Trainer } from "./mindset/ReadingU5Trainer";
import { ReadingU6Trainer } from "./mindset/ReadingU6Trainer";
import { ReadingU7Trainer } from "./mindset/ReadingU7Trainer";
import { ReadingU8Trainer } from "./mindset/ReadingU8Trainer";
import { SpeakingU1Trainer } from "./mindset/SpeakingU1Trainer";
import { SpeakingU2Trainer } from "./mindset/SpeakingU2Trainer";
import { SpeakingU3Trainer } from "./mindset/SpeakingU3Trainer";
import { SpeakingU4Trainer } from "./mindset/SpeakingU4Trainer";
import { SpeakingU5Trainer } from "./mindset/SpeakingU5Trainer";
import { SpeakingU6Trainer } from "./mindset/SpeakingU6Trainer";
import { SpeakingU7Trainer } from "./mindset/SpeakingU7Trainer";
import { SpeakingU8Trainer } from "./mindset/SpeakingU8Trainer";
import { WritingU1Trainer } from "./mindset/WritingU1Trainer";
import { WritingU2Trainer } from "./mindset/WritingU2Trainer";
import { WritingU3Trainer } from "./mindset/WritingU3Trainer";
import { WritingU4Trainer } from "./mindset/WritingU4Trainer";
import { WritingU5Trainer } from "./mindset/WritingU5Trainer";
import { WritingU6Trainer } from "./mindset/WritingU6Trainer";
import { WritingU7Trainer } from "./mindset/WritingU7Trainer";
import { WritingU8Trainer } from "./mindset/WritingU8Trainer";

type Trainer = ComponentType<{
  onBack?: () => void;
  restart?: boolean;
  initialStep?: number;
}>;

const mindsetTrainerRegistry: Record<string, Trainer> = {
  "ms-u1-reading-flow": ReadingU1Trainer,
  "ms-u1-writing-flow": WritingU1Trainer,
  "ms-u1-listening-flow": ListeningU1Trainer,
  "ms-u1-speaking-flow": SpeakingU1Trainer,
  "ms-u2-reading-flow": ReadingU2Trainer,
  "ms-u2-writing-flow": WritingU2Trainer,
  "ms-u2-listening-flow": ListeningU2Trainer,
  "ms-u2-speaking-flow": SpeakingU2Trainer,
  "ms-u3-reading-flow": ReadingU3Trainer,
  "ms-u3-writing-flow": WritingU3Trainer,
  "ms-u3-listening-flow": ListeningU3Trainer,
  "ms-u3-speaking-flow": SpeakingU3Trainer,
  "ms-u4-reading-flow": ReadingU4Trainer,
  "ms-u4-writing-flow": WritingU4Trainer,
  "ms-u4-listening-flow": ListeningU4Trainer,
  "ms-u4-speaking-flow": SpeakingU4Trainer,
  "ms-u5-reading-flow": ReadingU5Trainer,
  "ms-u5-writing-flow": WritingU5Trainer,
  "ms-u5-listening-flow": ListeningU5Trainer,
  "ms-u5-speaking-flow": SpeakingU5Trainer,
  "ms-u6-reading-flow": ReadingU6Trainer,
  "ms-u6-writing-flow": WritingU6Trainer,
  "ms-u6-listening-flow": ListeningU6Trainer,
  "ms-u6-speaking-flow": SpeakingU6Trainer,
  "ms-u7-reading-flow": ReadingU7Trainer,
  "ms-u7-writing-flow": WritingU7Trainer,
  "ms-u7-listening-flow": ListeningU7Trainer,
  "ms-u7-speaking-flow": SpeakingU7Trainer,
  "ms-u8-reading-flow": ReadingU8Trainer,
  "ms-u8-writing-flow": WritingU8Trainer,
  "ms-u8-listening-flow": ListeningU8Trainer,
  "ms-u8-speaking-flow": SpeakingU8Trainer,
};

export function hasMindsetTrainer(trainerId: string): boolean {
  return trainerId in mindsetTrainerRegistry;
}

export function MindsetTrainerView({
  trainerId,
  onBack,
  restart,
  initialStep,
  contextLabel,
}: {
  trainerId: string;
  onBack?: () => void;
  restart?: boolean;
  initialStep?: number;
  contextLabel?: string;
}) {
  const Trainer = mindsetTrainerRegistry[trainerId];
  if (!Trainer) {
    return (
      <div className="app-shell">
        {onBack && (
          <button type="button" className="back-link" onClick={onBack}>
            ← Back
          </button>
        )}
        <p>Trainer not found: {trainerId}</p>
        {contextLabel && <p>{contextLabel}</p>}
      </div>
    );
  }
  return (
    <Trainer onBack={onBack} restart={restart} initialStep={initialStep} />
  );
}
