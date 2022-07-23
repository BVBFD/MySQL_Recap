import {
  createEmployee,
  getTotalEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from './../controllers/employees';
import { Router } from 'express';

const router = Router();

router.post('/create', createEmployee);

router.get('/', getTotalEmployees);

router.get('/:id', getEmployee);

router.put('/update', updateEmployee);

router.delete('/delete/:id', deleteEmployee);

export default router;
