import { GameEventType } from "../models/GameEventType";
import type { GameState } from "../models/GameState";

export class SummaryService {

  static getWrongAnswers(state: GameState) {

    return state.events.filter(
      e => e.type === GameEventType.WRONG_ANSWER
    ).length;
  }

  static getHintsUsed(state: GameState) {

    return state.events.filter(
      e => e.type === GameEventType.HINT_OPENED
    ).length;
  }

  static getSolutionsViewed(state: GameState) {

    return state.events.filter(
      e => e.type === GameEventType.SOLUTION_OPENED
    ).length;
  }

  static getPenaltySeconds(state: GameState) {

    return state.penaltiesSeconds;
  }

}