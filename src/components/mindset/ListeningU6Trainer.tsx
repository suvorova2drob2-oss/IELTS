import { MindsetFlowTrainer } from "./MindsetFlowTrainer";
import { listeningU6 } from "../../data/mindset/listeningU6";

export function ListeningU6Trainer({
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
      data={listeningU6}
      onBack={onBack}
      restart={restart}
      initialStep={initialStep}
    />
  );
}
