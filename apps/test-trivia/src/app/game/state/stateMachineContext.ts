import { useActor, useSelector } from '@xstate/react';
import { createContext, useContext } from 'react';
import { Interpreter } from 'xstate';

import { MachineContext, MachineEvent } from './stateMachine';

// Configure for with React.Context:

export type GameStateInterpreter = Interpreter<
  MachineContext,
  any,
  MachineEvent,
  {
    value: any;
    context: MachineContext;
  }
>;
export type GameStateServiceType = GameStateInterpreter;

export const GameStateContext = createContext<GameStateServiceType>(
  {} as GameStateServiceType
);

export const useStatus = () => {
  const machineServices = useContext(GameStateContext);
  // send() from tupple didn't work.
  const [actionState] = useActor(machineServices);
  return actionState;
};

export const useContextState = () => {
  const machineServices = useContext(GameStateContext);
  // send() from tupple didn't work.
  const [actionState] = useActor(machineServices);
  return actionState.context;
};

export const useStatusMatches = (parentStateValue: any) => {
  const selector = (state: any) => state.matches(parentStateValue);

  const machineServices = useContext(GameStateContext);
  return !!useSelector(machineServices, selector);
};

export const useSend = () => {
  const service = useContext(GameStateContext);
  // NOTE: using send from the context directly, not from useActor https://dev.to/mpocock1/how-to-manage-global-state-with-xstate-and-react-3if5#dispatching-events
  const { send } = service;
  return send;
};
