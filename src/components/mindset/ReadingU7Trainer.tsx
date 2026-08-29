import { MindsetFlowTrainer } from "./MindsetFlowTrainer";
import { readingU7 } from "../../data/mindset/readingU7";

export function ReadingU7Trainer({
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
      data={readingU7}
      onBack={onBack}
      restart={restart}
      initialStep={initialStep}
    />
  );
}
