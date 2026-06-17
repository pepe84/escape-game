import { useGame } from "../context/GameContext";
import { StorageService } from "../services/StorageService";

export function useGamePersistence() {

  const { setState } = useGame();

  const commit = (state: any) => {
    setState(state);
    StorageService.saveState(state);
  };

  return { commit };
}