import { Router } from 'express';
import {
  exclusiveLeftJoin,
  groupbyHaving,
  innerJoin,
  leftJoin,
} from '../controllers/join';

const router = Router();

router.get('/innerjoin', innerJoin);

router.get('/leftjoin', leftJoin);

router.get('/groupbyhaving', groupbyHaving);

router.get('/exclusiveleftjoin', exclusiveLeftJoin);

export default router;
