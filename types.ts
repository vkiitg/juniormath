
export type Grade = 1 | 2 | 3 | 4 | 5 | 6;

export interface MathTopic {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface MathProblem {
  id: string;
  question: string;
  answer: string;
}

export interface Worksheet {
  title: string;
  grade: Grade;
  topic: string;
  problems: MathProblem[];
  generatedAt: string;
}

export interface ExplanationResponse {
  explanation: string;
  example: string;
}

export interface AdminWorksheet {
  id: string;
  grade: Grade;
  topicId: string;
  title: string;
  fileName: string;
  dataUrl: string;
  previewUrl?: string;
  size: string;
  uploadedAt: string;
}
