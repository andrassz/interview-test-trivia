import styled from '@emotion/styled';
import { useInterpret } from '@xstate/react';
import Pages from './Pages';
import { gameState } from './state/stateMachine';
import { GameStateContext } from './state/stateMachineContext';

/* eslint-disable-next-line */
export interface GameProps {}

const StyledGame = styled.div``;

export function Game(props: GameProps) {
  const gameStateService = useInterpret(gameState, {
    devTools: process.env.NODE_ENV === 'development',
    // actions: {},
  });

  return (
    <GameStateContext.Provider value={gameStateService}>
      <StyledGame>
        <Pages />
      </StyledGame>
    </GameStateContext.Provider>
  );
}

export default Game;
