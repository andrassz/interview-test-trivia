import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface GameProps {}

const StyledGame = styled.div`
  color: pink;
`;

export function Game(props: GameProps) {
  return (
    <StyledGame>
      <h1>Welcome to Game!</h1>
    </StyledGame>
  );
}

export default Game;
