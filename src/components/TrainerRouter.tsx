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
import { ListeningM3aTrainer } from "./ListeningM3aTrainer";
import { ListeningM3bTrainer } from "./ListeningM3bTrainer";
import { LanguageM1aTrainer } from "./LanguageM1aTrainer";
import { LanguageM2aTrainer } from "./LanguageM2aTrainer";
import { LanguageM3aTrainer } from "./LanguageM3aTrainer";
import { LanguageM3bTrainer } from "./LanguageM3bTrainer";
import { WritingM1aTrainer } from "./WritingM1aTrainer";
import { WritingM2aTrainer } from "./WritingM2aTrainer";
import { WritingM2bTrainer } from "./WritingM2bTrainer";
import { WritingM3aTrainer } from "./WritingM3aTrainer";
import { SpeakingM1bTrainer } from "./SpeakingM1bTrainer";
import { SpeakingM2aTrainer } from "./SpeakingM2aTrainer";
import { SpeakingM2bTrainer } from "./SpeakingM2bTrainer";
import { SpeakingM3aTrainer } from "./SpeakingM3aTrainer";
import { SpeakingM3bTrainer } from "./SpeakingM3bTrainer";
import { SpeakingM4aTrainer } from "./SpeakingM4aTrainer";
import { SpeakingM4bTrainer } from "./SpeakingM4bTrainer";
import { ReadingM3bTrainer } from "./ReadingM3bTrainer";
import { ReadingM4aTrainer } from "./ReadingM4aTrainer";
import { ReadingM4bTrainer } from "./ReadingM4bTrainer";
import { WritingM3bTrainer } from "./WritingM3bTrainer";
import { WritingM4aTrainer } from "./WritingM4aTrainer";
import { WritingM4bTrainer } from "./WritingM4bTrainer";
import { ReviewM3Trainer } from "./ReviewM3Trainer";
import { ReviewM4Trainer } from "./ReviewM4Trainer";
import { ReviewM5Trainer } from "./ReviewM5Trainer";
import { VocabularyM4Trainer } from "./VocabularyM4Trainer";
import { VocabularyM5Trainer } from "./VocabularyM5Trainer";
import { ListeningM4aTrainer } from "./ListeningM4aTrainer";
import { ListeningM4bTrainer } from "./ListeningM4bTrainer";
import { ListeningM5aTrainer } from "./ListeningM5aTrainer";
import { ListeningM5bTrainer } from "./ListeningM5bTrainer";
import { LanguageM4aTrainer } from "./LanguageM4aTrainer";
import { LanguageM4bTrainer } from "./LanguageM4bTrainer";
import { LanguageM5aTrainer } from "./LanguageM5aTrainer";
import { LanguageM5bTrainer } from "./LanguageM5bTrainer";
import { SpeakingM5aTrainer } from "./SpeakingM5aTrainer";
import { SpeakingM5bTrainer } from "./SpeakingM5bTrainer";
import { ReadingM5aTrainer } from "./ReadingM5aTrainer";
import { ReadingM5bTrainer } from "./ReadingM5bTrainer";
import { WritingM5aTrainer } from "./WritingM5aTrainer";
import { WritingM5bTrainer } from "./WritingM5bTrainer";
import { ReadingM6aTrainer } from "./ReadingM6aTrainer";
import { ReadingM6bTrainer } from "./ReadingM6bTrainer";
import { VocabularyM6Trainer } from "./VocabularyM6Trainer";
import { SpeakingM6aTrainer } from "./SpeakingM6aTrainer";
import { SpeakingM6bTrainer } from "./SpeakingM6bTrainer";
import { ListeningM6aTrainer } from "./ListeningM6aTrainer";
import { ListeningM6bTrainer } from "./ListeningM6bTrainer";
import { LanguageM6aTrainer } from "./LanguageM6aTrainer";
import { LanguageM6bTrainer } from "./LanguageM6bTrainer";
import { WritingM6aTrainer } from "./WritingM6aTrainer";
import { WritingM6bTrainer } from "./WritingM6bTrainer";
import { ReviewM6Trainer } from "./ReviewM6Trainer";
import { ReadingM7aTrainer } from "./ReadingM7aTrainer";
import { ReadingM7bTrainer } from "./ReadingM7bTrainer";
import { VocabularyM7Trainer } from "./VocabularyM7Trainer";
import { SpeakingM7aTrainer } from "./SpeakingM7aTrainer";
import { SpeakingM7bTrainer } from "./SpeakingM7bTrainer";
import { ListeningM7aTrainer } from "./ListeningM7aTrainer";
import { ListeningM7bTrainer } from "./ListeningM7bTrainer";
import { LanguageM7aTrainer } from "./LanguageM7aTrainer";
import { LanguageM7bTrainer } from "./LanguageM7bTrainer";
import { WritingM7aTrainer } from "./WritingM7aTrainer";
import { WritingM7bTrainer } from "./WritingM7bTrainer";
import { ReviewM7Trainer } from "./ReviewM7Trainer";
import { ReadingM8aTrainer } from "./ReadingM8aTrainer";
import { ReadingM8bTrainer } from "./ReadingM8bTrainer";
import { VocabularyM8Trainer } from "./VocabularyM8Trainer";
import { SpeakingM8aTrainer } from "./SpeakingM8aTrainer";
import { SpeakingM8bTrainer } from "./SpeakingM8bTrainer";
import { ListeningM8aTrainer } from "./ListeningM8aTrainer";
import { ListeningM8bTrainer } from "./ListeningM8bTrainer";
import { LanguageM8aTrainer } from "./LanguageM8aTrainer";
import { LanguageM8bTrainer } from "./LanguageM8bTrainer";
import { WritingM8aTrainer } from "./WritingM8aTrainer";
import { WritingM8bTrainer } from "./WritingM8bTrainer";
import { ReviewM8Trainer } from "./ReviewM8Trainer";
import { ReadingM9aTrainer } from "./ReadingM9aTrainer";
import { ReadingM9bTrainer } from "./ReadingM9bTrainer";
import { VocabularyM9Trainer } from "./VocabularyM9Trainer";
import { SpeakingM9aTrainer } from "./SpeakingM9aTrainer";
import { SpeakingM9bTrainer } from "./SpeakingM9bTrainer";
import { ListeningM9aTrainer } from "./ListeningM9aTrainer";
import { ListeningM9bTrainer } from "./ListeningM9bTrainer";
import { LanguageM9aTrainer } from "./LanguageM9aTrainer";
import { LanguageM9bTrainer } from "./LanguageM9bTrainer";
import { WritingM9aTrainer } from "./WritingM9aTrainer";
import { WritingM9bTrainer } from "./WritingM9bTrainer";
import { ReviewM9Trainer } from "./ReviewM9Trainer";
import { ReadingM10aTrainer } from "./ReadingM10aTrainer";
import { ReadingM10bTrainer } from "./ReadingM10bTrainer";
import { VocabularyM10Trainer } from "./VocabularyM10Trainer";
import { SpeakingM10aTrainer } from "./SpeakingM10aTrainer";
import { SpeakingM10bTrainer } from "./SpeakingM10bTrainer";
import { ListeningM10aTrainer } from "./ListeningM10aTrainer";
import { ListeningM10bTrainer } from "./ListeningM10bTrainer";
import { LanguageM10aTrainer } from "./LanguageM10aTrainer";
import { LanguageM10bTrainer } from "./LanguageM10bTrainer";
import { WritingM10aTrainer } from "./WritingM10aTrainer";
import { WritingM10bTrainer } from "./WritingM10bTrainer";
import { ReviewM10Trainer } from "./ReviewM10Trainer";
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
  "reading-m3b-flow": true,
  "reading-m4a-flow": true,
  "reading-m4b-flow": true,
  "reading-m5a-flow": true,
  "reading-m5b-flow": true,
  "reading-m6a-flow": true,
  "reading-m6b-flow": true,
  "reading-m7a-flow": true,
  "reading-m7b-flow": true,
  "reading-m8a-flow": true,
  "reading-m8b-flow": true,
  "reading-m9a-flow": true,
  "reading-m9b-flow": true,
  "reading-m10a-flow": true,
  "reading-m10b-flow": true,
  "vocabulary-m2-flow": true,
  "vocabulary-m3-flow": true,
  "vocabulary-m4-flow": true,
  "vocabulary-m5-flow": true,
  "vocabulary-m6-flow": true,
  "vocabulary-m7-flow": true,
  "vocabulary-m8-flow": true,
  "vocabulary-m9-flow": true,
  "vocabulary-m10-flow": true,
  "writing-m1b-flow": true,
  "writing-m1a-flow": true,
  "writing-m2a-flow": true,
  "writing-m2b-flow": true,
  "writing-m3a-flow": true,
  "writing-m3b-flow": true,
  "writing-m4a-flow": true,
  "writing-m4b-flow": true,
  "writing-m5a-flow": true,
  "writing-m5b-flow": true,
  "writing-m6a-flow": true,
  "writing-m6b-flow": true,
  "writing-m7a-flow": true,
  "writing-m7b-flow": true,
  "writing-m8a-flow": true,
  "writing-m8b-flow": true,
  "writing-m9a-flow": true,
  "writing-m9b-flow": true,
  "writing-m10a-flow": true,
  "writing-m10b-flow": true,
  "language-m1b-flow": true,
  "language-m1a-flow": true,
  "language-m2a-flow": true,
  "language-m3a-flow": true,
  "language-m3b-flow": true,
  "language-m4a-flow": true,
  "language-m4b-flow": true,
  "language-m5a-flow": true,
  "language-m5b-flow": true,
  "language-m6a-flow": true,
  "language-m6b-flow": true,
  "language-m7a-flow": true,
  "language-m7b-flow": true,
  "language-m8a-flow": true,
  "language-m8b-flow": true,
  "language-m9a-flow": true,
  "language-m9b-flow": true,
  "language-m10a-flow": true,
  "language-m10b-flow": true,
  "review-m1-flow": true,
  "review-m2-flow": true,
  "review-m3-flow": true,
  "review-m4-flow": true,
  "review-m5-flow": true,
  "review-m6-flow": true,
  "review-m7-flow": true,
  "review-m8-flow": true,
  "review-m9-flow": true,
  "review-m10-flow": true,
  "vocabulary-m1-flow": true,
  "before-you-read-m1": true,
  "lead-in-intelligence": true,
  "lead-in-development": true,
  "lead-in-insect-empire": true,
  "lead-in-libraries-m1": true,
  "lead-in-teenagers": true,
  "lead-in-consumer": true,
  "lead-in-homes": true,
  "lead-in-crime": true,
  "lead-in-urban": true,
  "lead-in-community": true,
  "lead-in-success": true,
  "lead-in-cutting": true,
  "listening-m1-flow": true,
  "listening-m1b-flow": true,
  "listening-m2a-flow": true,
  "listening-m2b-flow": true,
  "listening-m3a-flow": true,
  "listening-m3b-flow": true,
  "listening-m4a-flow": true,
  "listening-m4b-flow": true,
  "listening-m5a-flow": true,
  "listening-m5b-flow": true,
  "listening-m6a-flow": true,
  "listening-m6b-flow": true,
  "listening-m7a-flow": true,
  "listening-m7b-flow": true,
  "listening-m8a-flow": true,
  "listening-m8b-flow": true,
  "listening-m9a-flow": true,
  "listening-m9b-flow": true,
  "listening-m10a-flow": true,
  "listening-m10b-flow": true,
  "speaking-m1b-flow": true,
  "speaking-m2a-flow": true,
  "speaking-m2b-flow": true,
  "speaking-m3a-flow": true,
  "speaking-m3b-flow": true,
  "speaking-m4a-flow": true,
  "speaking-m4b-flow": true,
  "speaking-m5a-flow": true,
  "speaking-m5b-flow": true,
  "speaking-m6a-flow": true,
  "speaking-m6b-flow": true,
  "speaking-m7a-flow": true,
  "speaking-m7b-flow": true,
  "speaking-m8a-flow": true,
  "speaking-m8b-flow": true,
  "speaking-m9a-flow": true,
  "speaking-m9b-flow": true,
  "speaking-m10a-flow": true,
  "speaking-m10b-flow": true,
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

  if (trainerId === "writing-m3a-flow") {
    return (
      <WritingM3aTrainer
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

  if (trainerId === "language-m3a-flow") {
    return (
      <LanguageM3aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "language-m3b-flow") {
    return (
      <LanguageM3bTrainer
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

  if (trainerId === "listening-m3a-flow") {
    return (
      <ListeningM3aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "listening-m3b-flow") {
    return (
      <ListeningM3bTrainer
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

  if (trainerId === "speaking-m3b-flow") {
    return (
      <SpeakingM3bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "reading-m3b-flow") {
    return (
      <ReadingM3bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "reading-m4a-flow") {
    return (
      <ReadingM4aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "writing-m3b-flow") {
    return (
      <WritingM3bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "review-m3-flow") {
    return (
      <ReviewM3Trainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "review-m4-flow") {
    return (
      <ReviewM4Trainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "vocabulary-m4-flow") {
    return (
      <VocabularyM4Trainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "speaking-m4a-flow") {
    return (
      <SpeakingM4aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "speaking-m4b-flow") {
    return (
      <SpeakingM4bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "listening-m4a-flow") {
    return (
      <ListeningM4aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "listening-m4b-flow") {
    return (
      <ListeningM4bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "language-m4a-flow") {
    return (
      <LanguageM4aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "language-m4b-flow") {
    return (
      <LanguageM4bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "writing-m4a-flow") {
    return (
      <WritingM4aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "writing-m4b-flow") {
    return (
      <WritingM4bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "reading-m4b-flow") {
    return (
      <ReadingM4bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "reading-m5a-flow") {
    return (
      <ReadingM5aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "reading-m5b-flow") {
    return (
      <ReadingM5bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "vocabulary-m5-flow") {
    return (
      <VocabularyM5Trainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "speaking-m5a-flow") {
    return (
      <SpeakingM5aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "speaking-m5b-flow") {
    return (
      <SpeakingM5bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "listening-m5a-flow") {
    return (
      <ListeningM5aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "listening-m5b-flow") {
    return (
      <ListeningM5bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "language-m5a-flow") {
    return (
      <LanguageM5aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "language-m5b-flow") {
    return (
      <LanguageM5bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "writing-m5a-flow") {
    return (
      <WritingM5aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "writing-m5b-flow") {
    return (
      <WritingM5bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "review-m5-flow") {
    return (
      <ReviewM5Trainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "reading-m6a-flow") {
    return (
      <ReadingM6aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "reading-m6b-flow") {
    return (
      <ReadingM6bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "vocabulary-m6-flow") {
    return (
      <VocabularyM6Trainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "speaking-m6a-flow") {
    return (
      <SpeakingM6aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "speaking-m6b-flow") {
    return (
      <SpeakingM6bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "listening-m6a-flow") {
    return (
      <ListeningM6aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "listening-m6b-flow") {
    return (
      <ListeningM6bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "language-m6a-flow") {
    return (
      <LanguageM6aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "language-m6b-flow") {
    return (
      <LanguageM6bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "writing-m6a-flow") {
    return (
      <WritingM6aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "writing-m6b-flow") {
    return (
      <WritingM6bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "review-m6-flow") {
    return (
      <ReviewM6Trainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "reading-m7a-flow") {
    return (
      <ReadingM7aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "reading-m7b-flow") {
    return (
      <ReadingM7bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "vocabulary-m7-flow") {
    return (
      <VocabularyM7Trainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "speaking-m7a-flow") {
    return (
      <SpeakingM7aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "speaking-m7b-flow") {
    return (
      <SpeakingM7bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "listening-m7a-flow") {
    return (
      <ListeningM7aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "listening-m7b-flow") {
    return (
      <ListeningM7bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "language-m7a-flow") {
    return (
      <LanguageM7aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "language-m7b-flow") {
    return (
      <LanguageM7bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "writing-m7a-flow") {
    return (
      <WritingM7aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "writing-m7b-flow") {
    return (
      <WritingM7bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "review-m7-flow") {
    return (
      <ReviewM7Trainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "reading-m8a-flow") {
    return (
      <ReadingM8aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "reading-m8b-flow") {
    return (
      <ReadingM8bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "vocabulary-m8-flow") {
    return (
      <VocabularyM8Trainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "speaking-m8a-flow") {
    return (
      <SpeakingM8aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "speaking-m8b-flow") {
    return (
      <SpeakingM8bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "listening-m8a-flow") {
    return (
      <ListeningM8aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "listening-m8b-flow") {
    return (
      <ListeningM8bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "language-m8a-flow") {
    return (
      <LanguageM8aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "language-m8b-flow") {
    return (
      <LanguageM8bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "writing-m8a-flow") {
    return (
      <WritingM8aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "writing-m8b-flow") {
    return (
      <WritingM8bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "review-m8-flow") {
    return (
      <ReviewM8Trainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "reading-m9a-flow") {
    return (
      <ReadingM9aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "reading-m9b-flow") {
    return (
      <ReadingM9bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "vocabulary-m9-flow") {
    return (
      <VocabularyM9Trainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "speaking-m9a-flow") {
    return (
      <SpeakingM9aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "speaking-m9b-flow") {
    return (
      <SpeakingM9bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "listening-m9a-flow") {
    return (
      <ListeningM9aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "listening-m9b-flow") {
    return (
      <ListeningM9bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "language-m9a-flow") {
    return (
      <LanguageM9aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "language-m9b-flow") {
    return (
      <LanguageM9bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "writing-m9a-flow") {
    return (
      <WritingM9aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "writing-m9b-flow") {
    return (
      <WritingM9bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "review-m9-flow") {
    return (
      <ReviewM9Trainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "reading-m10a-flow") {
    return (
      <ReadingM10aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "reading-m10b-flow") {
    return (
      <ReadingM10bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "vocabulary-m10-flow") {
    return (
      <VocabularyM10Trainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "speaking-m10a-flow") {
    return (
      <SpeakingM10aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "speaking-m10b-flow") {
    return (
      <SpeakingM10bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "listening-m10a-flow") {
    return (
      <ListeningM10aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "listening-m10b-flow") {
    return (
      <ListeningM10bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "language-m10a-flow") {
    return (
      <LanguageM10aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "language-m10b-flow") {
    return (
      <LanguageM10bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "writing-m10a-flow") {
    return (
      <WritingM10aTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "writing-m10b-flow") {
    return (
      <WritingM10bTrainer
        onBack={onBack}
        restart={restart}
        initialStep={initialStep}
      />
    );
  }

  if (trainerId === "review-m10-flow") {
    return (
      <ReviewM10Trainer
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
