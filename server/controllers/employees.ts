import { Request, Response, NextFunction, Router } from 'express';
import { db } from '../app';

export const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};

export const getTotalEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  db.query('SELECT * FROM employees', (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result);
    }
  });
};

export const getEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};

export const updateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.body.id;
  const body = req.body;

  db.query('UPDATE employees SET ? WHERE id=?', [body, id], (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(201).json(result);
    }
  });
};

export const deleteEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  db.query('DELETE FROM employees WHERE id=?', [id], (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(204).json('Delete it successfully');
    }
  });
};
