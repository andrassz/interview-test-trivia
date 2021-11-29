import React, { useEffect, useState } from 'react';
import { Health } from '@finnoconsult-test-trivia/api-interfaces';
import axios from 'axios';
import { environment } from '../../../environments/environment';

export const HealthCheck = () => {
  const [health, setHealth] = useState<Health>({
    status: 'pending...',
    userCount: -1,
    started: null,
  });

  useEffect(() => {
    axios.get('/api/health').then((response) => {
      setHealth(response.data);
    });
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
