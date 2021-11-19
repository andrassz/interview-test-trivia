import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface QuestionProps {}

const StyledQuestion = styled.div``;

export function Question(props: QuestionProps) {
  return (
    <StyledQuestion>
      <h1>Welcome to Question!</h1>
    </StyledQuestion>
  );
}

export default Question;
