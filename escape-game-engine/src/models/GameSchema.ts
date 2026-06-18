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
    "code",
    "date",
  ]),
  formatHelp: z.string().optional(),
  penaltySeconds: z.number().optional(),
  config: z.any().optional(),
  hints: z.array(z.string()).optional(),
  answer: z.string(),
});

const GamePageSchema = z.object({
  title: z.string(),
  content: PageContentSchema.optional(),
  question: QuestionSchema.optional(),
});

export const EscapeGameSchema = z.object({
  version: z.string(),
  title: z.string(),
  description: z.string().optional(),
  durationMinutes: z.number().positive(),
  pages: z.array(GamePageSchema).min(1),
});