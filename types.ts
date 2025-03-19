export interface TemplateAnswers {
  date: string;
  goal: string;
  feelings: string;
  challenges: string;
  changes: string;
  description: string;
  sentence: string;
  [key: string]: string; // 인덱스 시그니처 추가
}
