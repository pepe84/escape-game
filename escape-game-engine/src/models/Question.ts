export interface Question {

  type: "text" | "select" | "code" | "date";

  penaltySeconds?: number;

  formatHelp?: string;

  config?: {

    length?: number;

    digits?: number;

    options?: string[];
  };
 
  hints?: string[];

  answer: string;
  
}