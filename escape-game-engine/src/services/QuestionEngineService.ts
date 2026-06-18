export class QuestionEngineService {

  static evaluate(question: any, userAnswer: any) {

    switch (question.type) {

      case "text":
        return this.evalText(question, userAnswer);

      case "select":
        return this.evalSelect(question, userAnswer);

      case "code":
        return this.evalCode(question, userAnswer);

      case "date":
        return this.evalDate(question, userAnswer);

      default:
        return { correct: false, error: "Unknown type" };
    }
  }

  static evalText(question: any, answer: string) {
    const ok =
      answer.trim().toLowerCase() ===
      question.answer.trim().toLowerCase();

    return { correct: ok };
  }

  static evalSelect(question: any, answer: string) {
    return {
      correct: answer === question.answer
    };
  }

  static evalCode(question: any, answer: string[]) {
    const ok =
      JSON.stringify(answer) ===
      JSON.stringify(question.answer);

    return { correct: ok };
  }

  static evalDate(question: any, answer: string) {
    return {
      correct: answer === question.answer
    };
  }
}