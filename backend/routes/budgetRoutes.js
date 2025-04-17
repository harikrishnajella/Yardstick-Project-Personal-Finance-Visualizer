// routes/budgetRoutes.js

import express from 'express';
import {
  getBudgets,
  setBudget,
  updateBudget,
  deleteBudget,
  getBudgetSummary,
} from '../controllers/budgetController.js';

const router = express.Router();

router.get('/', getBudgets);
router.get('/summary', getBudgetSummary); 
router.post('/', setBudget);
router.put('/:id', updateBudget);
router.delete('/:id', deleteBudget);

export default router;
