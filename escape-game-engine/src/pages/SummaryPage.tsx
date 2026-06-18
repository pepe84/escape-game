import { useGame } from "../context/GameContext";
import { GameClockService } from "../services/GameClockService";

export function SummaryPage() {
  const { game, state } = useGame();
  const used = GameClockService.getUsedSeconds(game, state);

  return (
    <div>
      Temps utilitzat: {GameClockService.formatSeconds(used)}
    </div>
  );
}