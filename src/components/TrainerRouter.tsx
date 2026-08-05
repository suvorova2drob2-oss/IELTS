import { BeforeYouReadTrainer } from "./BeforeYouReadTrainer";
import { LeadInTrainer } from "./LeadInTrainer";
import { ReadingFlowTrainer } from "./ReadingFlowTrainer";
import { VocabularyFlowTrainer } from "./VocabularyFlowTrainer";
import { beforeYouReadM1 } from "../data/beforeYouReadM1";
import { leadInIntelligence } from "../data/leadInIntelligence";
import { readingFlowM1 } from "../data/readingFlowM1";
import { vocabularyM1 } from "../data/vocabularyM1";

export const trainerRegistry: Record<string, true> = {
  "reading-m1-flow": true,
  "vocabulary-m1-flow": true,
  "before-you-read-m1": true,
  "lead-in-intelligence": true,
  "reading-completion-m1": true,
};

export function TrainerView({
  trainerId,
  onBack,
  onContinue,
  continueLabel,
  contextLabel,
  restart,
  initialStep,
}: {
  trainerId: string;
  onBack?: () => void;
  onContinue?: () => void;
  continueLabel?: string;
  contextLabel?: string;
  restart?: boolean;
  initialStep?: number;
}) {
  if (trainerId === "reading-m1-flow") {
    return (
      <ReadingFlowTrainer
        data={readingFlowM1}
        onBack={onBack}
        contextLabel={contextLabel}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "vocabulary-m1-flow") {
    return (
      <VocabularyFlowTrainer
        data={vocabularyM1}
        onBack={onBack}
        contextLabel={contextLabel}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "before-you-read-m1") {
    return (
      <BeforeYouReadTrainer
        data={beforeYouReadM1}
        onBack={onBack}
        contextLabel={contextLabel}
      />
    );
  }

  if (trainerId === "lead-in-intelligence") {
    return (
      <LeadInTrainer
        data={leadInIntelligence}
        onBack={onBack}
        onContinue={onContinue}
        continueLabel={continueLabel}
        contextLabel={contextLabel}
      />
    );
  }

  return null;
}

export function hasTrainer(trainerId: string): boolean {
  return trainerId in trainerRegistry;
}
