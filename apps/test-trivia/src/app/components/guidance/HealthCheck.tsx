import React, { useEffect, useState } from 'react';
import { Health } from '@finnoconsult-test-trivia/api-interfaces';

export const HealthCheck = () => {
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
