import { MindsetFlowTrainer } from "./MindsetFlowTrainer";
import { writingU8 } from "../../data/mindset/writingU8";

export function WritingU8Trainer({
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
      data={writingU8}
      onBack={onBack}
      restart={restart}
      initialStep={initialStep}
    />
  );
}
