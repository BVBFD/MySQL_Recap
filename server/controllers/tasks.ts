import { Request, Response, NextFunction } from 'express';
import { db } from '../app';

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const taskId = req.body.taskId;
  const taskName = req.body.taskName;
  const hour = req.body.hour;
  const userId = req.body.userId;

  db.query(
    'INSERT INTO tasks (taskId, taskName, hour, userId) VALUES (?,?,?,?)',
    [taskId, taskName, hour, userId],
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(201).json(result);
      }
    }
  );
};

export const getTotalTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  db.query('SELECT * FROM tasks', (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result);
    }
  });
};

export const getTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const taskId = req.params.taskId;
  db.query('SELECT * FROM tasks WHERE taskId=?', [taskId], (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result);
    }
  });
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const taskId = req.body.taskId;
  const body = req.body;

  db.query(
    'UPDATE tasks SET ? WHERE taskId=?',
    [body, taskId],
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    }
  );
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const taskId = req.params.taskId;

  db.query('DELETE FROM tasks WHERE taskId=?', [taskId], (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(204).json(result);
    }
  });
};
