export interface Health {
  status: 'OK' | string;
  userCount: number;
  started: Date | null;
}

export interface UserData {
  name: string;
  // ...
}

export interface UserRecord extends UserData {
  id?: string;
}
export interface Question {
  category: string;
  answer_type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface Answer {
  answer: string;
  correct: boolean;
}

export function createAnswer(question: Question, answer: string): Answer {
  const correct = question.correct_answer === answer;
  return {
    answer,
    correct,
  };
}
