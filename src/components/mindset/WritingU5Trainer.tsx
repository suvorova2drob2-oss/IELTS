import { MindsetFlowTrainer } from "./MindsetFlowTrainer";
import { writingU5 } from "../../data/mindset/writingU5";

export function WritingU5Trainer({
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
      data={writingU5}
      onBack={onBack}
      restart={restart}
      initialStep={initialStep}
    />
  );
}
