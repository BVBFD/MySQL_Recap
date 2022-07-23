import { Request, Response, NextFunction, Router } from 'express';
import { db } from '../app';

export const innerJoin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  db.query(
    'SELECT e.id, e.name, e.age, e.country, e.position, e.wage, t.taskName, t.hour, t.userId FROM employees AS e JOIN tasks AS t ON e.id=t.userId',
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    }
  );
};

export const leftJoin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  db.query(
    'SELECT * FROM employees AS e LEFT JOIN tasks AS t ON e.id=t.userId',
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    }
  );
};

export const exclusiveLeftJoin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 아래 조인한 t 테이블 값이 null만 출력하라는 것은 조인이 안된 e 테이블을 출력하라는 말임
  db.query(
    'SELECT * FROM employees AS e LEFT JOIN tasks AS t ON e.id=t.userId WHERE t.userId IS NULL',
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    }
  );
};

export const groupbyHaving = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  db.query(
    'SELECT e.age FROM employees AS e GROUP BY age HAVING age < 30 ORDER BY age ASC',
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    }
  );
};
