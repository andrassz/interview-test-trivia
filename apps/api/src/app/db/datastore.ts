import { UserRecord } from '@finnoconsult-test-trivia/api-interfaces';
import * as sqlite3 from 'sqlite3';
import { AnyStateNodeDefinition } from 'xstate';

let db: sqlite3.Database;

export const initDB = (databaseUrl: string) => {
  db = connect(databaseUrl);
  createTable();
};

function createTable() {
  db.run(
    `CREATE TABLE IF NOT EXISTS USER_RESULT (
    ID INTEGER PRIMARY KEY,
    USERNAME TEXT,
    QUIZ_RESULT REAL
    )`
  );
}

function connect(databaseUrl: string) {
  return new sqlite3.Database(
    databaseUrl,
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Connected to the memory database.');
    }
  );
}

export function updateResult(id: number, quizResult: number): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    db.run(
      'update user_result set quiz_result=? where id = ?',
      [quizResult, id],
      function (err) {
        if (err) {
          console.log('Cannot update results');
          reject(err);
          return;
        }
        resolve(this.changes);
      }
    );
  });
}

export function saveUser(username: string): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    db.run(
      'insert into user_result (username) values (?)',
      [username],
      function (err) {
        if (err) {
          console.log('Cannot save user');
          reject(err);
          return;
        }
        resolve(this.lastID);
      }
    );
  });
}

export function queryAll(): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    const list = [];
    db.all('select * from user_result', function (err, rows) {
      if (err) {
        reject(err);
        return;
      }
      rows.forEach((row) => {
        console.log(row);
        list.push(row);
      });
      console.log(list);
      resolve(list);
    });
  });
}
