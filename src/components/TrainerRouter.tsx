import { BeforeYouReadTrainer } from "./BeforeYouReadTrainer";
import { LeadInTrainer, trainers as leadInTrainers } from "./LeadInTrainer";
import { ReadingFlowTrainer } from "./ReadingFlowTrainer";
import { VocabularyFlowTrainer } from "./VocabularyFlowTrainer";
import { WritingFlowTrainer } from "./WritingFlowTrainer";
import { LanguageFlowTrainer } from "./LanguageFlowTrainer";
import { ReviewM1Trainer } from "./ReviewM1Trainer";
import { ReadingM2Trainer } from "./ReadingM2Trainer";
import { VocabularyM2Trainer } from "./VocabularyM2Trainer";
import { beforeYouReadM1 } from "../data/beforeYouReadM1";
import { readingFlowM1 } from "../data/readingFlowM1";
import { readingFlowM1b } from "../data/readingFlowM1b";
import { vocabularyM1 } from "../data/vocabularyM1";

export const trainerRegistry: Record<string, true> = {
  "reading-m1-flow": true,
  "reading-m1b-flow": true,
  "reading-m2-flow": true,
  "vocabulary-m2-flow": true,
  "writing-m1b-flow": true,
  "language-m1b-flow": true,
  "review-m1-flow": true,
  "vocabulary-m1-flow": true,
  "before-you-read-m1": true,
  "lead-in-intelligence": true,
  "lead-in-development": true,
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
  if (trainerId === "reading-m1-flow" || trainerId === "reading-m1b-flow") {
    return (
      <ReadingFlowTrainer
        data={trainerId === "reading-m1b-flow" ? readingFlowM1b : readingFlowM1}
        onBack={onBack}
        contextLabel={contextLabel}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "reading-m2-flow") {
    return (
      <ReadingM2Trainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "writing-m1b-flow") {
    return (
      <WritingFlowTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "language-m1b-flow") {
    return (
      <LanguageFlowTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "review-m1-flow") {
    return (
      <ReviewM1Trainer
        onBack={onBack}
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

  if (trainerId === "vocabulary-m2-flow") {
    return (
      <VocabularyM2Trainer
        onBack={onBack}
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

  if (trainerId in leadInTrainers) {
    return (
      <LeadInTrainer
        data={leadInTrainers[trainerId]}
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
