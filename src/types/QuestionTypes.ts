export type QuestionType = 'single' | 'multiple' | 'short' | 'long';

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
}