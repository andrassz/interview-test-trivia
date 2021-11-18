import React, { useEffect, useState } from 'react';
import { Message } from '@finnoconsult-test-trivia/api-interfaces';

import logo from './logo.svg';

export const App = () => {
  const [m, setMessage] = useState<Message>({ message: '' });

  useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then(setMessage);
  }, []);

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <img src={logo} alt="Finno" />
        Trivia App
      </div>
      <div>{m.message}</div>
    </>
  );
};

export default App;
