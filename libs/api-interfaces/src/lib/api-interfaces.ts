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
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
