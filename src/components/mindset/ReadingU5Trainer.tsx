import { MindsetFlowTrainer } from "./MindsetFlowTrainer";
import { readingU5 } from "../../data/mindset/readingU5";

export function ReadingU5Trainer({
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
      data={readingU5}
      onBack={onBack}
      restart={restart}
      initialStep={initialStep}
    />
  );
}
