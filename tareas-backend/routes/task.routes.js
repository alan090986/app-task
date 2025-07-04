import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.Middleware.js';
import { getTaskStatuses } from '../controllers/taskStatus.controller.js';
import {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
  updateTaskStatus
} from '../controllers/task.controller.js';

const router = Router();

// Todas requieren token
router.post('/', authMiddleware, createTask);
router.get('/', authMiddleware, getTasks);
router.delete('/:id', authMiddleware, deleteTask);
router.put('/:id', authMiddleware, updateTask);
router.patch('/:id/status', authMiddleware, updateTaskStatus);


export default router;




