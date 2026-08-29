import { MindsetFlowTrainer } from "./MindsetFlowTrainer";
import { speakingU7 } from "../../data/mindset/speakingU7";

export function SpeakingU7Trainer({
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
      data={speakingU7}
      onBack={onBack}
      restart={restart}
      initialStep={initialStep}
    />
  );
}
