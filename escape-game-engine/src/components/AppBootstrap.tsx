import { useEffect } from "react";
import { useGame } from "../context/GameContext";
import { StorageService } from "../services/StorageService";

export function AppBootstrap() {
  const { setGame, setState } = useGame();

  useEffect(() => {
    const game = StorageService.loadGame();
    const state = StorageService.loadState();

    if (game) setGame(game);
    if (state) setState(state);
  }, []);

  return null;
}