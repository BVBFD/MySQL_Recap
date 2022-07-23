import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mysql from 'mysql';

import employeesRouter from './routes/employees';
import tasksRouter from './routes/tasks';
import joinRouter from './routes/join';

dotenv.config();
const app = express();

export let db = mysql.createConnection({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PWD,
  database: process.env.DB,
});

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

app.use('/employees', employeesRouter);
app.use('/tasks', tasksRouter);
app.use('/join', joinRouter);

app.get(
  '/initemployeeid',
  async (req: Request, res: Response, next: NextFunction) => {
    db.query('ALTER TABLE employees AUTO_INCREMENT = 1', [], (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json('initialize the auto employees Increment!');
      }
    });
  }
);

app.get(
  '/inittaskid',
  async (req: Request, res: Response, next: NextFunction) => {
    db.query('ALTER TABLE tasks AUTO_INCREMENT = 1', [], (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json('initialize the auto tasks Increment!');
      }
    });
  }
);

// const preventClosingConnection = () => {
//   db.query('SELECT 1', [], (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//     }
//   });
// };

// const intervalId = setInterval(preventClosingConnection, 5 * 1000);

// clearInterval(intervalId);

app.listen(8080, () => {
  console.log('MySQL have been started!');
});
