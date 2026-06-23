import { EscapeGameSchema } from "../models/GameSchema";

export class GameLoaderService {

  static validate(data: unknown) {
    return EscapeGameSchema.safeParse(data);
  }

  static async loadFromFile(file: File) {
    const text = await file.text();
    const json = JSON.parse(text);
    return this.validate(json);
  }
}