import { assign, createMachine } from 'xstate';
import {
  Question,
  Answer,
  createAnswer,
  UserRecord,
} from '@finnoconsult-test-trivia/api-interfaces';
import { getQuestions } from '@finnoconsult-test-trivia/questions';
import axios, { AxiosRequestConfig } from 'axios';

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
  user?: UserRecord;
}

const sendUserToBackend = async (username: string): Promise<string> => {
  console.warn('TODO: implement sendUserToBackend!');
  console.log(`This is username: ${JSON.stringify(username)}`);
  return new Promise<string>((resolve, reject) => {
    axios
      .post('/api/user', {
        username: username,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const setAuthentication = (token: string) => {
  axios.interceptors.request.use((config: AxiosRequestConfig<any>) => {
    if (token) {
      console.log('Adding token to headers...');
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  });
};

const loadQuestions = async () => {
  return await getQuestions();
};

const sendResultToBackend = async (quizResult: number) => {
  console.warn('TODO: imple1ment sendResultToBackend!');
  axios.put('api/result', {
    quizResult: quizResult,
  });
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
          },
        },
      },
      loading: {
        invoke: {
          id: 'sendUserToBackend',
          src: (_context: any, event: any) => sendUserToBackend(event.username),
          onDone: {
            target: 'loadQuestionsState',
            actions: 'setUser',
          },
          onError: {
            target: 'idle',
            actions: 'handleError',
          },
        },
      },
      loadQuestionsState: {
        // onEntry: 'cleanUp',
        invoke: {
          src: loadQuestions,
          onDone: {
            target: 'question',
            actions: 'storeQuestions', //túl hamar/async történik? sokszor üres a questions mikor betölt a react componens...
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
            target: 'loadQuestionsState',
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
        onEntry: ['setAnswer', 'sendResult'],
        on: {
          RETRY: {
            actions: 'cleanUp',
            target: 'loadQuestionsState',
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
          return { questions: event?.data?.results };
        }
      ),
      setUser: assign(
        (_context: MachineContext, { type: _type, ...event }: any) => {
          console.log('setUser', _type, event);
          setAuthentication(event.data.id);
          return { user: event.data };
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
      sendResult: (context: MachineContext) => {
        if (context.answers) {
          // eslint-disable-next-line prettier/prettier
          const good = context.answers.filter((answer) => answer.correct).length;
          const all = context.answers.length;
          sendResultToBackend(good / all);
        } else {
          console.warn('No answers were found in context');
        }
      },
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
