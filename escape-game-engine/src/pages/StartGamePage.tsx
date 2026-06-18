import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import { StorageService } from "../services/StorageService";

export function StartGamePage() {
  const [teamName, setTeamName] = useState("");
  const { game, setState } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    if (!game) navigate("/");
  }, [game]);

  if (!game) return null;

  const startGame = () => {
    const state = {
      teamName,
      startedAt: new Date().toISOString(),
      currentPageIndex: 0,
      penaltiesSeconds: 0,
      finished: false,
      events: [],
      unlockedHints: {}
    };

    setState(state);
    StorageService.saveGame(game);
    StorageService.saveState(state);
    navigate("/game");
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">{game.title}</h1>

      <input
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        placeholder="Nom de l'equip"
        className="w-full border rounded-lg px-4 py-3"
      />

      <button
        onClick={startGame}
        disabled={!teamName.trim()}
        className="mt-4 w-full bg-emerald-500 text-white rounded-lg py-3 disabled:opacity-50"
      >
        Començar partida
      </button>
    </>
  );
}