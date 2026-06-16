import { createContext } from "react";
import type { EscapeGame } from "../models/EscapeGame";

export interface GameContextType {

  game: EscapeGame | null;

  setGame: (
    game: EscapeGame | null
  ) => void;
}

export const GameContext =
  createContext<GameContextType | null>(null);