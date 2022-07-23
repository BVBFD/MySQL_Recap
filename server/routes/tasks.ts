import { Router } from 'express';
import {
  createTask,
  deleteTask,
  getTask,
  getTotalTasks,
  updateTask,
} from '../controllers/tasks';

const router = Router();

router.post('/create', createTask);

router.get('/', getTotalTasks);

router.get('/:taskId', getTask);

router.put('/update', updateTask);

router.delete('/delete/:taskId', deleteTask);

export default router;
