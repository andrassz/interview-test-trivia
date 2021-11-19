import { assign, createMachine } from 'xstate';
import { Question, Answer } from '@finnoconsult-test-trivia/api-interfaces';
// import { getQuestions } from '@finnoconsult-test-trivia/questions';

export type MachineEvent =
  | { type: 'LOGIN' }
  | { type: 'RETRY' }
  | { type: 'ANSWER' }
  | { type: 'RESTART' };

export interface MachineContext {
  questions: Question[];
  answers: Answer[];
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
            target: 'question',
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
      storeQuestions: assign(
        (_context: MachineContext, { type: _type, ...event }: any) => {
          console.log('storeQuestions', _type, event);
          return event;
        }
      ),
      assignData: assign(
        (_context: MachineContext, { type: _type, ...event }: any) => event
      ),
    },
    guards: {
      hasMoreQuestion: (e, b) => {
        console.log(
          'hasMoreQuestion',
          e,
          b,
          'TODO: eval if state.questions.length = state.answers.length'
        );
        return true;
      },
    },
  }
);
