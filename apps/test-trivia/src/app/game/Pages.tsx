import styled from '@emotion/styled';
import { QuestionAndAnswers } from './QuestionAndAnswers';
import { useStatus } from './state/stateMachineContext';
import UserForm from './UserForm';

const StyledPages = styled.div``;

export function Pages() {
  const state = useStatus();
  console.log('state', state.context);
  return (
    <StyledPages>
      {state?.matches('idle') && <UserForm />}
      {state?.matches('question') && <QuestionAndAnswers />}
    </StyledPages>
  );
}

export default Pages;
