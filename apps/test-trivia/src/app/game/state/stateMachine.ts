import { assign, createMachine } from 'xstate';
import {
  Question,
  Answer,
  UserData,
  createAnswer,
} from '@finnoconsult-test-trivia/api-interfaces';
import { getQuestions } from '@finnoconsult-test-trivia/questions';

interface AnswerEventData extends Question {
  answer: string;
}

type AnswerEvent = { type: 'ANSWER' } & AnswerEventData;

export type MachineEvent = { type: 'LOGIN' } | { type: 'RETRY' } | AnswerEvent;

function isAnswerEvent(event: MachineEvent): event is AnswerEvent {
  return event.type === 'ANSWER';
}

export interface MachineContext {
  questions?: Question[];
  answers?: Answer[];
  user?: UserData;
}

const loadQuestions = async () => {
  return await getQuestions();
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
        // onEntry: 'cleanUp',
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
              target: 'question',
              cond: { type: 'hasMoreQuestion' },
              actions: 'setAnswer',
            },
            {
              target: 'final',
            },
          ],
        },
      },
      final: {
        // due that cond hasMoreQuestion is executed first, we need to store last answer here
        onEntry: 'setAnswer',
        on: {
          RETRY: {
            actions: 'cleanUp',
            target: 'loading',
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
      setAnswer: assign(
        (context: MachineContext, { type: _type, ...eventData }: any) => {
          // console.log('setAnswer', _type, eventData, context);
          const answer = createAnswer(eventData, eventData.answer);
          return {
            answers: context.answers ? [...context.answers, answer] : [answer],
          };
        }
      ),
      cleanUp: assign(
        (context: MachineContext, { type: _type, ...eventData }: any) => {
          // console.warn('cleanUp!!!');
          return { questions: undefined, answers: undefined };
        }
      ),
    },
    guards: {
      hasMoreQuestion: (context: MachineContext, event: any) => {
        if (isAnswerEvent(event)) {
          return (
            (context.answers?.length || 0) + (event.answer ? 1 : 0) <
            (context?.questions?.length || 0)
          );
        }
        return true;
      },
    },
  }
);
