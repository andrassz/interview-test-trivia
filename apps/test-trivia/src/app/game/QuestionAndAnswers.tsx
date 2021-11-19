import styled from '@emotion/styled';
import { Question } from '@finnoconsult-test-trivia/api-interfaces';
import { Button } from '@mui/material';
import { useSend, useStatus } from './state/stateMachineContext';

export interface QuestionWithRandomAnswers extends Question {
  random_answers: string[];
}

/* eslint-disable-next-line */
export interface QuestionProps {}

const QuestionStyles = styled.div``;
const AnswerStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  place-content: center;
`;

const useCurrentQuestion = (): QuestionWithRandomAnswers | null => {
  const status = useStatus();

  const question =
    status.context.questions?.[status.context.answers?.length || 0];

  if (!question) return null;

  return {
    ...question,
    random_answers: [...question.incorrect_answers, question.correct_answer]
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value),
  };
};

export function QuestionAndAnswers(props: QuestionProps) {
  const send = useSend();
  const question = useCurrentQuestion();

  return (
    <QuestionStyles>
      <h1>{question?.question}</h1>

      <AnswerStyles>
        {question?.random_answers.map((answer) => (
          <Button
            key={answer}
            variant="contained"
            onClick={() => send('ANSWER', { answer })}
          >
            {answer}
          </Button>
        ))}
      </AnswerStyles>
    </QuestionStyles>
  );
}

export default Question;
