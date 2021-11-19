import { assign, createMachine } from 'xstate';
import {
  Question,
  Answer,
  UserData,
} from '@finnoconsult-test-trivia/api-interfaces';
import { getQuestions } from '@finnoconsult-test-trivia/questions';

export type MachineEvent =
  | { type: 'LOGIN' }
  | { type: 'RETRY' }
  | { type: 'ANSWER' }
  | { type: 'RESTART' };

export interface MachineContext {
  questions?: Question[];
  answers?: Answer[];
  user?: UserData;
}

const loadQuestions = async () => {
  console.log('getQuestions', getQuestions);
  return getQuestions();
};

export const gameState = createMachine<MachineContext, MachineEvent>(
  {
    id: 'triviaGame',
    initial: 'idle',
    states: {
      idle: {
        on: {
          LOGIN: {
            target: 'loading',
            actions: 'setUser',
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
          // console.log('storeQuestions', _type, event);
          return { questions: event?.data?.results };
        }
      ),
      setUser: assign(
        (_context: MachineContext, { type: _type, ...user }: any) => {
          // console.log('setUser', _type, user);
          return { user };
        }
      ),
      assignData: assign(
        (_context: MachineContext, { type: _type, ...event }: any) => {
          return event;
        }
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
