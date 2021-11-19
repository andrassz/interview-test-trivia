import styled from '@emotion/styled';
import Final from './Final';
import { QuestionAndAnswers } from './QuestionAndAnswers';
import { useStatus } from './state/stateMachineContext';
import UserForm from './UserForm';

const StyledPages = styled.div``;

export function Pages() {
  const state = useStatus();
  console.log('state', state.value, state.context);
  return (
    <StyledPages>
      {state?.matches('idle') && <UserForm />}
      {state?.matches('question') && <QuestionAndAnswers />}
      {state?.matches('final') && <Final />}
    </StyledPages>
  );
}

export default Pages;
