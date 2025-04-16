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
router.get('/summary', getBudgetSummary); // optional endpoint for budget vs actual chart
router.post('/', setBudget);
router.put('/:id', updateBudget);
router.delete('/:id', deleteBudget);

export default router;
