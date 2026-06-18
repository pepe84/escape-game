import type { GameEvent } from "./GameEvent";

export interface GameState {

  teamName: string;

  startedAt: string;

  currentPageIndex: number;

  penaltiesSeconds: number;

  finished: boolean;

  finishedAt?: string;

  events: GameEvent[];

  unlockedHints: Record<string, number>;
}