import { MindsetFlowTrainer } from "./MindsetFlowTrainer";
import { writingU6 } from "../../data/mindset/writingU6";

export function WritingU6Trainer({
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
      data={writingU6}
      onBack={onBack}
      restart={restart}
      initialStep={initialStep}
    />
  );
}
