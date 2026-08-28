import { BeforeYouReadTrainer } from "./BeforeYouReadTrainer";
import { LeadInTrainer, trainers as leadInTrainers } from "./LeadInTrainer";
import { ReadingFlowTrainer } from "./ReadingFlowTrainer";
import { VocabularyFlowTrainer } from "./VocabularyFlowTrainer";
import { WritingFlowTrainer } from "./WritingFlowTrainer";
import { LanguageFlowTrainer } from "./LanguageFlowTrainer";
import { ReviewM1Trainer } from "./ReviewM1Trainer";
import { ReviewM2Trainer } from "./ReviewM2Trainer";
import { ReadingM2Trainer } from "./ReadingM2Trainer";
import { ReadingM3Trainer } from "./ReadingM3Trainer";
import { VocabularyM2Trainer } from "./VocabularyM2Trainer";
import { VocabularyM3Trainer } from "./VocabularyM3Trainer";
import { ListeningM1Trainer } from "./ListeningM1Trainer";
import { ListeningM1bTrainer } from "./ListeningM1bTrainer";
import { ListeningM2aTrainer } from "./ListeningM2aTrainer";
import { ListeningM2bTrainer } from "./ListeningM2bTrainer";
import { LanguageM1aTrainer } from "./LanguageM1aTrainer";
import { LanguageM2aTrainer } from "./LanguageM2aTrainer";
import { WritingM1aTrainer } from "./WritingM1aTrainer";
import { WritingM2aTrainer } from "./WritingM2aTrainer";
import { WritingM2bTrainer } from "./WritingM2bTrainer";
import { SpeakingM1bTrainer } from "./SpeakingM1bTrainer";
import { SpeakingM2aTrainer } from "./SpeakingM2aTrainer";
import { SpeakingM2bTrainer } from "./SpeakingM2bTrainer";
import { SpeakingM3aTrainer } from "./SpeakingM3aTrainer";
import { beforeYouReadM1 } from "../data/beforeYouReadM1";
import { readingFlowM1 } from "../data/readingFlowM1";
import { readingFlowM1b } from "../data/readingFlowM1b";
import { readingM2 } from "../data/readingM2";
import { readingM2b } from "../data/readingM2b";
import { vocabularyM1 } from "../data/vocabularyM1";

export const trainerRegistry: Record<string, true> = {
  "reading-m1-flow": true,
  "reading-m1b-flow": true,
  "reading-m2-flow": true,
  "reading-m2b-flow": true,
  "reading-m3-flow": true,
  "vocabulary-m2-flow": true,
  "vocabulary-m3-flow": true,
  "writing-m1b-flow": true,
  "writing-m1a-flow": true,
  "writing-m2a-flow": true,
  "writing-m2b-flow": true,
  "language-m1b-flow": true,
  "language-m1a-flow": true,
  "language-m2a-flow": true,
  "review-m1-flow": true,
  "review-m2-flow": true,
  "vocabulary-m1-flow": true,
  "before-you-read-m1": true,
  "lead-in-intelligence": true,
  "lead-in-development": true,
  "lead-in-insect-empire": true,
  "lead-in-libraries-m1": true,
  "lead-in-teenagers": true,
  "listening-m1-flow": true,
  "listening-m1b-flow": true,
  "listening-m2a-flow": true,
  "listening-m2b-flow": true,
  "speaking-m1b-flow": true,
  "speaking-m2a-flow": true,
  "speaking-m2b-flow": true,
  "speaking-m3a-flow": true,
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
        data={readingM2}
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "reading-m2b-flow") {
    return (
      <ReadingM2Trainer
        data={readingM2b}
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "reading-m3-flow") {
    return (
      <ReadingM3Trainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "writing-m1a-flow") {
    return (
      <WritingM1aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "writing-m2a-flow") {
    return (
      <WritingM2aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "writing-m2b-flow") {
    return (
      <WritingM2bTrainer
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

  if (trainerId === "language-m1a-flow") {
    return (
      <LanguageM1aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "language-m2a-flow") {
    return (
      <LanguageM2aTrainer
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

  if (trainerId === "review-m2-flow") {
    return (
      <ReviewM2Trainer
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

  if (trainerId === "vocabulary-m3-flow") {
    return (
      <VocabularyM3Trainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "listening-m1-flow") {
    return (
      <ListeningM1Trainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "listening-m1b-flow") {
    return (
      <ListeningM1bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "listening-m2a-flow") {
    return (
      <ListeningM2aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "listening-m2b-flow") {
    return (
      <ListeningM2bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "speaking-m1b-flow") {
    return (
      <SpeakingM1bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "speaking-m2a-flow") {
    return (
      <SpeakingM2aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "speaking-m2b-flow") {
    return (
      <SpeakingM2bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "speaking-m3a-flow") {
    return (
      <SpeakingM3aTrainer
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
