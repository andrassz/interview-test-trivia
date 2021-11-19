import React, { useEffect, useState } from 'react';
import { Health } from '@finnoconsult-test-trivia/api-interfaces';
import Styled from '@emotion/styled';
import CssBaseline from '@mui/material/CssBaseline';

const WelcomeStyles = Styled.div`
  display: flex;
  width: 100%;
  background-color: rgba(0, 189, 89, 1);
  padding: 10px;
  background-image: url();

  h1 {
    margin: auto;
  }
  img {
    position: absolute;
    top: 16px;
    let: 20px;
  }
`;

const HealthCheck = () => {
  const [health, setHealth] = useState<Health>({
    status: 'pending...',
    userCount: -1,
    started: null,
  });

  useEffect(() => {
    // 💡 NOTE: window.fetch is deprecated, it's expected to be replaced by a proper networking solution
    fetch('/api/health')
      .then((r) => r.json())
      .then(setHealth);
  }, []);

  return (
    <h3>
      Server status: {health.status}
      {health.started && (
        <small>
          , running since: {new Date(health.started).toString().substr(0, 28)}
        </small>
      )}
    </h3>
  );
};
const Welcome = () => {
  return (
    <WelcomeStyles>
      <img src="./assets/logo.svg" alt="Finno" width="180px" />
      <h1>Welcome to Trivia Quiz exercise!</h1>
    </WelcomeStyles>
  );
};

const Instructions = () => (
  <div>
    <h3>Your tasks are:</h3>
    <ul>
      <li>construct a local database to store trivia data</li>
      <li>seed on first starting your backend from trivia api</li>
      <li>establish the endpoints which would serve for the frontend.</li>
      <li>
        use the provided components from `apps/test-trivia` to establish the
        workflow towards to the backend
      </li>
      <li> make api calls from frontend to backend</li>
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

export const App = () => {
  return (
    <>
      <CssBaseline />
      <Welcome />
      <HealthCheck />
      <Instructions />
    </>
  );
};

export default App;
