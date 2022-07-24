import { Router } from 'express';
import {
  eachUserLeftJoin,
  exclusiveLeftJoin,
  groupbyHaving,
  innerJoin,
  leftJoin,
} from '../controllers/join';

const router = Router();

router.get('/innerjoin', innerJoin);

router.get('/leftjoin', leftJoin);

router.get('/leftjoin/:id', eachUserLeftJoin);

router.get('/groupbyhaving', groupbyHaving);

router.get('/exclusiveleftjoin', exclusiveLeftJoin);

export default router;
