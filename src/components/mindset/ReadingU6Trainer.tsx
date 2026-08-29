import { MindsetFlowTrainer } from "./MindsetFlowTrainer";
import { readingU6 } from "../../data/mindset/readingU6";

export function ReadingU6Trainer({
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
      data={readingU6}
      onBack={onBack}
      restart={restart}
      initialStep={initialStep}
    />
  );
}
