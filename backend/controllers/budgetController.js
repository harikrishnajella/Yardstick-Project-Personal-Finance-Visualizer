// controllers/budgetController.js

import Category from '../models/Category.js'; 
import Budget from '../models/Budget.js';
import Transaction from '../models/Transaction.js';

export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch budgets' });
  }
};

export const setBudget = async (req, res) => {
  try {
     const { category, amount, month } = req.body;
    
    // Validate if category is a valid name
    const foundCategory = await Category.findOne({ name: category });
    if (!foundCategory) {
        return res.status(400).json({ error: 'Category not found' });
    }

    // Ensure that 'month' is a valid date and is set to the first day of the month
    const parsedMonth = new Date(month);
    if (isNaN(parsedMonth)) {
      return res.status(400).json({ error: 'Invalid month format' });
    }

    // Set the month to the 1st of the given month, if it's not already
    parsedMonth.setDate(1);

    // Check if the budget already exists for the given category and month
    const existingBudget = await Budget.findOne({ category, month: parsedMonth });
    if (existingBudget) {
      return res.status(400).json({ error: 'Budget already exists for this category and month' });
    }

    // Create a new budget
    const newBudget = new Budget({
        category,
        amount,
        month: parsedMonth, // Use the 1st of the given month
    });

    const saved = await newBudget.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Invalid budget data' });
  }
};

export const updateBudget = async (req, res) => {
  try {
    const { category } = req.body;
    
    // Validate if category is a valid name
    const foundCategory = await Category.findOne({ name: category });
    if (!foundCategory) {
        return res.status(400).json({ error: 'Category not found' });
    }

    const updated = await Budget.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update budget' });
  }
};

export const deleteBudget = async (req, res) => {
  try {
    await Budget.findByIdAndDelete(req.params.id);
    res.json({ message: 'Budget deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete budget' });
  }
};

// Budget vs Actual Summary
export const getBudgetSummary = async (req, res) => {
  try {
    const budgets = await Budget.find();
    const transactions = await Transaction.find();

    const summary = budgets.map((budget) => {
      const actualSpent = transactions
        .filter(
          (t) =>
            t.category === budget.category &&
            new Date(t.date).getMonth() === new Date(budget.month).getMonth()
        )
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        category: budget.category,
        budget: budget.amount,
        actual: actualSpent,
        month: budget.month,
      };
    });

    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: 'Failed to compute budget summary' });
  }
};
