import { MindsetFlowTrainer } from "./MindsetFlowTrainer";
import { listeningU7 } from "../../data/mindset/listeningU7";

export function ListeningU7Trainer({
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
      data={listeningU7}
      onBack={onBack}
      restart={restart}
      initialStep={initialStep}
    />
  );
}
