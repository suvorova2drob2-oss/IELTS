import { MindsetFlowTrainer } from "./MindsetFlowTrainer";
import { listeningU8 } from "../../data/mindset/listeningU8";

export function ListeningU8Trainer({
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
      data={listeningU8}
      onBack={onBack}
      restart={restart}
      initialStep={initialStep}
    />
  );
}
