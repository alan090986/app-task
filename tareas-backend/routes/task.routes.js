import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import {
  createTask,
  getTasks,
  deleteTask,
  updateTask
} from '../controllers/tasks.controller.js';

const router = Router();

// Todas requieren token
router.post('/', authMiddleware, createTask);
router.get('/', authMiddleware, getTasks);
router.delete('/:id', authMiddleware, deleteTask);
router.put('/:id', authMiddleware, updateTask);

export default router;

