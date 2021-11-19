import { Checkbox } from '@mui/material';
import React from 'react';
import { useLocalStorageState } from '../../hooks/use-local-storage-state/use-local-storage-state';

const Status = ({ id }: { id: string }) => {
  // const [checked, handleChange] = useLocalStorageState({
  //   key: id,
  //   defaultValue: 'ready',
  // });
  return (
    <Checkbox
      // checked={!!checked}
      // onChange={handleChange}
      // inputProps={{ 'aria-label': 'controlled' }}
      defaultChecked={false}
    />
  );
};

export const Instructions = () => (
  <div>
    <h3>Your tasks are:</h3>
    <ul>
      <li>
        <Status id="db" /> construct a local database to store trivia data (can
        be either noSQL, SQL or in-memory, upon your preference)
      </li>
      <li>
        <Status id="endpoints" /> establish the endpoints which would serve for
        the frontend.
        <ul>
          <li>
            <Status id="login" /> and endpoint to store (=login) the user, and
            return the userid (better in a masked or even in JWT format)
          </li>
          <li>
            <Status id="quiz" /> and endpoint to get the quiz questions, which
            shall fetch the questions from a remote 3rd party api
          </li>
          <li>
            {' '}
            <Status id="results" /> and endpoint to update the user's
            quizResults
          </li>
        </ul>
      </li>
      <li>
        <Status id="frontend" /> use the provided components from
        `apps/test-trivia` to establish the workflow towards to the backend
      </li>
      <li>
        <Status id="apicalls" /> amend and complete api calls from frontend to
        your new backend
      </li>
    </ul>
    More precise information on tasks and instructions to be found on the{' '}
    <a
      href="https://github.com/finnoconsult/interview-test-transactions/blob/master/README.md"
      target="_blank"
      rel="noreferrer"
    >
      README.md
    </a>
  </div>
);
