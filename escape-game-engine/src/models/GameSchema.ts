import { z } from "zod";

const ParagraphBlockSchema = z.object({
  type: z.literal("paragraph"),
  text: z.string(),
});

const ImageBlockSchema = z.object({
  type: z.literal("image"),
  src: z.string(),
  alt: z.string().optional(),
});

const ContentBlockSchema = z.union([
  ParagraphBlockSchema,
  ImageBlockSchema,
]);

const PageContentSchema = z.union([
  z.string(),
  z.array(ContentBlockSchema),
]);

const QuestionSchema = z.object({
  type: z.enum([
    "text",
    "select",
    "numericCode",
    "date",
  ]),
  answer: z.string(),
  penaltySeconds: z.number().optional(),
  errorHelp: z.string().optional(),
  config: z.any().optional(),
});

const InfoPageSchema = z.object({
  id: z.string(),
  type: z.literal("info"),
  title: z.string(),
  content: PageContentSchema.optional(),
});

const QuestionPageSchema = z.object({
  id: z.string(),
  type: z.literal("question"),
  title: z.string(),
  content: PageContentSchema.optional(),
  question: QuestionSchema,
  hints: z.array(z.string()).optional(),
  solution: z.string().optional(),
});

const GamePageSchema = z.union([
  InfoPageSchema,
  QuestionPageSchema,
]);

export const EscapeGameSchema = z.object({
  version: z.string(),
  title: z.string(),
  description: z.string().optional(),
  durationMinutes: z.number().positive(),
  pages: z.array(GamePageSchema).min(1),
});