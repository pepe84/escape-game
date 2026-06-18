import type { GameState } from "../models/GameState";

export class GameEngineService {

  static nextPage(state: GameState) {
    return { ...state, currentPageIndex: state.currentPageIndex + 1 };
  }

  static applyPenalty(state: GameState, seconds = 60) {
    return {
      ...state,
      penaltiesSeconds: state.penaltiesSeconds + seconds,
      events: [...state.events, { type: "error", page: state.currentPageIndex, date: new Date().toISOString() }]
    };
  }

  static registerSuccess(state: GameState) {
    return {
      ...state,
      events: [...state.events, { type: "success", page: state.currentPageIndex, date: new Date().toISOString() }]
    };
  }

  static finishGame(state: GameState) {
    return { ...state, finished: true, finishedAt: new Date().toISOString() };
  }

  static isLastPage(game: any, state: GameState) {
    return state.currentPageIndex >= game.pages.length - 1;
  }

  static getProgress(game: any, state: GameState) {
    let current = state.currentPageIndex;
    let total = game.pages.length;
    return Math.round(Math.min(100, ((current + 1) / total) * 100));
  }

  static getUnlockedHintsCount(state: GameState, pageIndex: number) {
    return state.unlockedHints?.[pageIndex] ?? 0;
  }
  
  static unlockHint(state: GameState, pageIndex: number) {

    const current =
      state.unlockedHints?.[pageIndex] ?? 0;

    return {
      ...state,
      unlockedHints: {
        ...state.unlockedHints,
        [pageIndex]: current + 1
      }
    };
  }

}