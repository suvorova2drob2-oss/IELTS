import { MindsetFlowTrainer } from "./MindsetFlowTrainer";
import { speakingU6 } from "../../data/mindset/speakingU6";

export function SpeakingU6Trainer({
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
      data={speakingU6}
      onBack={onBack}
      restart={restart}
      initialStep={initialStep}
    />
  );
}
