import { MindsetFlowTrainer } from "./MindsetFlowTrainer";
import { writingU7 } from "../../data/mindset/writingU7";

export function WritingU7Trainer({
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
      data={writingU7}
      onBack={onBack}
      restart={restart}
      initialStep={initialStep}
    />
  );
}
