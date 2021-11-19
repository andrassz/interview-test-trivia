import { assign, createMachine } from 'xstate';
import { Question } from '@finnoconsult-test-trivia/api-interfaces';

type MachineEvent =
  | { type: 'LOGIN' }
  | { type: 'RETRY' }
  | { type: 'ANSWER' }
  | { type: 'RESTART' };

interface MachineContext {
  questions: Question[];
}

const loadQuestions = async () => null;

export const gameState = createMachine<MachineContext, MachineEvent>(
  {
    id: 'triviaGame',
    initial: 'idle',
    states: {
      idle: {
        on: {
          LOGIN: {
            target: 'loading',
          },
        },
      },

      loading: {
        invoke: {
          src: loadQuestions,
          onDone: {
            target: 'ready',
            actions: 'storeQuestions',
          },
          onError: {
            target: 'error',
            actions: 'handleError',
          },
        },
      },
      error: {
        on: {
          RETRY: {
            target: 'loading',
          },
        },
      },
      question: {
        on: {
          ANSWER: [
            {
              actions: 'new',
              cond: { type: 'hasMoreQuestion' },
            },
            {
              target: 'final',
            },
          ],
        },
      },
      final: {
        on: {
          RETRY: {
            actions: 'loading',
          },
        },
      },
    },
  },
  {
    actions: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      handleError: (error: any) => console.error(error),
      assignData: assign(
        (_context: MachineContext, { type: _type, ...event }: any) => event
      ),
    },
    guards: {
      hasMoreQuestion: (e, b) => {
        console.log('hasMoreQuestion', e, b);
        return true;
      },
    },
  }
);
