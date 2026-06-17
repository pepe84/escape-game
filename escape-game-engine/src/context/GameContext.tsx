import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import type { EscapeGame } from "../models/EscapeGame";

interface GameContextType {
  game: EscapeGame | null;
  setGame: (game: EscapeGame | null) => void;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [game, setGame] = useState<EscapeGame | null>(null);

  return (
    <GameContext.Provider
      value={{game,setGame,}}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {

  const context = useContext(GameContext);

  if (!context) {
    throw new Error(
      "GameContext no disponible"
    );
  }

  return context;
}