// models/Budget.js

import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  month: {
    type: Date, // Store the month (use the 1st of each month for simplicity)
    required: true,
  },
});

const Budget = mongoose.model('Budget', budgetSchema);

export default Budget;
