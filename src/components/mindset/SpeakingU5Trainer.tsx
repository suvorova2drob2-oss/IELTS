import { MindsetFlowTrainer } from "./MindsetFlowTrainer";
import { speakingU5 } from "../../data/mindset/speakingU5";

export function SpeakingU5Trainer({
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
      data={speakingU5}
      onBack={onBack}
      restart={restart}
      initialStep={initialStep}
    />
  );
}
