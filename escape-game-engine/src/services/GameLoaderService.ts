import type { EscapeGame } from "../models/EscapeGame";
import { EscapeGameSchema } from "../models/GameSchema";
import { GameParserService } from "./GameParserService";
import type { ZodError } from "zod";

export type GameLoadResult =
  | {
      success: true;
      data: EscapeGame;
    }
  | {
      success: false;
      error: ZodError | Error;
    };

export class GameLoaderService {

  static validate(gameData: unknown): GameLoadResult {
    try {
      const game = EscapeGameSchema.parse(gameData);
      return {
        success: true,
        data: game
      };
    } catch (err) {
      return {
        success: false,
        error: err as any
      };
    }
  }

  static async loadFromFile(file: File): Promise<GameLoadResult> {
    try {
      const text = await file.text();
      let game: EscapeGame;
      if (file.name.toLowerCase().endsWith(".csv")) {
        game = GameParserService.parse(text);
      } else {
        game = JSON.parse(text);
      }
      return this.validate(game);
    } catch (err) {
      return {
        success: false,
        error: err as Error
      };
    }
  }
}