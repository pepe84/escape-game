import type { EscapeGame } from "../models/EscapeGame";
import type { GameState } from "../models/GameState";

export class GameClockService {

  static getElapsedSeconds(state: GameState): number {

    if (!state?.startedAt) return 0;

    const start = new Date(state.startedAt).getTime();
    const now = Date.now();

    return Math.max(0, Math.floor((now - start) / 1000));
  }

  static getPenaltySeconds(state: GameState): number {
    return state?.penaltiesSeconds ?? 0;
  }

  static getRemainingSeconds(game: EscapeGame, state: GameState): number {

    const total = (game?.durationMinutes ?? 0) * 60;

    const elapsed = this.getElapsedSeconds(state);

    const penalties = this.getPenaltySeconds(state);

    return Math.max(total - elapsed - penalties, 0);
  }

  static isTimeOver(game: EscapeGame, state: GameState): boolean {
    return this.getRemainingSeconds(game, state) <= 0;
  }

  static getUsedSeconds(game: EscapeGame, state: GameState): number {

    const total = (game?.durationMinutes ?? 0) * 60;

    return total - this.getRemainingSeconds(game, state);
  }

  static formatSeconds(seconds: number): string {

    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return `${String(h).padStart(2, "0")}h:${String(m).padStart(2, "0")}m:${String(s).padStart(2, "0")}s`;
  }
}