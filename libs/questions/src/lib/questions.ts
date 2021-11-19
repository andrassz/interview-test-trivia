import { Question } from '@finnoconsult-test-trivia/api-interfaces';
import content from './questions.mock.json';

interface APIResponse {
  response_code: number;
  results: Question[];
}

export function questions(): APIResponse | null {
  console.log('content', content);
  return null;
}
