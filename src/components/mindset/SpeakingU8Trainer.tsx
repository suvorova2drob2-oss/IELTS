import { MindsetFlowTrainer } from "./MindsetFlowTrainer";
import { speakingU8 } from "../../data/mindset/speakingU8";

export function SpeakingU8Trainer({
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
      data={speakingU8}
      onBack={onBack}
      restart={restart}
      initialStep={initialStep}
    />
  );
}
