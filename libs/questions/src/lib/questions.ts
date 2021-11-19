import { Question } from '@finnoconsult-test-trivia/api-interfaces';

interface APIResponse {
  response_code: number;
  results: Question[];
}

// TODO: this is what you need to replace with a call to the backend

export function getQuestions(): APIResponse {
  console.warn('TODO: implement getQuestions!');

  return {
    response_code: 0,
    results: [
      {
        category: 'General Knowledge',
        answer_type: 'multiple',
        difficulty: 'easy',
        question: 'Which one is a capital letter?',
        correct_answer: 'A',
        incorrect_answers: ['b', '#', '2'],
      },
      {
        category: 'General Knowledge',
        answer_type: 'multiple',
        difficulty: 'easy',
        question: '2 + 2?',
        correct_answer: '4',
        incorrect_answers: ['2', '3', '5'],
      },
    ],
  };
}
