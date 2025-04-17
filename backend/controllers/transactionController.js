// controllers/transactionController.js

import Category from '../models/Category.js'; 

import Transaction from '../models/Transaction.js';

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const { amount, date, description, category } = req.body;

    // Validate if category is a valid name
    const foundCategory = await Category.findOne({ name: category });
    
    if (!foundCategory) {
      return res.status(400).json({ error: 'Category not found' });
    }

    const newTransaction = new Transaction({
      amount,
      date,
      description,
      category, 
    });

    const saved = await newTransaction.save();
    res.status(201).json({saved, message: "New transaction added"});
  } catch (err) {
    res.status(400).json({ error: 'Invalid transaction data' });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { category } = req.body;
        
    // Validate if category is a valid name
    const foundCategory = await Category.findOne({ name: category });
    if (!foundCategory) {
        return res.status(400).json({ error: 'Category not found' });
    }
    
    const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({updated, message: "Transaction updated"});
  } catch (err) {
    res.status(400).json({ error: 'Failed to update transaction' });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete transaction' });
  }
};
