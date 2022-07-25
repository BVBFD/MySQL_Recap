// import dotenv from 'dotenv';
require('dotenv').config();
// import { config } from 'dotenv';
const express = require('express');
import { Request, Response, NextFunction } from 'express';
const cors = require('cors');
// import cors from 'cors';
const helmet = require('helmet');
// import helmet from 'helmet';
const morgan = require('morgan');
// import morgan from 'morgan';
const mysql = require('mysql');
import { MysqlError } from 'mysql';

import employeesRouter from './routes/employees';
import tasksRouter from './routes/tasks';
import joinRouter from './routes/join';

const app = express();

let config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PWD,
  database: process.env.DB_DATABASE,
};

// @ts-ignore
export let db;

function handleDisconnect() {
  db = mysql.createConnection(config);

  db.connect(function (err: MysqlError) {
    if (err) {
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  db.on('error', function (err: MysqlError) {
    console.log('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

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
    db.query(
      'ALTER TABLE employees AUTO_INCREMENT = 1',
      [],
      (err: MysqlError | null, result: any) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json('initialize the auto employees Increment!');
        }
      }
    );
  }
);

app.get(
  '/inittaskid',
  async (req: Request, res: Response, next: NextFunction) => {
    db.query(
      'ALTER TABLE tasks AUTO_INCREMENT = 1',
      [],
      (err: MysqlError | null, result: any) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json('initialize the auto tasks Increment!');
        }
      }
    );
  }
);

// const preventClosingConnection = () => {
//   db.query('SELECT 1', [], (err: MysqlError | null, result: any) => {
//     if (err) {
//       console.log(err);
//     } else {
//     }
//   });
// };

// const intervalId = setInterval(preventClosingConnection, 5 * 1000);

// clearInterval(intervalId);

app.listen(process.env.PORT || 8080, () => {
  console.log('MySQL have been started!');
});
//
