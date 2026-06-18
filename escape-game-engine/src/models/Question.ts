import type { QuestionType } from "./QuestionType";

export interface TextQuestionConfig {
  length?: number;
}

export interface SelectQuestionConfig {
  options: string[];
  emptyOption: string;
}

export interface CodeQuestionConfig {
  digits: number;
}

export interface DateQuestionConfig {}

export type QuestionConfig =
  | TextQuestionConfig
  | SelectQuestionConfig
  | CodeQuestionConfig
  | DateQuestionConfig;

export interface Question {
  type: QuestionType;
  answer: string;
  hints?: string[];
  penaltySeconds?: number;
  formatHelp?: string;
  config?: QuestionConfig;
}