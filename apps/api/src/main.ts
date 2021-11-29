import * as express from 'express';
import { Health, UserRecord } from '@finnoconsult-test-trivia/api-interfaces';
import { environment as env } from './environments/environment';
import * as ds from './app/db/datastore';
import * as expressJwt from 'express-jwt';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';

const app = express();

const started = new Date();

//TODO return with some info on successful/failed connection status. so healthcheck can be more informative.
ds.initDB(env.databaseUrl);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  expressJwt({ secret: env.JWT_SECRET, algorithms: ['HS256'] }).unless({
    path: ['/api/health', '/api/user'],
  })
);

app.get('/api/health', (req, res) => {
  res.send({
    status: 'OK',
    started,
  } as Health);
});

app.post('/api/user', (req, res) => {
  ds.saveUser(req.body.username)
    .then((rowId) => {
      res.send({
        name: req.body.username,
        id: jwt.sign({ sub: rowId }, env.JWT_SECRET, { expiresIn: '1d' }),
      } as UserRecord);
    })
    .catch((err) => {
      console.log(`Error occured when inserting user: ${err}`);
    });
});

app.get('/api/result', (req, res) => {
  ds.queryAll()
    .then((list) => {
      res.send(list);
    })
    .catch((err) => {
      console.log(`Error occurred when listing the table records... ${err}`);
    });
});

app.put('/api/result', (req, res) => {
  console.log(req.user.sub);
  console.log(req.body.quizResult);
  ds.updateResult(req.user?.sub, req.body.quizResult)
    .then((changes) => {
      res.send({
        updated: changes,
      });
    })
    .catch((err) => {
      console.log(`Error occured when updating results: ${err}`);
    });
});

app.get('/api/questions', (req, res) => {
  axios
    .get(
      'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple&encode=url3986'
    )
    .then((request) => {
      request.data.results.map((r) => {
        r.answer_type = r.type;
        delete r.type;
      });
      res.send(decodeURI(JSON.stringify(request.data)));
    })
    .catch((err) => {
      console.log('something went wrong', err);
    });
});

console.warn('TODO: implement all endpoints!');

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
