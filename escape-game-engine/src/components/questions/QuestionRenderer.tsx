import type { QuestionProps } from "../../models/QuestionProps";
import { QuestionType } from "../../models/QuestionType";
import { TextQuestion } from "./TextQuestion";
import { SelectQuestion } from "./SelectQuestion";
import { CodeQuestion } from "./CodeQuestion";
import { DateQuestion } from "./DateQuestion";

export function QuestionRenderer({
  question,
  answer,
  onChange
}: QuestionProps) {

  switch (question.type) {

    case QuestionType.TEXT:
      return (
        <TextQuestion
          question={question}
          answer={answer}
          onChange={onChange}
        />
      );

    case QuestionType.SELECT:
      return (
        <SelectQuestion
          question={question}
          answer={answer}
          onChange={onChange}
        />
      );

    case QuestionType.CODE:
      return (
        <CodeQuestion
          question={question}
          answer={answer}
          onChange={onChange}
        />
      );

    case QuestionType.DATE:
      return (
        <DateQuestion
          question={question}
          answer={answer}
          onChange={onChange}
        />
      );

    default:
      return null;
  }
}