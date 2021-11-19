import { Question } from '@finnoconsult-test-trivia/api-interfaces';

interface APIResponse {
  response_code: number;
  results: Question[];
}

export function getQuestions(): APIResponse {
  return {
    response_code: 0,
    results: [
      {
        category: 'General Knowledge',
        type: 'multiple',
        difficulty: 'easy',
        question: 'Red Vines is a brand of what type of candy?',
        correct_answer: 'Licorice',
        incorrect_answers: ['Lollipop', 'Chocolate', 'Bubblegum'],
      },
      {
        category: 'General Knowledge',
        type: 'multiple',
        difficulty: 'easy',
        question: 'Which candy is NOT made by Mars?',
        correct_answer: 'Almond Joy',
        incorrect_answers: ["M&M's", 'Twix', 'Snickers'],
      },
    ],
  };
}
