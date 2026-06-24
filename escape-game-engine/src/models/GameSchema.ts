import { z } from "zod";

const QuestionSchema = z.object({
  type: z.enum(["text", "select", "code", "date"]),
  answer: z.string(),
  hints: z.array(z.string()).optional(),
  penaltySeconds: z.number().optional(),
  formatHelp: z.string().optional(),
  config: z.any().optional()
});

const GamePageSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
  question: QuestionSchema.optional()
});

export const EscapeGameSchema = z.object({
  version: z.string(),
  title: z.string(),
  description: z.string().optional(),
  durationMinutes: z.number().positive(),
  defaultPenaltySeconds: z.number().positive(),
  pages: z.array(GamePageSchema).min(1)
});