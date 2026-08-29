import { MindsetFlowTrainer } from "./MindsetFlowTrainer";
import { readingU8 } from "../../data/mindset/readingU8";

export function ReadingU8Trainer({
  onBack,
  restart,
  initialStep,
}: {
  onBack?: () => void;
  restart?: boolean;
  initialStep?: number;
}) {
  return (
    <MindsetFlowTrainer
      data={readingU8}
      onBack={onBack}
      restart={restart}
      initialStep={initialStep}
    />
  );
}
