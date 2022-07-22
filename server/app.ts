import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import mysql from 'mysql';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

const db = mysql.createConnection({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PWD,
  database: process.env.DB,
});

app.post('/create', async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);

  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    'INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)',
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(201).json(result);
      }
    }
  );
});

app.get(
  '/employees',
  async (req: Request, res: Response, next: NextFunction) => {
    db.query('SELECT * FROM employees', (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  }
);

app.get(
  '/employees/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const employeeId = req.params.id;
    db.query(
      'SELECT * FROM employees WHERE id=?',
      [employeeId],
      (err, result) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(result);
        }
      }
    );
  }
);

app.put('/update', async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    console.error(error);
  }
});

app.delete(
  '/delete/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      console.error(error);
    }
  }
);

app.listen(8080, () => {
  console.log('MySQL have been started!');
});
