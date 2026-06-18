import type { GameEvent } from "../models/GameEvent";
import { GameEventType } from "../models/GameEventType";
import type { GameState } from "../models/GameState";

export class GameEngineService {

  static factory(teamName: string): GameState {

    const state: GameState = {
      teamName,
      startedAt: new Date().toISOString(),
      currentPageIndex: 0,
      penaltiesSeconds: 0,
      finished: false,
      unlockedHints: {},
      events: []
    };

    return this.addEvent(
      state,
      {
        pageIndex: 0,
        type: GameEventType.GAME_STARTED
      }
    );
  }

  static nextPage(state: GameState): GameState {

    const nextState = {
      ...state,
      currentPageIndex: state.currentPageIndex + 1
    };

    return this.addEvent(nextState, {
      pageIndex: nextState.currentPageIndex,
      type: GameEventType.PAGE_OPENED
    });
  }

  static registerSuccess(state: GameState): GameState {

    return this.addEvent(state, {
      pageIndex: state.currentPageIndex,
      type: GameEventType.CORRECT_ANSWER
    });
  }

  static applyPenalty(state: GameState, seconds = 60): GameState {

    const nextState = {
      ...state,
      penaltiesSeconds: state.penaltiesSeconds + seconds
    };

    return this.addEvent(nextState, {
      pageIndex: state.currentPageIndex,
      type: GameEventType.WRONG_ANSWER,
      value: String(seconds)
    });
  }

  static finishGame(state: GameState): GameState {

    const nextState = {
      ...state,
      finished: true,
      finishedAt: new Date().toISOString()
    };

    return this.addEvent(nextState, {
      pageIndex: state.currentPageIndex,
      type: GameEventType.GAME_FINISHED
    });    
  }

  static isLastPage(game: any, state: GameState) {
    return state.currentPageIndex >= game.pages.length - 1;
  }

  static getProgress(game: any, state: GameState) {
    let current = state.currentPageIndex;
    let total = game.pages.length;
    return Math.round(Math.min(100, ((current + 1) / total) * 100));
  }
  
  static unlockHint(state: GameState, pageIndex: number): GameState {

    const current = state.unlockedHints?.[pageIndex] ?? 0;

    const nextState = {
      ...state,
      unlockedHints: {
        ...state.unlockedHints,
        [pageIndex]: current + 1
      }
    };

    return this.addEvent(nextState, {
      pageIndex,
      type: GameEventType.HINT_OPENED,
      value: String(current + 1)
    });
  }

  static unlockSolution(state: GameState): GameState {
    return this.addEvent(state, {
      pageIndex: state.currentPageIndex,
      type: GameEventType.SOLUTION_OPENED
    });
  }

  static getUnlockedHintsCount(state: GameState, pageIndex: number) {
    return state.unlockedHints?.[pageIndex] ?? 0;
  }

  static addEvent(state: GameState, event: Omit<GameEvent, "timestamp">): GameState {
    return {
      ...state,
      events: [
        ...state.events,
        {
          ...event,
          timestamp: new Date().toISOString()
        }
      ]
    };
  }

}