import { MindsetFlowTrainer } from "./MindsetFlowTrainer";
import { listeningU5 } from "../../data/mindset/listeningU5";

export function ListeningU5Trainer({
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
      data={listeningU5}
      onBack={onBack}
      restart={restart}
      initialStep={initialStep}
    />
  );
}
