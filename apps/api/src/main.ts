import * as express from 'express';
import { Health } from '@finnoconsult-test-trivia/api-interfaces';

const app = express();

const started = new Date();

app.get('/api/health', (req, res) => {
  res.send({
    status: 'OK',
    started,
  } as Health);
});

console.warn('TODO: implement all endpoints!');

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
