import styled from '@emotion/styled';
import UserForm from './UserForm';

/* eslint-disable-next-line */
export interface GameProps {}

const StyledGame = styled.div``;

export function Game(props: GameProps) {
  return (
    <StyledGame>
      <UserForm />
    </StyledGame>
  );
}

export default Game;
