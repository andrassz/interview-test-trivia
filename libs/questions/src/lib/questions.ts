import { Question } from '@finnoconsult-test-trivia/api-interfaces';
import axios from 'axios';

interface APIResponse {
  response_code: number;
  results: Question[];
}

// TODO: this is what you need to replace with a call to the backend

export function getQuestions(): Promise<APIResponse> {
  console.warn('TODO: implement getQuestions!');
  return new Promise<APIResponse>((resolve, reject) => {
    axios
      .get('/api/questions')
      .then((response) => {
        resolve(response.data as APIResponse);
      })
      .catch((err) => reject(err));
  });
  /*return {
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
  };*/
}
