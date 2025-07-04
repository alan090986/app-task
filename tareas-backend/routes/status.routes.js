import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.Middleware.js';
import {
  getStatuses,
  createStatus,
  getTaskStatuses
} from '../controllers/status.controller.js';

const router = Router();

router.get('/statuses', authMiddleware, getStatuses);
router.post('/statuses', authMiddleware, createStatus);
router.get('/task-status', authMiddleware, getTaskStatuses);
export default router;
