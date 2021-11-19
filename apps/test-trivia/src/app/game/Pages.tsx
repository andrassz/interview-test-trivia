import styled from '@emotion/styled';
import Question from './Question';
import { useStatus } from './state/stateMachineContext';
import UserForm from './UserForm';

const StyledPages = styled.div``;

export function Pages() {
  const state = useStatus();
  return (
    <StyledPages>
      {state?.matches('idle') && <UserForm />}
      {state?.matches('question') && <Question />}
    </StyledPages>
  );
}

export default Pages;
